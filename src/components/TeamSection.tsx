import Image from "next/image";
import { StaggerItem } from "@/components/ScrollReveal";

const teamMembers = [
  {
    name: "Alex Leeman",
    role: "Director",
    img: "https://i.pravatar.cc/300?img=11",
  },
  {
    name: "Diago Johnson",
    role: "Sales Manager",
    img: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Sophia Lauren",
    role: "Co-Founder",
    img: "https://i.pravatar.cc/300?img=13",
  },
  {
    name: "William Henry",
    role: "Marketing",
    img: "https://i.pravatar.cc/300?img=14",
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-black uppercase tracking-[0.3em] block mb-5">
            our team
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-heading tracking-tighter">
            The amazing team behind our company
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {teamMembers.map((member) => (
            <StaggerItem key={member.name} direction="up">
            <div className="text-center group">
              <div className="relative mb-6 mx-auto w-44 h-44 lg:w-48 lg:h-48">
                <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-110 transition-transform duration-500" />
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="192px"
                  className="rounded-full object-cover border-[3px] border-white/10 group-hover:border-primary transition-all duration-500"
                />
              </div>
              <h5 className="text-xl font-black text-heading mb-1">
                {member.name}
              </h5>
              <span className="designation text-sm text-primary font-bold uppercase tracking-wider">
                {member.role}
              </span>
              <div className="flex items-center justify-center gap-3 mt-5">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary border border-white/10 hover:border-primary flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <svg
                    className="w-3.5 h-3.5 text-body group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary border border-white/10 hover:border-primary flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <svg
                    className="w-3.5 h-3.5 text-body group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Behance"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary border border-white/10 hover:border-primary flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <svg
                    className="w-3.5 h-3.5 text-body group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219z" />
                  </svg>
                </a>
              </div>
            </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}
