import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Team - Rohit Tour & Travel Premium Car Rental",
  description:
    "Meet the passionate team behind Rohit Tour & Travel — the drivers, technicians, and leaders who make every journey exceptional.",
};

const leadership = [
  {
    name: "Rohit Sharma",
    role: "Founder & CEO",
    bio: "Built Rohit Tour & Travel from a two-car garage in Rohtak into a 32+ city premium rental brand. Obsessed with quality and customer trust.",
    initials: "RS",
    social: {
      facebook: "#",
      linkedin: "#",
      behance: "#",
    },
  },
  {
    name: "Priya Verma",
    role: "Chief Operations Officer",
    bio: "Oversees fleet operations, logistics, and customer experience across all branches. 15 years in automotive ops.",
    initials: "PV",
    social: {
      facebook: "#",
      linkedin: "#",
      behance: "#",
    },
  },
  {
    name: "Arjun Singh",
    role: "Head of Fleet",
    bio: "Curator of our 850+ premium vehicles — from economy hatchbacks to luxury SUVs. Every car meets his exacting standards.",
    initials: "AS",
    social: {
      facebook: "#",
      linkedin: "#",
      behance: "#",
    },
  },
  {
    name: "Neha Kapoor",
    role: "Customer Success Lead",
    bio: "Your first point of contact. Ensures every booking is seamless from start to finish with 24/7 support.",
    initials: "NK",
    social: {
      facebook: "#",
      linkedin: "#",
      behance: "#",
    },
  },
];

const departments = [
  { title: "Operations", count: 42, desc: "Dispatch, logistics, and on-ground service experts who keep our fleet moving across 32+ cities." },
  { title: "Customer Support", count: 28, desc: "24/7 multilingual support team — your call is always answered in under 30 seconds." },
  { title: "Technicians", count: 35, desc: "Certified mechanics and detailers who keep every vehicle in factory-fresh condition." },
  { title: "Drivers", count: 180, desc: "Trained, vetted, and background-checked chauffeurs for self-drive and outstation trips." },
];

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-44 pb-24 lg:pt-52 lg:pb-28 overflow-hidden bg-secondary">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-bg-dark" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
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
            <nav aria-label="Breadcrumb" className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm">
              <Link href="/" className="text-body hover:text-primary transition-colors font-semibold">Home</Link>
              <span className="text-primary/60">/</span>
              <span className="text-white font-bold">Our Team</span>
            </nav>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-25" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-14">
              <span className="bento-chip mb-4">Our Team</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] mt-4">
                The Amazing Team Behind<br />
                <span className="text-gradient-primary">Our Company</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((person) => (
                <div
                  key={person.name}
                  className="group relative bg-[#1a1a1a]/50 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_50px_-10px_rgba(220,38,38,0.25)] hover:-translate-y-1.5"
                >
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-primary/20 via-bg-light to-secondary">
                    <div className="absolute inset-0 dot-pattern opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-secondary border-2 border-primary/60 flex items-center justify-center shadow-glow-red group-hover:border-primary group-hover:shadow-glow-red-strong transition-all duration-500 group-hover:scale-105">
                          <span className="text-3xl sm:text-4xl font-black text-white italic tracking-tighter">
                            {person.initials}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <a href={person.social.facebook} aria-label="Facebook" className="w-9 h-9 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                      </a>
                      <a href={person.social.linkedin} aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></svg>
                      </a>
                      <a href={person.social.behance} aria-label="Behance" className="w-9 h-9 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 3.426.156.622.113 1.512-.068 2.19H15.75c0 2.016 1.37 2.701 2.647 2.701 1.171 0 1.838-.454 2.303-1.133l1.995 1.011zM15.75 12.45h3.83c-.168-1.095-1.006-1.702-1.97-1.702-1.044 0-1.802.61-1.86 1.702zM7.5 7.5h-5v2h5v-2zm-5 4.5h4.5c1.286 0 2.296.694 2.296 2.25 0 .891-.423 1.665-1.07 2.017.88.375 1.47 1.177 1.47 2.267 0 2.125-1.769 2.966-3.426 2.966H2.5v-9.5zM5 13.5H4v2h1c.775 0 1.095-.326 1.095-.936 0-.634-.336-1.064-1.095-1.064zM4 17h1.3c.857 0 1.248.44 1.248 1.165 0 .715-.385 1.335-1.398 1.335H4v-2.5z" /></svg>
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-lg font-black text-white italic tracking-tight">{person.name}</h3>
                    </div>
                    <p className="text-primary text-[11px] font-black tracking-[0.2em] uppercase mb-3">{person.role}</p>
                    <p className="text-body text-sm leading-relaxed">{person.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-14">
              <span className="bento-chip mb-4">Departments</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] mt-4">
                <span className="text-gradient-primary">200+</span> Strong &amp; Growing
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept) => (
                <div
                  key={dept.title}
                  className="group relative p-8 lg:p-10 flex flex-col gap-4 min-h-[260px] bg-[#1a1a1a]/50 backdrop-blur-sm border border-white/[0.06] rounded-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_50px_-10px_rgba(220,38,38,0.25)] hover:-translate-y-1.5"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-black tracking-[0.3em] text-primary/80 uppercase">
                      Department
                    </span>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                  <p className="text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.85] bg-gradient-to-r from-primary via-red-400 to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-shift">
                    {dept.count}+
                  </p>
                  <div>
                    <h3 className="text-2xl font-black text-white italic tracking-tight mb-2">{dept.title}</h3>
                    <p className="text-body text-sm leading-relaxed">{dept.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-25" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="relative p-10 lg:p-16 text-center bg-[#1a1a1a]/50 backdrop-blur-sm border border-white/[0.06] rounded-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_60px_-10px_rgba(220,38,38,0.3)]">
              <span className="bento-chip border-white/20 text-white/90 bg-white/10 mb-6">We&apos;re Hiring</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic leading-[0.9] mb-6 mt-4">
                Want To <span className="text-gradient-primary">Join Us?</span>
              </h2>
              <p className="text-body text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                We&apos;re always looking for passionate drivers, technicians, and customer champions. Become part of a team that values people over everything.
              </p>
              <a
                href="mailto:careers@rohittour.in"
                className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all duration-300"
              >
                careers@rohittour.in
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 relative overflow-hidden" style={{ background: "#dc2626" }}>
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="relative max-w-3xl mx-auto px-4 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 text-[11px] font-black tracking-[0.25em] uppercase text-white/90">
              Stay Connected
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] mb-4">
              Subscribe To Our
              <br />
              Newsletter
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Get the latest car rental deals, travel tips, and exclusive offers delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 rounded-none"
                required
              />
              <button
                type="submit"
                className="bg-secondary text-white hover:bg-black font-black px-10 py-4 transition-all duration-300 text-sm uppercase tracking-wider cursor-pointer shine-effect whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
