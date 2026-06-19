"use client";

import { Reveal } from "./reveal";

const TASKS = [
  "Descubrir tendencias",
  "Monitorear repos en GitHub",
  "Investigar nuevas tecnologías",
  "Crear publicaciones para redes",
  "Editar videos",
  "Generar Shorts",
  "Publicar en múltiples plataformas",
  "Analizar resultados y métricas",
];

export function ProblemSection() {
  return (
    <section id="problema" className="border-t border-border-primary px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-tertiary">
              El problema
            </p>
            <h2 className="mt-6 font-display text-[40px] leading-[1.02] tracking-tight text-primary sm:text-[56px] lg:text-[64px]">
              Demasiado tiempo en tareas repetitivas.
            </h2>
          </Reveal>

          <div>
            <Reveal delayMs={100}>
              <p className="text-lg leading-relaxed text-secondary">
                Creadores, desarrolladores, startups y equipos de medios fragmentan
                su flujo entre múltiples herramientas y procesos manuales. Las
                soluciones existentes automatizan solo una parte del ciclo.
              </p>
            </Reveal>

            <Reveal delayMs={200}>
              <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {TASKS.map((task) => (
                  <li
                    key={task}
                    className="flex items-center gap-3 border-b border-border-primary py-2.5 text-[15px] text-secondary"
                  >
                    <span className="size-1 shrink-0 rounded-full bg-tertiary" />
                    {task}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
