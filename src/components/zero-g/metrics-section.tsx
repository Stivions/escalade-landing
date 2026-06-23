"use client";

import { Reveal } from "./reveal";

const METRICS = [
  "Repositorios analizados",
  "Fuentes analizadas",
  "Decisiones tomadas por IA",
  "Tweets generados",
  "Hilos generados",
  "Respuestas generadas",
  "Videos procesados",
  "Shorts generados",
  "Shorts publicados",
  "Acciones de publicación",
  "Errores recuperados",
  "Tiempo promedio de procesamiento",
  "Tiempo de actividad",
  "Pruebas generadas",
  "Pruebas almacenadas",
];

export function MetricsSection() {
  return (
    <section id="metricas" className="border-t border-border-primary px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-tertiary">
              Sistema de métricas
            </p>
            <h2 className="mt-6 font-display text-[40px] leading-[1.02] tracking-tight text-primary sm:text-[56px] lg:text-[64px]">
              Medir para probar impacto.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-secondary">
              15 indicadores monitoreados en tiempo real. El objetivo no es solo
              operar, sino probar rendimiento de forma verificable.
            </p>
            <div className="mt-10 flex items-baseline gap-3 border-t border-border-primary pt-8">
              <span className="font-display text-6xl leading-none text-primary">
                15
              </span>
              <span className="text-sm text-tertiary">
                métricas
                <br />
                en vivo
              </span>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border-primary bg-border-primary sm:grid-cols-2">
              {METRICS.map((m, i) => (
                <li
                  key={m}
                  className={`flex items-center justify-between gap-3 bg-paper p-4 transition-colors hover:bg-hover-tertiary${
                    i === METRICS.length - 1 && METRICS.length % 2 === 1
                      ? " sm:col-span-2"
                      : ""
                  }`}
                >
                  <span className="text-[14px] text-secondary">{m}</span>
                  <span className="font-mono text-[11px] text-quaternary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
