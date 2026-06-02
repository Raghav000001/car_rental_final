import { StaggerItem } from "@/components/ScrollReveal";

const steps = [
  {
    number: "1",
    title: "Sign up Account",
    bgColor: "bg-[#FFB185]",
    icon: (
      <svg className="w-8 h-8 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Search your Vehicle",
    bgColor: "bg-[#9181F4]",
    icon: (
      <svg className="w-8 h-8 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Pay the Car Rent",
    bgColor: "bg-[#87DAB3]",
    icon: (
      <svg className="w-8 h-8 text-[#1A1A1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8l-4 4-2-2" />
        <path d="M12 12l4 4" />
      </svg>
    ),
  },
  {
    number: "4",
    title: "Take Car to Road",
    bgColor: "bg-[#FFCF7A]",
    icon: (
      <svg className="w-8 h-8 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#0D0D0D] relative overflow-hidden">
      {/* Radial Border Pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[800px] pointer-events-none opacity-10">
        <div className="absolute inset-x-0 inset-y-0 border border-white rounded-full scale-[0.4]" />
        <div className="absolute inset-x-0 inset-y-0 border border-white rounded-full scale-[0.7]" />
        <div className="absolute inset-x-0 inset-y-0 border border-white rounded-full scale-[1.0]" />
        <div className="absolute inset-x-0 inset-y-0 border border-white rounded-full scale-[1.3]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Popular Cars
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step) => (
            <StaggerItem key={step.title} direction="up">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                {/* Step Number Badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white border-2 border-[#1A1A1A] flex items-center justify-center font-black text-black text-sm z-10 shadow-lg">
                  {step.number}
                </div>
                {/* Icon Container */}
                <div className={`w-24 h-24 ${step.bgColor} rounded-4xl flex items-center justify-center shadow-xl transform transition-transform hover:scale-105 duration-300`}>
                  {step.icon}
                </div>
              </div>
              <h3 className="text-2xl font-black text-white italic tracking-tight">
                {step.title}
              </h3>
            </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}
