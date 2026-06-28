"use client";

import * as React from "react";
import { Logo } from "./logo";
import { useLocaleCopy } from "./locale-provider";

export function TopNav() {
  const { locale, setLocale, copy } = useLocaleCopy();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navLinks = [
    { href: "#problema", label: copy.nav.problem },
    { href: "#proof", label: copy.nav.proof },
    { href: "#agentes", label: copy.nav.runtime },
    { href: "#resultados", label: copy.nav.results },
  ];

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-[1240px] rounded-full border px-3 py-3 transition-all duration-300 sm:px-4 ${
          scrolled
            ? "border-white/65 bg-white/72 shadow-[0_20px_60px_rgba(23,67,73,0.12)] backdrop-blur-xl"
            : "border-white/55 bg-white/44 shadow-[0_16px_48px_rgba(23,67,73,0.08)] backdrop-blur-lg"
        }`}
      >
        <div className="flex items-center gap-4">
          <a href="#top" className="flex items-center gap-2.5">
            <Logo
              variant="full"
              size={30}
              wordmarkClassName="text-[29px] text-[#0c1720]"
            />
          </a>

          <div className="hidden flex-1 items-center justify-center md:flex">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-[13px] font-medium text-[#365c62] transition-colors hover:text-[#0f232d]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="ml-auto hidden md:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/68 px-2 py-2 backdrop-blur-md">
              <div className="mr-1 inline-flex items-center rounded-full border border-[#d9ebea] bg-white/82 p-1">
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    locale === "en"
                      ? "bg-[#0b1418] text-white"
                      : "text-[#4b6a70] hover:text-[#0f232d]"
                  }`}
                >
                  {copy.nav.english}
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("es")}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    locale === "es"
                      ? "bg-[#0b1418] text-white"
                      : "text-[#4b6a70] hover:text-[#0f232d]"
                  }`}
                >
                  {copy.nav.spanish}
                </button>
              </div>

              <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#4b6a70]">
                {copy.nav.partner}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="ml-auto flex size-10 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[#0f232d] md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none">
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                d={mobileOpen ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"}
              />
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="mt-3 border-t border-white/65 pt-3 md:hidden">
            <div className="mb-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                  locale === "en"
                    ? "bg-[#0b1418] text-white"
                    : "border border-white/65 bg-white/60 text-[#365c62]"
                }`}
              >
                {copy.nav.english}
              </button>
              <button
                type="button"
                onClick={() => setLocale("es")}
                className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                  locale === "es"
                    ? "bg-[#0b1418] text-white"
                    : "border border-white/65 bg-white/60 text-[#365c62]"
                }`}
              >
                {copy.nav.spanish}
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-3 py-3 text-sm font-medium text-[#365c62] transition-colors hover:bg-white/60 hover:text-[#0f232d]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
