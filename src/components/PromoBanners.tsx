import { StaggerItem } from "@/components/ScrollReveal";

const promos = [
  {
    smallText: "Discount up to",
    largeText: "40%",
    subText: "For First-time Order",
    image:
      "https://images.unsplash.com/photo-1647242008102-81d25ba13aba?w=600&q=80",
    accent: "Limited Time",
  },
  {
    smallText: "Exclusive Deal",
    largeText: "Top Indian Models",
    subText: "Starting from cheap Pricing",
    image:
      "https://images.unsplash.com/photo-1708589413831-8c24638bc0db?w=600&q=80",
    accent: "Best Seller",
  },
  {
    smallText: "Get Secure Fleet",
    largeText: "Family SUVs",
    subText: "With Safety Guarantee",
    image:
      "https://images.unsplash.com/photo-1638299638532-8795cb0440a8?w=600&q=80",
    accent: "Popular Choice",
  },
];

export default function PromoBanners() {
  return (
    <section className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-primary" />
            <span className="text-primary text-sm font-black uppercase tracking-[0.3em]">
              Special Offers
            </span>
            <div className="w-12 h-[2px] bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
            Today's <span className="text-gradient-primary">Best Deals</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {promos.map((promo, index) => (
            <StaggerItem key={index} direction="fade">
            <div
              className="group relative h-[440px] overflow-hidden cursor-pointer shadow-premium border border-white/5 hover:border-primary/30 transition-all duration-500 shine-effect"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1500 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${promo.image})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/60 to-secondary/20 transition-all duration-500 group-hover:from-secondary/95" />
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                <div className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 shadow-glow-red">
                  {promo.smallText}
                </div>
                <div className="glass border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {promo.accent}
                </div>
              </div>

              <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:block">
                <div className="w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="w-0 h-[2px] bg-primary mb-5 group-hover:w-16 transition-all duration-500" />
                <h3 className="text-white text-3xl md:text-4xl font-black mb-2 leading-tight tracking-tighter group-hover:text-primary transition-colors duration-500">
                  {promo.largeText}
                </h3>
                <p className="text-gray-300 text-sm mb-6 font-medium italic">
                  {promo.subText}
                </p>

                <a
                  href="#"
                  className="group/btn inline-flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest"
                >
                  <span className="relative">
                    View Details
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary group-hover/btn:-rotate-45 transition-all duration-500">
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </a>
              </div>

              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}
