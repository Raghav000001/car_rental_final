"use client";

import {
  Children,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  Map as MapLibreMapCtor,
  AttributionControl as AttributionControlCtor,
  Marker as MapLibreMarkerCtor,
  Popup as MapLibrePopupCtor,
  type LngLatLike,
  type MapLayerMouseEvent,
  type MapMouseEvent,
  type Marker as MapLibreMarker,
  type Popup as MapLibrePopup,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type MapLibreMap = InstanceType<typeof MapLibreMapCtor>;
type MapLibrePopupInstance = InstanceType<typeof MapLibrePopupCtor>;
import "maplibre-gl/dist/maplibre-gl.css";
import { Loader2, Locate, Maximize, Minus, Plus, X } from "lucide-react";

const DEFAULT_DARK_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
const DEFAULT_LIGHT_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

type MapContextValue = {
  map: MapLibreMap | null;
  registerMarker: (id: string, marker: MapLibreMarker) => void;
  unregisterMarker: (id: string) => void;
  getMarker: (id: string) => MapLibreMarker | undefined;
};

// Plain object used as a registry; avoids the JS built-in `Map` constructor
// being shadowed by the locally-exported `Map` component below.
type MarkerRegistry = Record<string, MapLibreMarker>;

const MapContext = createContext<MapContextValue | null>(null);

function useMapContext(component: string): MapContextValue {
  const ctx = useContext(MapContext);
  if (!ctx) {
    throw new Error(`<${component}> must be used inside <Map>`);
  }
  return ctx;
}

export type MapStyleOption = string | StyleSpecification;

export type MapProps = {
  children?: ReactNode;
  className?: string;
  center: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  bearing?: number;
  pitch?: number;
  style?: MapStyleOption;
  theme?: "dark" | "light";
  interactive?: boolean;
  attribution?: boolean;
  onLoad?: (map: MapLibreMap) => void;
  onClick?: (e: MapMouseEvent) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onClick" | "onLoad">;

export const Map = forwardRef<MapLibreMap, MapProps>(function Map(
  {
    children,
    className,
    center,
    zoom = 4,
    minZoom,
    maxZoom,
    bearing = 0,
    pitch = 0,
    style,
    theme = "dark",
    interactive = true,
    attribution = true,
    onLoad,
    onClick,
    ...rest
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [ready, setReady] = useState(false);
  const [mapInstance, setMapInstance] = useState<MapLibreMap | null>(null);
  const markersRef = useRef<MarkerRegistry>({} as MarkerRegistry);

  const registerMarker = useCallback((id: string, marker: MapLibreMarker) => {
    markersRef.current[id] = marker;
  }, []);

  const unregisterMarker = useCallback((id: string) => {
    delete markersRef.current[id];
  }, []);

  const getMarker = useCallback((id: string) => {
    return markersRef.current[id];
  }, []);

  const resolvedStyle: MapStyleOption = useMemo(() => {
    if (style) return style;
    return theme === "light" ? DEFAULT_LIGHT_STYLE : DEFAULT_DARK_STYLE;
  }, [style, theme]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const instance = new MapLibreMapCtor({
      container: containerRef.current,
      style: resolvedStyle,
      center: center as LngLatLike,
      zoom,
      minZoom,
      maxZoom,
      bearing,
      pitch,
      interactive,
      attributionControl: false,
    });

    if (attribution) {
      instance.addControl(
        new AttributionControlCtor({ compact: true }),
        "bottom-right",
      );
    }

    instance.on("load", () => {
      setReady(true);
      onLoad?.(instance);
    });

    if (onClick) {
      instance.on("click", onClick);
    }

    mapRef.current = instance;
    setMapInstance(instance);

    return () => {
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {} as MarkerRegistry;
      instance.remove();
      mapRef.current = null;
      setMapInstance(null);
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const m = mapRef.current;
    if (!m) return;
    m.jumpTo({ center: center as LngLatLike, zoom, bearing, pitch });
  }, [center[0], center[1], zoom, bearing, pitch]);

  useEffect(() => {
    const m = mapRef.current;
    if (!m) return;
    m.setStyle(resolvedStyle);
  }, [resolvedStyle]);

  useImperativeHandle(ref, () => mapInstance as MapLibreMap, [mapInstance]);

  const ctxValue = useMemo<MapContextValue>(
    () => ({
      map: mapInstance,
      registerMarker,
      unregisterMarker,
      getMarker,
    }),
    [mapInstance, registerMarker, unregisterMarker, getMarker],
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", width: "100%", height: "100%" }}
      {...rest}
    >
      {ready && (
        <MapContext.Provider value={ctxValue}>{children}</MapContext.Provider>
      )}
    </div>
  );
});

export type MapMarkerProps = {
  longitude: number;
  latitude: number;
  children?: ReactNode;
  draggable?: boolean;
  onClick?: (e: MouseEvent) => void;
  onDragEnd?: (lngLat: { lng: number; lat: number }) => void;
  className?: string;
};

let markerIdCounter = 0;

export function MapMarker({
  longitude,
  latitude,
  children,
  draggable = false,
  onClick,
  onDragEnd,
  className,
}: MapMarkerProps) {
  const { map, registerMarker, unregisterMarker } = useMapContext("MapMarker");
  const markerRef = useRef<MapLibreMarker | null>(null);

  const id = useMemo(() => `marker-${++markerIdCounter}`, []);
  // Stable DOM element for the marker wrapper. Created once with lazy useState
  // initializer so it survives renders without ref-in-render issues.
  const [markerEl] = useState(() => {
    const el = document.createElement("div");
    el.style.position = "relative";
    return el;
  });

  // DOM element mutation below is for a third-party map library (MapLibre).
  // The react-hooks/immutability rule flags these DOM API calls as state
  // mutation, but className/addEventListener on an off-DOM element are
  // legitimate operations not covered by the rule's intent.
  /* eslint-disable react-hooks/immutability */
  useEffect(() => {
    if (!map) return;

    markerEl.className = className ?? "";

    if (onClick) {
      markerEl.addEventListener("click", onClick);
    }

    const marker = new MapLibreMarkerCtor({ element: markerEl, draggable })
      .setLngLat([longitude, latitude])
      .addTo(map);

    if (draggable && onDragEnd) {
      marker.on("dragend", () => {
        const ll = marker.getLngLat();
        onDragEnd({ lng: ll.lng, lat: ll.lat });
      });
    }

    markerRef.current = marker;
    registerMarker(id, marker);

    return () => {
      if (onClick) {
        markerEl.removeEventListener("click", onClick);
      }
      marker.remove();
      unregisterMarker(id);
      markerRef.current = null;
    };
  }, [map, id, registerMarker, unregisterMarker, longitude, latitude, draggable, onClick, onDragEnd, markerEl, className]);
  /* eslint-enable react-hooks/immutability */

  useEffect(() => {
    if (!markerRef.current) return;
    markerRef.current.setLngLat([longitude, latitude]);
  }, [longitude, latitude]);

  if (!map) return null;

  const childArray = Children.toArray(children);

  if (childArray.length === 0) {
    return createPortal(
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#dc2626",
          boxShadow: "0 0 0 4px rgba(220,38,38,0.25)",
        }}
      />,
      markerEl,
    );
  }

  return createPortal(<>{children}</>, markerEl);
}

export type MarkerContentProps = {
  children: ReactNode;
  className?: string;
};

export function MarkerContent({ children, className }: MarkerContentProps) {
  return <div className={className}>{children}</div>;
}
(MarkerContent as unknown as { displayName: string }).displayName = "MarkerContent";

export type MarkerPopupProps = {
  longitude: number;
  latitude: number;
  children: ReactNode;
  closeButton?: boolean;
  closeOnClick?: boolean;
  offset?: number | [number, number];
  className?: string;
};

export function MarkerPopup({
  longitude,
  latitude,
  children,
  closeButton = true,
  closeOnClick = true,
  offset = 16,
  className,
}: MarkerPopupProps) {
  const { map } = useMapContext("MarkerPopup");
  const popupRef = useRef<MapLibrePopupInstance | null>(null);
  const [contentEl, setContentEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!map) return;
    const popup = new MapLibrePopupCtor({
      closeButton,
      closeOnClick,
      offset,
      className,
    })
      .setLngLat([longitude, latitude])
      .setHTML('<div class="maplibregl-popup-inner-placeholder"></div>')
      .addTo(map);

    popupRef.current = popup;
    requestAnimationFrame(() => {
      const el = popup.getElement()?.querySelector(
        ".maplibregl-popup-content",
      ) as HTMLElement | null;
      setContentEl(el);
    });
    return () => {
      popup.remove();
      popupRef.current = null;
      setContentEl(null);
    };
  }, [map, longitude, latitude]);

  if (!map || !contentEl) return null;

  return createPortal(<>{children}</>, contentEl);
}

