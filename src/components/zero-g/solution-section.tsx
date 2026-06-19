"use client";

import { Reveal } from "./reveal";

export function SolutionSection() {
  return (
    <section className="bg-primary px-6 py-24 text-inverted lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-inverted/50">
            La solución
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[40px] leading-[1.05] tracking-tight text-inverted sm:text-[56px] lg:text-[80px]">
            Un ciclo completo, autónomo y auditable.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal delayMs={120}>
            <p className="text-lg leading-relaxed text-inverted/80 lg:text-xl">
              El sistema monitorea señales de internet continuamente, evalúa
              oportunidades con IA, genera contenido optimizado para cada
              plataforma, crea videos cortos y almacena registros verificables de
              cada decisión.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-inverted/80 lg:text-xl">
              Cada acción puede ser rastreada, auditada y reproducida mediante la
              infraestructura de 0G.
            </p>
          </Reveal>

          <Reveal delayMs={200}>
            <div className="border-l border-inverted/15 pl-8">
              <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-inverted/40">
                Visión
              </p>
              <p className="mt-4 font-display text-2xl leading-snug text-inverted lg:text-3xl">
                Construir una infraestructura inteligente donde agentes
                especializados colaboren para descubrir, crear y distribuir — sin
                intervención humana.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Cycle visual */}
        <Reveal delayMs={300}>
          <div className="mt-24 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-inverted/15 pt-10">
            {["Investigar", "Decidir", "Crear", "Publicar", "Demostrar"].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-4">
                <span className="font-display text-xl text-inverted/90 lg:text-2xl">
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-inverted/30">→</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
