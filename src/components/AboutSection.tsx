import { StaggerItem } from "@/components/ScrollReveal";
import ParallaxSection from "@/components/ParallaxSection";

export default function AboutSection() {
  return (
    <section className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full -ml-36 -mb-36 blur-3xl" />
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ParallaxSection speed={0.2} offset={120}>
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1665206220348-0f5d49b5b8b5?w=600&q=80"
                alt="Indian sedan car on city road"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/40 -z-10" />
            </div>
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-primary/20 z-0 rotate-45 hidden lg:block" />
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary/10 z-0 rotate-12 hidden lg:block" />
          </div>
          </ParallaxSection>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 glass px-5 py-2.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-black uppercase tracking-[0.3em]">
                  Brands
                </span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-heading tracking-tighter">
                Planning a trip should be very <br />
                <span className="text-gradient-primary">exciting adventure</span>
              </h2>
            </div>

            <div className="space-y-6">
              <StaggerItem direction="right">
              <div className="group flex gap-5 p-6 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-500">
                <div className="flex-shrink-0 w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                  <svg
                    className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-heading group-hover:text-primary transition-colors duration-300">
                    International Tours
                  </h3>
                  <p className="text-body leading-relaxed font-medium">
                    Our team of travel professional brings a wealth of knowledge
                    and expertise to the table.
                  </p>
                </div>
              </div>
              </StaggerItem>
              <StaggerItem direction="right">
              <div className="group flex gap-5 p-6 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-500">
                <div className="flex-shrink-0 w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                  <svg
                    className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-heading group-hover:text-primary transition-colors duration-300">
                    Multiple Options to Choose
                  </h3>
                  <p className="text-body leading-relaxed font-medium">
                    Planning trip should be an exciting adventure, not stressful
                    ordeal. Let us handle the logistics
                  </p>
                </div>
              </div>
              </StaggerItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
