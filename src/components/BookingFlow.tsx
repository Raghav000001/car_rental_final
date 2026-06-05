"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles, serviceTypeLabels } from "@/app/fleet/vehicleData";
import { formatPrice } from "@/lib/utils";
import type { Vehicle } from "@/app/fleet/types";

type Step = 1 | 2 | 3 | "success";
type SubmitState = "idle" | "loading" | "error";

interface FormState {
  vehicle: Vehicle | null;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  pickupLocation: string;
  dropLocation: string;
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  specialRequirements: string;
  agreeToContact: boolean;
}

const inputClasses =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-primary/60 focus:bg-white/[0.06] hover:border-white/20";
const labelClasses = "block text-sm font-semibold text-gray-300 mb-2";
const errorClasses = "text-xs text-red-400 mt-1.5";

const today = () => new Date().toISOString().split("T")[0];

function getGroupedVehicles() {
  const map: Record<string, Vehicle[]> = {};
  for (const v of vehicles) {
    const key = serviceTypeLabels[v.serviceType];
    if (!map[key]) map[key] = [];
    map[key].push(v);
  }
  return map;
}

function StepIndicator({ current, step }: { current: Step; step: 1 | 2 | 3 }) {
  const num = step;
  const currentNum = current === "success" ? 4 : (current as number);
  const isActive = currentNum >= num;
  const isCurrent = current === step;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
          isActive
            ? "bg-primary text-white"
            : "bg-white/5 text-body/40"
        } ${isCurrent ? "ring-2 ring-primary/40 ring-offset-2 ring-offset-bg-dark" : ""}`}
      >
        {isActive && currentNum > num ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          num
        )}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-wider hidden sm:inline ${
        isActive ? "text-white" : "text-body/40"
      }`}>
        {step === 1 ? "Vehicle" : step === 2 ? "Trip Details" : "Inquiry"}
      </span>
    </div>
  );
}

