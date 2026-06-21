"use client";

import { Github, MessageCircleMore, Users } from "lucide-react";
import { useLocaleCopy } from "./locale-provider";

const COLLABORATORS = [
  { label: "fxckcode", href: "https://github.com/fxckcode" },
  { label: "Stivions", href: "https://github.com/Stivions" },
  { label: "Precis0x", href: "https://github.com/Precis0x" },
] as const;

const PROJECT_LINKS = [
  {
    key: "publicRepo",
    href: "https://github.com/Stivions/0g-creator-agent-network",
    icon: Github,
  },
  {
    key: "discord",
    href: "https://discord.com/invite/0glabs",
    icon: MessageCircleMore,
  },
] as const;

export function SiteFooter() {
  const { copy } = useLocaleCopy();
  const footerLinks = [
    { label: copy.footer.problem, href: "#problema" },
    { label: copy.footer.flow, href: "#flujo" },
    { label: copy.footer.runtime, href: "#agentes" },
    { label: copy.footer.results, href: "#resultados" },
  ];

  return (
    <footer className="border-t border-border-primary bg-paper px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <span className="font-display text-3xl leading-none tracking-tight text-primary">
              Escalade
            </span>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-secondary">
              {copy.footer.description}
            </p>
          </div>

          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-tertiary">
              {copy.footer.sections}
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center rounded-full border border-border-primary px-4 py-2 text-[13px] text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-tertiary">
                {copy.footer.project}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {PROJECT_LINKS.map(({ key, href, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border-primary px-4 py-2 text-[13px] text-secondary transition-colors hover:text-primary"
                  >
                    <Icon className="size-4" />
                    {copy.footer[key]}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-tertiary">
                {copy.footer.collaborators}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {COLLABORATORS.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border-primary px-4 py-2 text-[13px] text-secondary transition-colors hover:text-primary"
                  >
                    <Users className="size-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border-primary pt-6 text-[12px] text-tertiary sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Escalade</p>
          <p>{copy.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
