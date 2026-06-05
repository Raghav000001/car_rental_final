"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import BookingModal from "@/components/BookingModal";

interface Props {
  vehicleId: string;
}

export default function BookVehicleButton({ vehicleId }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all duration-300 shadow-glow-red hover:shadow-glow-red-strong cursor-pointer"
      >
        <Phone className="w-4 h-4" />
        Book This Vehicle
      </button>

      {showModal && (
        <BookingModal
          onClose={() => setShowModal(false)}
          initialVehicleId={vehicleId}
        />
      )}
    </>
  );
}
