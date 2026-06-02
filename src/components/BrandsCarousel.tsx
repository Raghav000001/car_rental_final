const brands = [
  "Toyota",
  "BMW",
  "Mercedes",
  "Audi",
  "Ford",
  "Tesla",
  "Honda",
  "Lamborghini",
];

export default function BrandsCarousel() {
  return (
    <section className="py-16 bg-secondary relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none" />

      <div className="relative overflow-hidden">
        <div
          className="flex gap-16 lg:gap-24 animate-marquee items-center"
          style={{ width: "fit-content" }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <span className="text-2xl md:text-3xl font-bold text-gray-600 select-none uppercase tracking-widest">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
