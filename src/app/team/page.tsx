import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import TeamShowcase from "@/components/ui/team-showcase";

export const metadata: Metadata = {
  title: "Our Team - Rohit Tour & Travel Premium Car Rental",
  description:
    "Meet the passionate team behind Rohit Tour & Travel — the drivers, technicians, and leaders who make every journey exceptional.",
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — full-bleed background with team imagery */}
        <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-secondary">
          {/* Full-bleed background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80"
              alt="Premium car fleet ready for service"
              fill
              className="object-cover opacity-35"
              priority
            />
            {/* Multi-layer gradients for depth and readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-secondary" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.12)_0%,transparent_60%)]" />
          </div>

          {/* Pattern overlay */}
          <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />

          {/* Glow orbs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 glass rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-black tracking-[0.25em] uppercase text-primary">Our People</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter italic leading-[0.9] mb-6">
              Meet The{" "}
              <span className="text-gradient-primary">Team</span>
            </h1>
            <p className="text-body text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              Behind every Rohit Tour & Travel vehicle is a passionate team of 200+ professionals dedicated to making your journey exceptional.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <Link
                href="#team"
                className="group bg-primary hover:bg-white text-white hover:text-secondary font-black px-8 py-4 transition-all duration-300 text-sm uppercase tracking-wider inline-flex items-center gap-2"
              >
                Explore Team
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-white/20 hover:border-white text-white font-black text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/10 inline-flex items-center gap-2"
              >
                About Us
              </Link>
            </div>
            <nav aria-label="Breadcrumb" className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm">
              <Link href="/" className="text-body hover:text-primary transition-colors font-semibold">Home</Link>
              <span className="text-primary/60">/</span>
              <span className="text-white font-bold">Our Team</span>
            </nav>
          </div>
        </section>

        <section id="team" className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-25" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-14">
              <span className="bento-chip mb-4">Our Team</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] mt-4">
                The Amazing Team Behind<br />
                <span className="text-gradient-primary">Our Company</span>
              </h2>
            </div>
            <TeamShowcase />
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
