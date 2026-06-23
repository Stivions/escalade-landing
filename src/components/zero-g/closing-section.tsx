"use client";

import { Reveal } from "./reveal";

export function ClosingSection() {
  return (
    <section className="bg-paper px-6 py-32 lg:px-10 lg:py-48">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-tertiary">
            ¿Por qué importa?
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <p className="mt-8 max-w-4xl font-display text-[32px] leading-[1.15] tracking-tight text-primary sm:text-[44px] lg:text-[64px]">
            El futuro de la creación de contenido no es un solo modelo de IA.
            Es una <span className="text-tertiary">red de agentes especializados</span> que
            descubren, deciden, crean y evidencian cada una de sus acciones.
          </p>
        </Reveal>

        <Reveal delayMs={200}>
          <div className="mt-20 grid gap-8 border-t border-border-primary pt-10 sm:grid-cols-3">
            {[
              { k: "Investigar", v: "Señales de internet y repositorios detectados en tiempo real." },
              { k: "Decidir", v: "Decisiones registradas con identidad del agente y prompt utilizado." },
              { k: "Evidenciar", v: "Pruebas verificables almacenadas permanentemente en 0G Storage." },
            ].map((item) => (
              <div key={item.k}>
                <h3 className="font-display text-2xl tracking-tight text-primary">
                  {item.k}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={300}>
          <p className="mt-24 max-w-2xl text-pretty text-lg leading-relaxed text-secondary lg:text-xl">
            Escalade es una implementación práctica de esa
            visión: una plataforma capaz de operar de forma autónoma, escalable
            y auditable — sobre el ecosistema 0G.
          </p>
        </Reveal>

        <Reveal delayMs={380}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href="#agentes"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[14px] font-medium text-inverted transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Explorar la red
              <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none">
                <path stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </a>
            <a
              href="#pruebas"
              className="inline-flex items-center rounded-full border border-border-primary px-5 py-2.5 text-[14px] font-medium text-primary transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Ver una prueba verificable
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
