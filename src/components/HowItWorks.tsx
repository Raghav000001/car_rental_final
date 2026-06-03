import { StaggerItem } from "@/components/ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Sign up Account",
    text: "Create your account in seconds and get access to our entire fleet of premium vehicles with exclusive member benefits.",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Search your Vehicle",
    text: "Browse our fleet of 19 premium Indian vehicles with detailed specs, real photos, and transparent pricing.",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Pay the Car Rent",
    text: "Secure payment with multiple options — credit card, UPI, or net banking. No hidden charges, complete transparency.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8l-4 4-2-2" />
        <path d="M12 12l4 4" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Take Car to Road",
    text: "Pick up your vehicle or have it delivered. Hit the road with 24/7 roadside assistance and complete peace of mind.",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] pr-1">
            Get on the Road in{" "}
            <span className="text-gradient-primary">4 Simple Steps</span>
          </h2>
          <p className="text-body text-sm mt-4 max-w-lg mx-auto leading-relaxed">
            From browsing to driving — we&apos;ve made the entire process effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {steps.map((step) => (
            <StaggerItem key={step.title} direction="up">
              <div className="group relative bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-primary/40 rounded-2xl p-6 lg:p-8 transition-all duration-500 h-full text-center">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/30 text-[10px] font-black text-primary tracking-wider mb-5">
                  {step.number}
                </span>

                <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                  {step.icon}
                </div>

                <h3 className="text-lg lg:text-xl font-black text-white italic tracking-tight pr-1 mb-3">
                  {step.title}
                </h3>
                <p className="text-body/70 text-sm leading-relaxed max-w-[260px] mx-auto">
                  {step.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}
