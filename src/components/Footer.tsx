import Link from "next/link";

const footerResources = [
  { name: "About Team", href: "#" },
  { name: "Policies", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Press", href: "#" },
  { name: "Open Road", href: "#" },
];

const footerCommunity = [
  { name: "Newsletter", href: "#" },
  { name: "Reviews", href: "#" },
  { name: "Testimonials", href: "#" },
  { name: "Social Group", href: "#" },
  { name: "Helpdesk", href: "#" },
];

const socialIcons = [
  {
    name: "Facebook",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    name: "Twitter",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  },
  {
    name: "LinkedIn",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  },
  {
    name: "Dribbble",
    href: "#",
    viewBox: "0 0 24 24",
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.6 5.5c.74 1.07 1.2 2.33 1.3 3.7-.16-.02-.34-.03-.52-.03-2.28 0-4.37.78-6.04 2.08l-1.5-2.8c2.28-1.34 4.93-2.15 7.78-2.15.33 0 .66.02.98.06zM12 3.8c2.68 0 5.1.97 6.97 2.57-2.85.18-5.5 1.08-7.8 2.5l-1.5-2.78C11.4 4.3 11.68 3.8 12 3.8zm-4.2 2.1l1.5 2.8c-2.2 1.56-3.8 3.8-4.5 6.4l-2.63-.86C3.5 11.4 5.6 6.7 7.8 5.9zm-3.7 9.2l2.64.86c.76 2.3 2.5 4.1 4.8 4.9l-.98 2.52c-3.16-.8-5.7-3.2-6.46-6.28zm9.9 5.98l.98-2.52c1.2-.4 2.3-1.02 3.24-1.82.36-.3.7-.62 1-.96.4.52.76 1.07 1.06 1.66-1.46 1.9-3.68 3.2-6.2 3.56h-.08z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="inline-flex items-center mb-5">
              <img src="/logo.png" alt="Rohit Tour & Travel" className="h-14 w-auto object-contain" />
            </Link>
            <p className="text-body text-sm leading-relaxed mb-6">
              We are a team of professional car rental experts dedicated to
              providing the best service for our customers.
            </p>
            <span className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-3 block">
              Follow Us On:
            </span>
            <div className="flex gap-2.5">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="group w-10 h-10 border border-white/10 hover:bg-primary hover:border-primary flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 text-body group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox={social.viewBox}
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-6">Resources</h3>
            <ul className="space-y-3">
              {footerResources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-body text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-6">Community</h3>
            <ul className="space-y-3">
              {footerCommunity.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-body text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <svg
                  className="w-5 h-5 text-primary shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-body text-sm leading-relaxed">
                  57 heold insaf Station Road, Cardiff, United Kingdom
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <svg
                  className="w-5 h-5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-body text-sm">info@rohittour.in</span>
              </li>
              <li className="flex gap-3 items-center">
                <svg
                  className="w-5 h-5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-body text-sm">029 2021 4012</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-body">
            &copy; 2026 ROHIT TOUR &amp; TRAVEL. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-body">
            <Link
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
