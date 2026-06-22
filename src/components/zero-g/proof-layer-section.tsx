"use client";

import { Clock3, Cpu, Database, ExternalLink, FileCheck2, Hash, ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";
import { useLocaleCopy } from "./locale-provider";
import type { RuntimeDashboardSnapshot } from "@/lib/runtime-snapshot";

function compactNumber(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function shortValue(value: string | null | undefined, fallback = "--") {
  if (!value) {
    return fallback;
  }

  return value.length > 26 ? `${value.slice(0, 14)}...${value.slice(-8)}` : value;
}

function formatLatency(value: number | null | undefined) {
  if (!value) {
    return "--";
  }

  if (value < 1000) {
    return `${Math.round(value)} ms`;
  }

  return `${(value / 1000).toFixed(1)}s`;
}

export function ProofLayerSection({
  runtime,
  channelCount,
}: {
  runtime: RuntimeDashboardSnapshot | null;
  channelCount: number;
}) {
  const { copy } = useLocaleCopy();
  const metrics = runtime?.metrics ?? {};
  const compute = runtime?.status?.compute ?? {};
  const proof = runtime?.proofs?.[0] ?? null;

  const stats = [
    {
      label: copy.proofLayer.stats.decisions,
      value: compactNumber(metrics.ai_decisions),
      icon: Cpu,
    },
    {
      label: copy.proofLayer.stats.proofs,
      value: compactNumber(metrics.proofs_generated),
      icon: FileCheck2,
    },
    {
      label: copy.proofLayer.stats.channels,
      value: channelCount ? String(channelCount) : "--",
      icon: ShieldCheck,
    },
    {
      label: copy.proofLayer.stats.latency,
      value: formatLatency(metrics.average_processing_time_ms),
      icon: Clock3,
    },
  ];

  const receiptRows = [
    {
      label: copy.proofLayer.receipt.source,
      value: proof?.source ?? copy.proofLayer.fallback.source,
    },
    {
      label: copy.proofLayer.receipt.agent,
      value: "orchestrator_agent",
    },
    {
      label: copy.proofLayer.receipt.compute,
      value: compute.providerLabel || compute.model || proof?.provider || "0G Compute",
    },
    {
      label: copy.proofLayer.receipt.model,
      value: compute.model || proof?.model || "qwen/qwen2.5-omni-7b",
    },
    {
      label: copy.proofLayer.receipt.hash,
      value: proof?.shortHash || shortValue(proof?.hash, copy.proofLayer.fallback.hash),
    },
    {
      label: copy.proofLayer.receipt.storage,
      value: runtime?.status?.storage?.mode || proof?.storage || copy.proofLayer.fallback.storage,
    },
  ];

  return (
    <section
      id="0g-proof"
      className="border-t border-[#16313a] bg-[#071018] px-6 py-24 text-white lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-16">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[0.24em] text-[#8ef5dd]">
              {copy.proofLayer.eyebrow}
            </p>
            <h2 className="mt-5 max-w-[720px] text-[42px] font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-[58px] lg:text-[74px]">
              {copy.proofLayer.title}
            </h2>
            <p className="mt-6 max-w-[620px] text-[17px] leading-8 text-[#b7cbd1]">
              {copy.proofLayer.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://escalade.dev/api/runtime/status"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#254651] bg-white/[0.03] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#d9fff7] transition-colors hover:bg-white/[0.07]"
              >
                {copy.proofLayer.statusLink}
                <ExternalLink className="size-3.5" strokeWidth={1.8} />
              </a>
              <a
                href="https://escalade.dev/api/runtime/proofs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#254651] bg-white/[0.03] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#d9fff7] transition-colors hover:bg-white/[0.07]"
              >
                {copy.proofLayer.proofsLink}
                <ExternalLink className="size-3.5" strokeWidth={1.8} />
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="min-h-[138px] rounded-[26px] border border-[#183742] bg-[#0b1720] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="max-w-[120px] text-[11px] uppercase tracking-[0.22em] text-[#7f9ba7]">
                      {label}
                    </p>
                    <Icon className="size-4 text-[#8ef5dd]" strokeWidth={1.7} />
                  </div>
                  <p className="mt-7 text-[42px] font-semibold leading-none tracking-[-0.04em] text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal delayMs={180}>
            <div className="overflow-hidden rounded-[30px] border border-[#183742] bg-[#0a141b] shadow-[0_36px_120px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between border-b border-[#183742] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="size-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7f9ba7]">
                  {copy.proofLayer.receiptTitle}
                </span>
              </div>

              <div className="grid gap-px bg-[#183742] md:grid-cols-2">
                {receiptRows.map((row) => (
                  <div key={row.label} className="bg-[#0a141b] px-5 py-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#7f9ba7]">
                      {row.label}
                    </p>
                    <p className="mt-3 break-words font-mono text-[13px] leading-6 text-[#e6fff9]">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={240}>
            <div className="h-full rounded-[30px] border border-[#183742] bg-[radial-gradient(circle_at_80%_20%,rgba(65,246,204,0.16),transparent_34%),#0b1720] p-6">
              <div className="flex size-12 items-center justify-center rounded-full border border-[#2c5f68] bg-[#d9fff7] text-[#071018]">
                <Hash className="size-5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-8 text-[30px] font-semibold leading-tight tracking-[-0.04em] text-white">
                {copy.proofLayer.whyTitle}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[#b7cbd1]">
                {copy.proofLayer.whyBody}
              </p>

              <div className="mt-8 grid gap-3">
                {copy.proofLayer.checks.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-[#183742] bg-black/10 px-4 py-3"
                  >
                    <Database className="size-4 shrink-0 text-[#8ef5dd]" strokeWidth={1.7} />
                    <span className="text-[13px] leading-6 text-[#d9fff7]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
