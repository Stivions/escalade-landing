"use client";

import { Reveal } from "./reveal";

export function ZeroGSection() {
  return (
    <section id="0g" className="bg-primary px-6 py-24 text-inverted lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-inverted/50">
            Impulsado por 0G
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-[40px] leading-[1.02] tracking-tight text-inverted sm:text-[56px] lg:text-[72px]">
            Inteligencia y evidencia, en una sola pila.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-inverted/10 bg-inverted/10 lg:grid-cols-2">
          {/* 0G Compute */}
          <Reveal>
            <div className="flex h-full flex-col bg-primary p-8 lg:p-10">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl text-inverted">0G</span>
                <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-inverted/40">
                  Compute
                </span>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-inverted/80">
                La capa principal de inteligencia. Evalúa tendencias, analiza
                repositorios, toma decisiones y coordina el razonamiento entre
                agentes.
              </p>
              <ul className="mt-8 flex flex-col gap-2.5 border-t border-inverted/15 pt-6">
                {[
                  "Evaluar tendencias",
                  "Generar contenido",
                  "Detectar oportunidades",
                  "Priorizar acciones",
                ].map((u) => (
                  <li
                    key={u}
                    className="flex items-center gap-3 text-[14px] text-inverted/70"
                  >
                    <span className="font-mono text-[10px] text-inverted/40">→</span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* 0G Storage */}
          <Reveal delayMs={120}>
            <div className="flex h-full flex-col bg-primary p-8 lg:p-10">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl text-inverted">0G</span>
                <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-inverted/40">
                  Storage
                </span>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-inverted/80">
                La capa de almacenamiento verificable. Cada decisión queda
                registrada de forma permanente, auditable y reproducible.
              </p>
              <ul className="mt-8 flex flex-col gap-2.5 border-t border-inverted/15 pt-6">
                {[
                  "Decisiones tomadas por agentes",
                  "Resultados generados por IA",
                  "Historial de ejecuciones",
                  "Pruebas verificables",
                ].map((u) => (
                  <li
                    key={u}
                    className="flex items-center gap-3 text-[14px] text-inverted/70"
                  >
                    <span className="font-mono text-[10px] text-inverted/40">→</span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Agent identities */}
        <Reveal delayMs={200}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-[13px] text-inverted/50">Identidades:</span>
            {[
              "research_agent",
              "x_intelligence_agent",
              "youtube_shorts_agent",
              "orchestrator_agent",
            ].map((id) => (
              <code
                key={id}
                className="rounded-md border border-inverted/15 bg-inverted/5 px-3 py-1.5 font-mono text-[12px] text-inverted/80"
              >
                {id}
              </code>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
