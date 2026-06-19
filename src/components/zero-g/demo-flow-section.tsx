"use client";

import { Reveal } from "./reveal";
import { LiveLogsTerminal } from "./live-logs-terminal";

const STEPS = [
  {
    n: "01",
    title: "Detección",
    description:
      "El agente de investigación detecta una tendencia o repositorio emergente.",
    agent: "research_agent",
  },
  {
    n: "02",
    title: "Evaluación",
    description: "0G Compute evalúa la oportunidad y prioriza la acción.",
    agent: "0G Compute",
  },
  {
    n: "03",
    title: "Generación X",
    description:
      "El agente de X genera tweets, hilos o respuestas a partir de la señal.",
    agent: "x_intelligence_agent",
  },
  {
    n: "04",
    title: "Generación audiovisual",
    description:
      "El agente de Shorts genera metadatos y contenido a partir del video.",
    agent: "youtube_shorts_agent",
  },
  {
    n: "05",
    title: "Validación",
    description:
      "El orquestador valida el flujo y verifica la coherencia del resultado.",
    agent: "orchestrator_agent",
  },
  {
    n: "06",
    title: "Prueba verificable",
    description:
      "Se genera una prueba estructurada que registra toda la decisión tomada.",
    agent: "0G Storage",
  },
  {
    n: "07",
    title: "Métricas",
    description:
      "Se actualizan los indicadores asociados a la ejecución del flujo.",
    agent: "Sistema de Métricas",
  },
  {
    n: "08",
    title: "Almacenamiento",
    description:
      "Los resultados quedan almacenados en la infraestructura de pruebas verificables.",
    agent: "0G Storage",
  },
];

export function DemoFlowSection() {
  return (
    <section id="flujo" className="border-t border-border-primary bg-hover-tertiary/40 px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-tertiary">
            Flujo de demostración
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-[40px] leading-[1.02] tracking-tight text-primary sm:text-[56px] lg:text-[64px]">
            De señal a publicación, en ocho pasos.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
            Desde la detección hasta el almacenamiento verificable. La traza en
            vivo muestra cómo cada agente contribuye al flujo.
          </p>
        </Reveal>

        {/* Two-column: live trace + steps */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Live terminal */}
          <Reveal delayMs={80} className="lg:sticky lg:top-24 lg:self-start">
            <LiveLogsTerminal />
          </Reveal>

          {/* Steps */}
          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delayMs={i * 40}>
                <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-border-primary py-6">
                  <span
                    className="font-display text-3xl leading-none text-accent sm:text-4xl"
                    style={{ opacity: 0.7 }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-primary sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-secondary">
                      {step.description}
                    </p>
                    <code className="mt-2 inline-block font-mono text-[11px] text-tertiary">
                      {step.agent}
                    </code>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
