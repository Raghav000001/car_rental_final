"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingFlow from "@/components/BookingFlow";

interface Props {
  onClose: () => void;
  initialVehicleId?: string;
}

export default function BookingModal({ onClose, initialVehicleId }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-gradient-to-b from-bg-dark to-secondary border border-white/10 rounded-2xl shadow-premium overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Book a vehicle"
        >
          <div className="shrink-0 flex items-center justify-between px-5 lg:px-8 py-4 lg:py-5 border-b border-white/5 bg-bg-dark/80 backdrop-blur-md">
            <h2 className="text-lg lg:text-xl font-black text-white italic tracking-tighter">
              Book Your <span className="text-gradient-primary">Ride</span>
            </h2>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-white/20 hover:bg-primary hover:border-primary flex items-center justify-center text-body hover:text-white transition-all duration-300 cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close booking"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 lg:p-8">
            <BookingFlow initialVehicleId={initialVehicleId} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
