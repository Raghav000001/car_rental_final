import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

const links = [
  { label: "About", href: "/about", desc: "Our story" },
  { label: "Our Team", href: "/team", desc: "Leadership" },
  { label: "Pricing", href: "/pricing", desc: "Plans" },
  { label: "Service Areas", href: "/service-areas", desc: "Cities" },
  { label: "FAQ", href: "/faq", desc: "Help" },
  { label: "Testimonials", href: "/testimonials", desc: "Reviews" },
  { label: "Gallery", href: "/gallery", desc: "Visual tour" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />

      <section className="relative pt-40 pb-20 bg-secondary overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <span className="bento-chip mb-6 inline-block">Error 404</span>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter mb-4">
            404 Error
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-body">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-primary">404 Error</span>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-bg-dark relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="relative max-w-3xl mx-auto px-4 lg:px-8 text-center">
          <div className="bento-card p-12 lg:p-16">
            <div className="text-[150px] md:text-[220px] lg:text-[280px] font-black italic leading-[0.85] mb-4">
              <span className="text-gradient-primary">4</span>
              <span className="relative inline-block mx-2">
                <span className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full" />
                <span className="relative text-white">0</span>
              </span>
              <span className="text-gradient-primary">4</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white italic tracking-tight mb-6">
              Lost on the <span className="text-gradient-primary">Road?</span>
            </h2>

            <p className="text-body text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              The page you&apos;re looking for has taken a wrong turn. Let&apos;s
              get you back on track to your perfect ride.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/"
                className="group bg-primary hover:bg-white text-white hover:text-secondary font-black px-8 py-4 transition-all duration-300 text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Back To Home
              </Link>
              <Link
                href="/checkout"
                className="px-8 py-4 border border-white/20 hover:border-white text-white font-black text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/10"
              >
                Book A Ride
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="bento-chip mb-4 inline-block">Navigate</span>
            <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tight">
              Quick Links
            </h2>
            <p className="text-body text-sm mt-3">
              Hop to one of these pages instead
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {links.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className="group bento-card p-6 flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-black tracking-[0.3em] text-primary/80 uppercase">
                    /0{i + 1}
                  </span>
                  <h3 className="text-xl font-black text-white italic tracking-tight mt-1 group-hover:text-primary transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-body text-xs mt-0.5">{link.desc}</p>
                </div>
                <svg
                  className="w-5 h-5 text-body group-hover:text-primary group-hover:translate-x-1 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
}