export type MarkerLabelProps = {
  longitude: number;
  latitude: number;
  children: ReactNode;
  className?: string;
};

export function MarkerLabel({
  longitude,
  latitude,
  children,
  className,
}: MarkerLabelProps) {
  const { map } = useMapContext("MarkerLabel");
  const markerRef = useRef<MapLibreMarker | null>(null);

  useEffect(() => {
    if (!map) return;
    const el = document.createElement("div");
    el.className =
      className ??
      "px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white bg-secondary/80 border border-white/10";
    el.textContent = typeof children === "string" ? children : "";
    const marker = new MapLibreMarkerCtor({ element: el })
      .setLngLat([longitude, latitude])
      .addTo(map);
    markerRef.current = marker;
    return () => {
      marker.remove();
    };
  }, [map, longitude, latitude]);

  return null;
}

export function MapControls({
  position = "top-right",
  showZoom = true,
  showCompass = false,
  showLocate = false,
  showFullscreen = false,
  className,
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showZoom?: boolean;
  showCompass?: boolean;
  showLocate?: boolean;
  showFullscreen?: boolean;
  className?: string;
}) {
  return (
    <div
      className={
        "absolute z-10 flex flex-col gap-2 " +
        (position === "top-right"
          ? "top-3 right-3"
          : position === "top-left"
            ? "top-3 left-3"
            : position === "bottom-left"
              ? "bottom-3 left-3"
              : "bottom-3 right-3") +
        " " +
        (className ?? "")
      }
    >
      {showZoom && <MapControlZoom />}
      {showCompass && <MapControlCompass />}
      {showLocate && <MapControlLocate />}
      {showFullscreen && <MapControlFullscreen />}
    </div>
  );
}

function ControlButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-9 h-9 flex items-center justify-center bg-secondary/90 border border-white/10 text-white hover:bg-primary hover:border-primary transition-colors duration-200 backdrop-blur-sm"
    >
      {children}
    </button>
  );
}

export function MapControlZoom() {
  const { map } = useMapContext("MapControlZoom");
  if (!map) return null;
  return (
    <>
      <ControlButton
        label="Zoom in"
        onClick={() => map.zoomIn({ duration: 300 })}
      >
        <Plus className="w-4 h-4" />
      </ControlButton>
      <ControlButton
        label="Zoom out"
        onClick={() => map.zoomOut({ duration: 300 })}
      >
        <Minus className="w-4 h-4" />
      </ControlButton>
    </>
  );
}

export function MapControlCompass() {
  const { map } = useMapContext("MapControlCompass");
  const [bearing, setBearing] = useState(0);
  useEffect(() => {
    if (!map) return;
    const handler = () => setBearing(map.getBearing());
    map.on("rotate", handler);
    map.on("rotateend", handler);
    return () => {
      map.off("rotate", handler);
      map.off("rotateend", handler);
    };
  }, [map]);
  if (!map) return null;
  return (
    <ControlButton
      label="Reset bearing"
      onClick={() => map.easeTo({ bearing: 0, duration: 400 })}
    >
      <span
        className="text-[10px] font-black"
        style={{ transform: `rotate(${-bearing}deg)` }}
      >
        N
      </span>
    </ControlButton>
  );
}

export function MapControlLocate() {
  const { map } = useMapContext("MapControlLocate");
  const [locating, setLocating] = useState(false);
  const handleClick = useCallback(() => {
    if (!map) return;
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.easeTo({
          center: [pos.coords.longitude, pos.coords.latitude],
          zoom: 13,
          duration: 800,
        });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 5000 },
    );
  }, [map]);
  if (!map) return null;
  return (
    <ControlButton label="Locate me" onClick={handleClick}>
      {locating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Locate className="w-4 h-4" />
      )}
    </ControlButton>
  );
}

export function MapControlFullscreen() {
  const { map } = useMapContext("MapControlFullscreen");
  const [isFs, setIsFs] = useState(false);
  useEffect(() => {
    const handler = () => setIsFs(document.fullscreenElement !== null);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);
  if (!map) return null;
  return (
    <ControlButton
      label={isFs ? "Exit fullscreen" : "Enter fullscreen"}
      onClick={() => {
        if (isFs) {
          document.exitFullscreen?.();
        } else {
          map.getContainer().requestFullscreen?.();
        }
      }}
    >
      {isFs ? (
        <X className="w-4 h-4" />
      ) : (
        <Maximize className="w-4 h-4" />
      )}
    </ControlButton>
  );
}

export type MapRouteProps = {
  id: string;
  coordinates: [number, number][];
  color?: string;
  width?: number;
  opacity?: number;
  dashArray?: [number, number];
};

export function MapRoute({
  id,
  coordinates,
  color = "#dc2626",
  width = 4,
  opacity = 0.9,
  dashArray,
}: MapRouteProps) {
  const { map } = useMapContext("MapRoute");
  const sourceId = `${id}-source`;
  const layerId = `${id}-layer`;

  useEffect(() => {
    if (!map) return;
    const add = () => {
      if (map.getSource(sourceId)) return;
      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates },
        },
      });
      const paint = {
        "line-color": color,
        "line-width": width,
        "line-opacity": opacity,
      };
      if (dashArray) {
        (paint as Record<string, unknown>)["line-dasharray"] = dashArray;
      }
      map.addLayer({
        id: layerId,
        type: "line",
        source: sourceId,
        layout: { "line-join": "round", "line-cap": "round" },
        paint,
      });
    };

    if (map.isStyleLoaded()) {
      add();
    } else {
      map.once("load", add);
    }

    return () => {
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    };
  }, [map, id, color, width, opacity, dashArray, coordinates]);

  return null;
}

