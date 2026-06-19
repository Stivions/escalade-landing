"use client";

import * as React from "react";
import { Logo } from "./logo";

const NAV_LINKS = [
  { href: "#problema", label: "Problema" },
  { href: "#agentes", label: "Agentes" },
  { href: "#0g", label: "0G" },
  { href: "#pruebas", label: "Pruebas" },
  { href: "#metricas", label: "Métricas" },
  { href: "#flujo", label: "Flujo" },
  { href: "#resultados", label: "Resultados" },
];

export function TopNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border-primary bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo
            variant="full"
            size={30}
            wordmarkClassName="text-2xl text-primary"
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-[13px] font-medium text-secondary transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          className="flex size-9 items-center justify-center text-primary md:hidden"
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
        <div className="border-t border-border-primary bg-paper md:hidden">
          <nav className="mx-auto flex max-w-[1200px] flex-col px-6 py-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-3 text-sm font-medium text-secondary transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
