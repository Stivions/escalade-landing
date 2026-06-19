"use client";

import { Reveal } from "./reveal";
import { AgentNetworkDiagram } from "./agent-network-diagram";

type Agent = {
  id: string;
  name: string;
  codeName: string;
  description: string;
  responsibilities: string[];
};

const ORCHESTRATOR: Agent = {
  id: "orchestrator",
  name: "Orquestador",
  codeName: "orchestrator_agent",
  description:
    "El centro de control. Coordina agentes, distribuye tareas, supervisa flujos y registra cada decisión.",
  responsibilities: [
    "Coordinar agentes",
    "Distribuir tareas",
    "Supervisar flujos de trabajo",
    "Registrar decisiones",
    "Actualizar métricas",
    "Monitorear el estado general",
  ],
};

const AGENTS: Agent[] = [
  {
    id: "research",
    name: "Investigación",
    codeName: "research_agent",
    description: "La capa de inteligencia y descubrimiento del sistema.",
    responsibilities: [
      "Descubrimiento de tendencias",
      "Análisis de repositorios",
      "Detección de oportunidades virales",
      "Validación de fuentes",
    ],
  },
  {
    id: "x",
    name: "Inteligencia para X",
    codeName: "x_intelligence_agent",
    description: "Convierte señales relevantes en contenido listo para distribuir.",
    responsibilities: [
      "Generar tweets e hilos",
      "Respuestas automáticas",
      "Gestión de colas de publicación",
      "Automatizar interacciones",
    ],
  },
  {
    id: "youtube",
    name: "YouTube Shorts",
    codeName: "youtube_shorts_agent",
    description:
      "Transforma contenido largo en formatos optimizados para consumo rápido.",
    responsibilities: [
      "Procesar videos",
      "Detectar momentos importantes",
      "Generar Shorts",
      "Programar publicaciones",
    ],
  },
];

export function MultiAgentSection() {
  return (
    <section id="agentes" className="border-t border-border-primary px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        {/* Intro with diagram on the right */}
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-tertiary">
              Arquitectura multiagente
            </p>
            <h2 className="mt-6 max-w-3xl font-display text-[40px] leading-[1.02] tracking-tight text-primary sm:text-[56px] lg:text-[72px]">
              Cuatro agentes. Una sola red.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
              Cada agente tiene una identidad independiente y responsabilidades
              claramente definidas. El orquestador los coordina a todos.
            </p>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-[320px] text-tertiary">
                <AgentNetworkDiagram />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Left column: 3 specialized agents */}
          <div className="flex flex-col gap-4">
            {AGENTS.map((agent, i) => (
              <Reveal key={agent.id} delayMs={i * 80}>
                <article className="group rounded-2xl border border-border-primary bg-paper p-6 transition-colors hover:border-primary lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl tracking-tight text-primary lg:text-3xl">
                        {agent.name}
                      </h3>
                      <code className="mt-1 block font-mono text-xs text-tertiary">
                        {agent.codeName}
                      </code>
                    </div>
                    <span className="font-mono text-xs text-quaternary">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-secondary">
                    {agent.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
                    {agent.responsibilities.map((r) => (
                      <li
                        key={r}
                        className="text-[13px] text-tertiary before:content-['·'] before:mr-1.5 before:text-quaternary"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Right column: Orchestrator — taller, distinct treatment */}
          <Reveal delayMs={160}>
            <article className="flex h-full flex-col justify-between rounded-2xl bg-primary p-6 text-inverted lg:p-8">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-inverted/50">
                      Centro de control
                    </p>
                    <h3 className="mt-2 font-display text-3xl tracking-tight text-inverted lg:text-4xl">
                      {ORCHESTRATOR.name}
                    </h3>
                    <code className="mt-1 block font-mono text-xs text-inverted/60">
                      {ORCHESTRATOR.codeName}
                    </code>
                  </div>
                  <span className="font-mono text-xs text-inverted/40">
                    04
                  </span>
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-inverted/80">
                  {ORCHESTRATOR.description}
                </p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {ORCHESTRATOR.responsibilities.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-3 text-[14px] text-inverted/80"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mini network visual */}
              <div className="mt-8 flex items-center gap-2 border-t border-inverted/15 pt-6">
                <div className="size-2 rounded-full bg-accent" />
                <div className="h-px flex-1 bg-inverted/20" />
                <div className="size-2 rounded-full bg-inverted/50" />
                <div className="size-2 rounded-full bg-inverted/50" />
                <div className="size-2 rounded-full bg-inverted/50" />
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
