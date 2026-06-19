"use client";

import { Reveal } from "./reveal";

const FIELDS = [
  { label: "timestamp", desc: "Fecha y hora exacta" },
  { label: "agent_id", desc: "Identidad del agente" },
  { label: "source", desc: "Fuente analizada" },
  { label: "prompt", desc: "Instrucción enviada al modelo" },
  { label: "response", desc: "Respuesta generada por la IA" },
  { label: "action", desc: "Acción final ejecutada" },
  { label: "metrics", desc: "Indicadores medidos" },
  { label: "storage_ref", desc: "Referencia en 0G Storage" },
];

export function VerifiableDecisionsSection() {
  return (
    <section id="pruebas" className="border-t border-border-primary px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-tertiary">
              Decisiones verificables
            </p>
            <h2 className="mt-6 font-display text-[40px] leading-[1.02] tracking-tight text-primary sm:text-[56px] lg:text-[64px]">
              Cada decisión deja una traza.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-secondary">
              Cada acción importante genera una prueba estructurada que puede ser
              auditada y reproducida. Por qué se seleccionó un repositorio, por
              qué se priorizó una tendencia, por qué se generó un clip.
            </p>
          </Reveal>

          {/* Terminal-style record */}
          <Reveal delayMs={120}>
            <div className="overflow-hidden rounded-2xl border border-border-primary bg-[#0a0a0a] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#ff5f56]" />
                <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="size-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-3 font-mono text-[11px] text-white/40">
                  decision_record.json · 0G Storage
                </span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-[12px] leading-relaxed text-white/80 lg:text-[13px]">
                <code>{`{
  `}<span className="text-[#7dd3fc]">"timestamp"</span>{`: `}<span className="text-[#fde047]">"2026-06-18T14:32:08Z"</span>{`,
  `}<span className="text-[#7dd3fc]">"agent_id"</span>{`: `}<span className="text-[#fde047]">"research_agent"</span>{`,
  `}<span className="text-[#7dd3fc]">"source"</span>{`: `}<span className="text-[#fde047]">"github.com/0glabs/0g-monorepo"</span>{`,
  `}<span className="text-[#7dd3fc]">"prompt"</span>{`: `}<span className="text-[#fde047]">"Evalúa potencial viral"</span>{`,
  `}<span className="text-[#7dd3fc]">"response"</span>{`: `}<span className="text-[#fde047]">"score: 0.87, trending"</span>{`,
  `}<span className="text-[#7dd3fc]">"action"</span>{`: `}<span className="text-[#fde047]">"queue_for_x_publication"</span>{`,
  `}<span className="text-[#7dd3fc]">"metrics"</span>{`: { `}<span className="text-[#fde047]">"stars"</span>{`: 1240, `}<span className="text-[#fde047]">"forks"</span>{`: 318 },
  `}<span className="text-[#7dd3fc]">"storage_ref"</span>{`: `}<span className="text-[#84cc16]">"0g://0x4a2b...c8f1"</span>{`
}`}</code>
              </pre>
            </div>
          </Reveal>
        </div>

        {/* 8 fields grid */}
        <Reveal delayMs={200}>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border-primary bg-border-primary sm:grid-cols-2 lg:grid-cols-4">
            {FIELDS.map((f, i) => (
              <div key={f.label} className="bg-paper p-5">
                <div className="flex items-center justify-between">
                  <code className="font-mono text-[13px] text-primary">
                    {f.label}
                  </code>
                  <span className="font-mono text-[10px] text-quaternary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-snug text-tertiary">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
