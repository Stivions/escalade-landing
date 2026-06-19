"use client";

import { Reveal } from "./reveal";

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border-primary bg-paper px-3 py-1.5 text-[13px] font-medium text-secondary">
      <span className="text-accent">{icon}</span>
      {children}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-paper px-6 pb-20 pt-32 lg:px-10"
    >
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      {/* Radial fade so the grid disappears towards the edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, #ffffff 80%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1100px]">
        <Reveal>
          <div className="mb-8 flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-tertiary">
              Autónomo · Verificable · 0G
            </span>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <h1 className="font-display text-[56px] leading-[0.95] tracking-tight text-primary sm:text-[80px] lg:text-[120px]">
            Agentes que crean.
            <br />
            Y lo demuestran.
          </h1>
        </Reveal>

        <Reveal delayMs={160}>
          <p className="mt-10 max-w-2xl text-balance text-xl font-medium leading-snug text-primary/80 sm:text-2xl lg:text-[28px]">
            Una red de agentes autónomos que investigan, deciden, crean y
            publican contenido — dejando una traza verificable en cada paso.
          </p>
        </Reveal>

        <Reveal delayMs={240}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Chip
              icon={
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
                  <path stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              }
            >
              0G Compute
            </Chip>
            <Chip
              icon={
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
                  <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.75" />
                  <path stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
                </svg>
              }
            >
              0G Storage
            </Chip>
            <Chip
              icon={
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
                  <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.75" />
                  <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.75" />
                  <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.75" />
                  <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M11 8l-4 8M13 8l4 8" />
                </svg>
              }
            >
              4 agentes especializados
            </Chip>
          </div>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="flex flex-col items-center gap-2 text-tertiary">
          <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
          <svg viewBox="0 0 24 24" className="size-4 animate-bounce" fill="none">
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14m0 0l6-6m-6 6l-6-6"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