export default function BookingFlow({
  initialVehicleId,
}: {
  initialVehicleId?: string;
}) {
  const initialVehicle =
    initialVehicleId
      ? vehicles.find((v) => v.id === initialVehicleId) || null
      : null;

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>({
    vehicle: initialVehicle,
    pickupDate: "",
    returnDate: "",
    pickupTime: "",
    pickupLocation: "",
    dropLocation: "",
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    specialRequirements: "",
    agreeToContact: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverMsg, setServerMsg] = useState("");

  const grouped = useMemo(() => getGroupedVehicles(), []);

  const isChauffeur = form.vehicle?.serviceType !== "self-drive";

  const validateStep1 = () => {
    if (!form.vehicle) {
      setErrors({ vehicle: "Please select a vehicle" });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.pickupDate) e.pickupDate = "Pickup date is required";
    else if (form.pickupDate < today()) e.pickupDate = "Pickup date cannot be in the past";
    if (!form.pickupTime) e.pickupTime = "Pickup time is required";
    if (!isChauffeur) {
      if (form.returnDate && form.returnDate <= form.pickupDate)
        e.returnDate = "Return date must be after pickup date";
    }
    if (isChauffeur && !form.pickupLocation) e.pickupLocation = "Pickup location is required";
    if (isChauffeur && !form.dropLocation) e.dropLocation = "Drop location is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (form.fullName.trim().length < 2) e.fullName = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (form.mobile.trim().length < 5) e.mobile = "Valid mobile number is required";
    if (form.city.trim().length < 1) e.city = "City is required";
    if (!form.agreeToContact) e.agreeToContact = "You must agree to be contacted";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setSubmitState("loading");
    setServerMsg("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleName: form.vehicle!.name,
          serviceType: serviceTypeLabels[form.vehicle!.serviceType],
          price: `${formatPrice(form.vehicle!.price)}/${form.vehicle!.priceLabel.replace("Per ", "").toLowerCase()}`,
          pickupDate: form.pickupDate,
          returnDate: form.returnDate,
          pickupTime: form.pickupTime,
          pickupLocation: isChauffeur ? form.pickupLocation : "",
          dropLocation: isChauffeur ? form.dropLocation : "",
          fullName: form.fullName,
          mobile: form.mobile,
          email: form.email,
          city: form.city,
          specialRequirements: form.specialRequirements,
          agreeToContact: form.agreeToContact,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep("success");
        setServerMsg(data.message);
      } else {
        setSubmitState("error");
        setServerMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitState("error");
      setServerMsg("Network error. Please check your connection.");
    }
  };

  const goBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10">
        <StepIndicator current={step} step={1} />
        <div className="w-12 sm:w-20 h-px bg-white/10" />
        <StepIndicator current={step} step={2} />
        <div className="w-12 sm:w-20 h-px bg-white/10" />
        <StepIndicator current={step} step={3} />
      </div>

      <AnimatePresence mode="wait">
        {step === "success" ? (
          /* ── Success Screen ── */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-black text-white italic tracking-tighter mb-3">
              Inquiry Sent <span className="text-gradient-primary">Successfully!</span>
            </h3>
            <p className="text-body text-sm leading-relaxed max-w-md mx-auto mb-8">
              Thank you for your inquiry. Our team will contact you shortly to confirm availability and pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="px-8 py-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-wider hover:bg-primary-dark transition-all duration-300 shadow-glow-red"
              >
                Back to Home
              </Link>
              <Link
                href="/fleet"
                className="px-8 py-3 rounded-xl border border-white/20 text-white font-black text-xs uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
              >
                Browse More Vehicles
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* ── Step 1: Select Vehicle ── */}
            {step === 1 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl lg:text-3xl font-black text-white italic tracking-tighter mb-2">
                    Select Your <span className="text-gradient-primary">Vehicle</span>
                  </h2>
                  <p className="text-body text-sm">Choose from our premium fleet</p>
                </div>

                {errors.vehicle && (
                  <p className="text-center text-xs text-red-400 mb-4">{errors.vehicle}</p>
                )}

                <div className="space-y-6">
                  {Object.entries(grouped).map(([group, groupVehicles]) => (
                    <div key={group}>
                      <h3 className="text-[10px] text-primary font-black uppercase tracking-wider mb-3 px-1">
                        {group}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {groupVehicles.map((v) => {
                          const selected = form.vehicle?.id === v.id;
                          return (
                            <button
                              key={v.id}
                              onClick={() => {
                                setForm((prev) => ({ ...prev, vehicle: v }));
                                setErrors({});
                              }}
                              className={`relative flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                                selected
                                  ? "border-primary/60 bg-primary/5 shadow-[0_0_20px_-5px_rgba(220,38,38,0.2)]"
                                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
                              }`}
                            >
                              <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-white/5 shrink-0">
                                <Image src={v.image} alt={v.name} fill sizes="80px" className="object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-bold text-sm">{v.name}</p>
                                <p className="text-[10px] text-body/50 font-bold uppercase tracking-wider mt-0.5">
                                  {v.seating} Seats &middot; {v.luggage} &middot; {v.transmission}
                                </p>
                                <p className="text-primary font-black text-sm mt-1">
                                  {formatPrice(v.price)}
                                  <span className="text-[9px] text-body/60 font-bold ml-1 uppercase">
                                    /{v.priceLabel.replace("Per ", "").toLowerCase()}
                                  </span>
                                </p>
                              </div>
                              {selected && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => { if (validateStep1()) setStep(2); }}
                    className="px-10 py-3.5 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-wider hover:bg-primary-dark transition-all duration-300 shadow-glow-red cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2: Date & Trip Details ── */}
            {step === 2 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl lg:text-3xl font-black text-white italic tracking-tighter mb-2">
                    Trip <span className="text-gradient-primary">Details</span>
                  </h2>
                  <p className="text-body text-sm">
                    {isChauffeur ? "Tell us your travel plan" : "When do you need the vehicle?"}
                  </p>
                </div>

                <div className="max-w-lg mx-auto space-y-5">
                  {isChauffeur ? (
                    <>
                      <div>
                        <label className={labelClasses}>Pickup Location <span className="text-primary">*</span></label>
                        <input type="text" value={form.pickupLocation} onChange={(e) => setForm((p) => ({ ...p, pickupLocation: e.target.value }))} placeholder="Enter pickup location" className={`${inputClasses} ${errors.pickupLocation ? "border-red-500/50" : ""}`} />
                        {errors.pickupLocation && <p className={errorClasses}>{errors.pickupLocation}</p>}
                      </div>
                      <div>
                        <label className={labelClasses}>Drop Location <span className="text-primary">*</span></label>
                        <input type="text" value={form.dropLocation} onChange={(e) => setForm((p) => ({ ...p, dropLocation: e.target.value }))} placeholder="Enter drop location" className={`${inputClasses} ${errors.dropLocation ? "border-red-500/50" : ""}`} />
                        {errors.dropLocation && <p className={errorClasses}>{errors.dropLocation}</p>}
                      </div>
                    </>
                  ) : null}

                  <div>
                    <label className={labelClasses}>Pickup Date <span className="text-primary">*</span></label>
                    <input type="date" value={form.pickupDate} min={today()} onChange={(e) => setForm((p) => ({ ...p, pickupDate: e.target.value }))} className={`${inputClasses} ${errors.pickupDate ? "border-red-500/50" : ""}`} />
                    {errors.pickupDate && <p className={errorClasses}>{errors.pickupDate}</p>}
                  </div>

                  {!isChauffeur && (
                    <div>
                      <label className={labelClasses}>Return Date</label>
                      <input type="date" value={form.returnDate} min={form.pickupDate || today()} onChange={(e) => setForm((p) => ({ ...p, returnDate: e.target.value }))} className={`${inputClasses} ${errors.returnDate ? "border-red-500/50" : ""}`} />
                      {errors.returnDate && <p className={errorClasses}>{errors.returnDate}</p>}
                    </div>
                  )}

                  <div>
                    <label className={labelClasses}>Pickup Time <span className="text-primary">*</span></label>
                    <input type="time" value={form.pickupTime} onChange={(e) => setForm((p) => ({ ...p, pickupTime: e.target.value }))} className={`${inputClasses} ${errors.pickupTime ? "border-red-500/50" : ""}`} />
                    {errors.pickupTime && <p className={errorClasses}>{errors.pickupTime}</p>}
                  </div>

                  {isChauffeur && (
                    <div>
                      <label className={labelClasses}>Return Date <span className="text-body/40 text-[10px]">(optional)</span></label>
                      <input type="date" value={form.returnDate} min={form.pickupDate || today()} onChange={(e) => setForm((p) => ({ ...p, returnDate: e.target.value }))} className={`${inputClasses} ${errors.returnDate ? "border-red-500/50" : ""}`} />
                      {errors.returnDate && <p className={errorClasses}>{errors.returnDate}</p>}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4 mt-8">
                  <button onClick={goBack} className="px-6 py-3.5 rounded-xl border border-white/20 text-body text-[10px] font-black uppercase tracking-wider hover:bg-white/5 transition-all cursor-pointer">
                    Back
                  </button>
                  <button onClick={() => { if (validateStep2()) setStep(3); }} className="px-10 py-3.5 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-wider hover:bg-primary-dark transition-all duration-300 shadow-glow-red cursor-pointer">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Send Query ── */}
            {step === 3 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl lg:text-3xl font-black text-white italic tracking-tighter mb-2">
                    Your <span className="text-gradient-primary">Details</span>
                  </h2>
                  <p className="text-body text-sm">We&apos;ll get back to you within 24 hours</p>
                </div>

                {/* Summary card */}
                <div className="max-w-lg mx-auto mb-6 bg-white/[0.03] border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-10 rounded-xl overflow-hidden bg-white/5 shrink-0">
                      <Image src={form.vehicle!.image} alt="" fill sizes="56px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{form.vehicle!.name}</p>
                      <p className="text-[9px] text-body/50 font-bold uppercase tracking-wider">{serviceTypeLabels[form.vehicle!.serviceType]}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-primary font-black text-sm">{formatPrice(form.vehicle!.price)}</p>
                      <p className="text-[9px] text-body/50 font-bold uppercase tracking-wider">{form.vehicle!.priceLabel}</p>
                    </div>
                  </div>
                </div>

                <div className="max-w-lg mx-auto space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClasses}>Full Name <span className="text-primary">*</span></label>
                      <input type="text" value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} placeholder="Your full name" className={`${inputClasses} ${errors.fullName ? "border-red-500/50" : ""}`} />
                      {errors.fullName && <p className={errorClasses}>{errors.fullName}</p>}
                    </div>
                    <div>
                      <label className={labelClasses}>Mobile Number <span className="text-primary">*</span></label>
                      <input type="tel" value={form.mobile} onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))} placeholder="+91 8708765123" className={`${inputClasses} ${errors.mobile ? "border-red-500/50" : ""}`} />
                      {errors.mobile && <p className={errorClasses}>{errors.mobile}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClasses}>Email <span className="text-primary">*</span></label>
                      <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="email@example.com" className={`${inputClasses} ${errors.email ? "border-red-500/50" : ""}`} />
                      {errors.email && <p className={errorClasses}>{errors.email}</p>}
                    </div>
                    <div>
                      <label className={labelClasses}>City <span className="text-primary">*</span></label>
                      <input type="text" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} placeholder="Your city" className={`${inputClasses} ${errors.city ? "border-red-500/50" : ""}`} />
                      {errors.city && <p className={errorClasses}>{errors.city}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Special Requirements <span className="text-body/40 text-[10px]">(optional)</span></label>
                    <textarea value={form.specialRequirements} onChange={(e) => setForm((p) => ({ ...p, specialRequirements: e.target.value }))} placeholder="Any special requests..." rows={3} className={`${inputClasses} resize-none`} />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agreeToContact}
                      onChange={(e) => setForm((p) => ({ ...p, agreeToContact: e.target.checked }))}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 accent-primary"
                    />
                    <span className="text-xs text-body leading-relaxed">
                      I agree to be contacted regarding this booking inquiry. <span className="text-primary">*</span>
                    </span>
                  </label>
                  {errors.agreeToContact && <p className={errorClasses}>{errors.agreeToContact}</p>}
                </div>

                {submitState === "error" && (
                  <p className="text-center text-xs text-red-400 mt-4">{serverMsg}</p>
                )}

                <div className="flex items-center justify-center gap-4 mt-8">
                  <button onClick={goBack} className="px-6 py-3.5 rounded-xl border border-white/20 text-body text-[10px] font-black uppercase tracking-wider hover:bg-white/5 transition-all cursor-pointer">
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitState === "loading"}
                    className="px-10 py-3.5 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-wider hover:bg-primary-dark transition-all duration-300 shadow-glow-red cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitState === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Inquiry"
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