export type MapArcProps = {
  id: string;
  from: [number, number];
  to: [number, number];
  color?: string;
  width?: number;
  segments?: number;
  animate?: boolean;
  durationMs?: number;
};

// Equirectangular interpolation is fine for the short arcs shown in the
// service-locations demo; swap for a proper great-circle (haversine +
// slerp) if longer inter-city routes are introduced.
function buildArcLine(
  from: [number, number],
  to: [number, number],
  segments: number,
): [number, number][] {
  const coords: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    coords.push([
      from[0] + (to[0] - from[0]) * t,
      from[1] + (to[1] - from[1]) * t,
    ]);
  }
  return coords;
}

export function MapArc({
  id,
  from,
  to,
  color = "#dc2626",
  width = 3,
  segments = 64,
  animate = true,
  durationMs = 2000,
}: MapArcProps) {
  const { map } = useMapContext("MapArc");
  const sourceId = `${id}-arc-source`;
  const layerId = `${id}-arc-layer`;

  useEffect(() => {
    if (!map) return;
    const coords = buildArcLine(from, to, segments);

    const add = () => {
      if (map.getSource(sourceId)) return;
      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: coords },
        },
      });
      map.addLayer({
        id: layerId,
        type: "line",
        source: sourceId,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": color,
          "line-width": width,
          "line-opacity": 0.9,
        },
      });
    };

    if (map.isStyleLoaded()) {
      add();
    } else {
      map.once("load", add);
    }

    return () => {
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    };
  }, [map, id, from[0], from[1], to[0], to[1], color, width, segments]);

  useEffect(() => {
    if (!map || !animate) return;
    let frame = 0;
    let raf = 0;
    const step = () => {
      frame = (frame + 1) % 1000;
      if (map.getLayer(layerId)) {
        const phase = (frame / 10) % 4;
        map.setPaintProperty(
          layerId,
          "line-dasharray",
          [phase, 4 - phase] as unknown as number[],
        );
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [map, animate, layerId, durationMs]);

  return null;
}

export type MapClusterLayerProps = {
  id: string;
  data: GeoJSON.FeatureCollection;
  clusterMaxZoom?: number;
  clusterRadius?: number;
  color?: string;
  onPointClick?: (feature: GeoJSON.Feature) => void;
};

export function MapClusterLayer({
  id,
  data,
  clusterMaxZoom = 14,
  clusterRadius = 50,
  color = "#dc2626",
  onPointClick,
}: MapClusterLayerProps) {
  const { map } = useMapContext("MapClusterLayer");
  const sourceId = `${id}-cluster-source`;
  const clustersLayer = `${id}-clusters`;
  const clusterCountLayer = `${id}-cluster-count`;
  const unclusteredLayer = `${id}-unclustered`;

  useEffect(() => {
    if (!map) return;
    const add = () => {
      if (map.getSource(sourceId)) return;
      map.addSource(sourceId, {
        type: "geojson",
        data,
        cluster: true,
        clusterMaxZoom,
        clusterRadius,
      });
      map.addLayer({
        id: clustersLayer,
        type: "circle",
        source: sourceId,
        filter: ["has", "point_count"],
        paint: {
          "circle-color": color,
          "circle-radius": [
            "step",
            ["get", "point_count"],
            16,
            10,
            22,
            50,
            28,
          ],
          "circle-stroke-width": 3,
          "circle-stroke-color": "#0a0a0a",
          "circle-opacity": 0.9,
        },
      });
      map.addLayer({
        id: clusterCountLayer,
        type: "symbol",
        source: sourceId,
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-size": 12,
        },
        paint: { "text-color": "#ffffff" },
      });
      map.addLayer({
        id: unclusteredLayer,
        type: "circle",
        source: sourceId,
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": color,
          "circle-radius": 7,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#0a0a0a",
        },
      });

      if (onPointClick) {
        map.on("click", unclusteredLayer, (e: MapLayerMouseEvent) => {
          const f = e.features?.[0];
          if (f) onPointClick(f);
        });
      }
    };

    if (map.isStyleLoaded()) {
      add();
    } else {
      map.once("load", add);
    }

    return () => {
      if (map.getLayer(clustersLayer)) map.removeLayer(clustersLayer);
      if (map.getLayer(clusterCountLayer)) map.removeLayer(clusterCountLayer);
      if (map.getLayer(unclusteredLayer)) map.removeLayer(unclusteredLayer);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    };
  }, [map, id, data, clusterMaxZoom, clusterRadius, color, onPointClick]);

  return null;
}
