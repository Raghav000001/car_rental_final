"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavLink = { label: string; href: string };
type NavItem =
  | { label: string; href: string }
  | { label: string; links: NavLink[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Car Fleet", href: "/fleet" },
  {
    label: "Pages",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "FAQ", href: "/faq" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Service Areas", href: "/service-areas" },
      { label: "Area Details", href: "/service-areas" },
      { label: "Gallery", href: "/gallery" },
      { label: "Pricing", href: "/contact" },
      { label: "404", href: "/not-found" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const toggleAccordion = (label: string) => {
    setMobileAccordion(mobileAccordion === label ? null : label);
  };

  const isActive = (href: string) => pathname === href;

  const isParentActive = (item: NavItem) => {
    if ("href" in item) return isActive(item.href);
    return item.links.some((link) => link.href !== "#" && isActive(link.href));
  };

  return (
    <>
      <div className="hidden lg:block bg-secondary border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-[44px]">
            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2 text-body">
                <svg
                  className="w-3.5 h-3.5 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="font-semibold tracking-wide">
                  Open Hours: Mon - Fri 8.00 am - 6.00 pm
                </span>
              </div>
              <a
                href="tel:+912136660027"
                className="flex items-center gap-2 text-body hover:text-primary transition-colors duration-200 group"
              >
                <svg
                  className="w-3.5 h-3.5 text-primary shrink-0"
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
                <span className="font-semibold tracking-wide">
                  +91-213-666-0027
                </span>
              </a>
              <a
                href="mailto:info@rohittour.in"
                className="flex items-center gap-2 text-body hover:text-primary transition-colors duration-200 group"
              >
                <svg
                  className="w-3.5 h-3.5 text-primary shrink-0"
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
                <span className="font-semibold tracking-wide">
                  info@rohittour.in
                </span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-body font-semibold tracking-wide">
                Follow Us:
              </span>
              {[
                {
                  name: "Facebook",
                  path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                  url: "https://facebook.com/rohittourtravel",
                },
                {
                  name: "Twitter",
                  path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                  url: "https://twitter.com/rohittourtravel",
                },
                {
                  name: "Instagram",
                  path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z",
                  url: "https://instagram.com/rohittourtravel",
                },
                {
                  name: "LinkedIn",
                  path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
                  url: "https://linkedin.com/company/rohittourtravel",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-6 h-6 rounded-full border border-white/10 hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center text-body transition-all duration-200 group"
                >
                  <svg
                    className="w-2.5 h-2.5 group-hover:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={social.path}
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 bg-secondary/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-b border-white/5"
            : "top-0 lg:top-[44px] bg-secondary/95 lg:bg-secondary"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <Link href="/" className="flex items-center group shrink-0">
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <Image src="/logo.png" alt="Rohit Tour & Travel" fill className="object-contain" priority />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => {
                const parentActive = isParentActive(item);
                const hasDropdown = "links" in item && item.links.length > 0;

                return (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => hasDropdown && setOpenDropdown(item.label)}
                    onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
                  >
                    {"href" in item ? (
                      <Link
                        href={item.href}
                        className="relative px-4 py-3 text-[15px] font-bold text-gray-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
                      >
                        <span className={parentActive ? "text-primary" : ""}>
                          {item.label}
                        </span>
                        <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </Link>
                    ) : (
                      <>
                        <button className="relative px-4 py-3 text-[15px] font-bold text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1.5 cursor-pointer">
                          <span className={parentActive ? "text-primary" : ""}>
                            {item.label}
                          </span>
                          <svg
                            className={`w-3 h-3 transition-transform duration-300 ${
                              openDropdown === item.label
                                ? "rotate-180 text-primary"
                                : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </button>

                        {openDropdown === item.label && (
                          <div className="absolute top-full left-0 mt-0 bg-secondary/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-2 border-primary py-3 min-w-[220px] z-50 animate-fadeInDown">
                            {item.links.map((link) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                className={`block px-6 py-2.5 text-sm font-semibold transition-all duration-200 relative group/link ${
                                  isActive(link.href)
                                    ? "text-primary bg-white/5"
                                    : "text-gray-300 hover:text-primary hover:pl-8 hover:bg-white/5"
                                }`}
                              >
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-primary group-hover/link:w-2 transition-all duration-200" />
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-primary text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer group border border-white/5 hover:border-primary"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <Link
                href="/contact"
                className="group relative bg-primary hover:bg-white text-white hover:text-secondary font-black px-6 py-2.5 transition-all duration-300 text-sm uppercase tracking-wider cursor-pointer overflow-hidden shine-effect"
              >
                <span className="relative z-10">Contact</span>
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-white hover:text-primary transition-colors cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-black/95 backdrop-blur-xl animate-fadeIn">
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full px-4 lg:px-8 py-6">
            <Link href="/" className="flex items-center">
              <div className="relative w-11 h-11">
                <Image src="/logo.png" alt="Rohit Tour & Travel" fill className="object-contain" />
              </div>
            </Link>
            <button
              onClick={() => setSearchOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Close search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Type your keyword and hit..."
                  className="w-full bg-transparent border-b-2 border-white/20 text-white text-3xl lg:text-4xl font-light py-4 pr-14 focus:outline-none focus:border-primary transition-colors duration-300 placeholder-gray-600"
                  autoFocus
                />
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-primary transition-colors duration-300 cursor-pointer"
                  aria-label="Submit search"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-4 tracking-wide">
                Search for cars, brands, locations...
              </p>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[55] lg:hidden animate-fadeIn"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-secondary z-[60] shadow-2xl transform transition-transform duration-500 ease-out lg:hidden overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <Link href="/" className="flex items-center">
            <div className="relative w-11 h-11">
              <Image src="/logo.png" alt="Rohit Tour & Travel" fill className="object-contain" />
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 cursor-pointer text-body hover:text-primary hover:bg-white/5 rounded-lg transition-all"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="py-2">
          {navItems.map((item) => (
            <div key={item.label}>
              {"links" in item ? (
                <>
                  <button
                    className="w-full flex items-center justify-between px-6 py-3.5 text-sm font-bold text-white hover:text-primary hover:bg-white/5 transition-all duration-150 cursor-pointer uppercase tracking-wider"
                    onClick={() => toggleAccordion(item.label)}
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 ${
                        mobileAccordion === item.label
                          ? "rotate-180 text-primary"
                          : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {mobileAccordion === item.label && (
                    <div className="bg-black/20 border-l-2 border-primary/50 ml-6 mb-1 overflow-hidden animate-fadeIn">
                      {item.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={`block px-4 py-2.5 text-sm font-medium transition-all duration-150 ${
                            isActive(link.href)
                              ? "text-primary bg-primary/5 border-l-2 border-primary -ml-[2px]"
                              : "text-gray-300 hover:text-primary hover:bg-white/5"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center px-6 py-3.5 text-sm font-bold text-white hover:text-primary hover:bg-white/5 transition-all duration-150 uppercase tracking-wider"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 py-5 border-t border-white/10 space-y-3.5">
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.15em]">
            Contact Info
          </h4>
          <div className="flex items-start gap-3 text-sm text-body">
            <svg
              className="w-4 h-4 text-primary shrink-0 mt-0.5"
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
            <span>Sector 14, Rohtak, Haryana 124001, India</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-body">
            <svg
              className="w-4 h-4 text-primary shrink-0"
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
            <a
              href="tel:+912136660027"
              className="hover:text-primary transition-colors"
            >
              +91-213-666-0027
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-body">
            <svg
              className="w-4 h-4 text-primary shrink-0"
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
            <a
              href="mailto:info@rohittour.in"
              className="hover:text-primary transition-colors"
            >
              info@rohittour.in
            </a>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-white/10">
          <p className="text-xs text-body font-bold uppercase tracking-[0.15em] mb-4">
            Follow Us On
          </p>
          <div className="flex gap-3 mb-6">
              {[
                {
                  name: "Twitter",
                  path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                  url: "https://twitter.com/rohittourtravel",
                },
                {
                  name: "Facebook",
                  path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                  url: "https://facebook.com/rohittourtravel",
                },
                {
                  name: "Pinterest",
                  path: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
                  url: "https://pinterest.com/rohittourtravel",
                },
                {
                  name: "Instagram",
                  path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z",
                  url: "https://instagram.com/rohittourtravel",
                },
                {
                  name: "YouTube",
                  path: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02V8.48l5.75 3.27z",
                  url: "https://youtube.com/@rohittourtravel",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-200 group"
                  aria-label={social.name}
                >
                <svg
                  className="w-4 h-4 text-body group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={social.path}
                  />
                </svg>
              </a>
            ))}
          </div>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block w-full bg-primary hover:bg-primary-dark text-white text-center font-black py-3.5 uppercase tracking-wider text-sm transition-all duration-300 shine-effect overflow-hidden"
          >
            Booking Now
          </Link>
        </div>
      </div>
    </>
  );
}
