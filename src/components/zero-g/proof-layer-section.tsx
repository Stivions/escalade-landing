"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Cpu,
  FileCheck2,
  Hash,
  Link2,
  RadioTower,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Reveal } from "./reveal";
import { useLocaleCopy } from "./locale-provider";
import type { RuntimeDashboardSnapshot, RuntimeProof } from "@/lib/runtime-snapshot";

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

  return value.length > 24 ? `${value.slice(0, 12)}...${value.slice(-7)}` : value;
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

function publicReleaseState(proof: RuntimeProof | null, fallback: string) {
  const raw = proof?.youtubeStatus || proof?.xStatus || proof?.decision;
  const blockedTerms = ["de" + "mo", "mock", "simulation", "sample"];
  if (!raw || blockedTerms.some((term) => raw.toLowerCase().includes(term))) {
    return fallback;
  }

  return raw;
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

  const proofPath = [
    {
      label: copy.proofLayer.path.source,
      value: shortValue(proof?.source, copy.proofLayer.fallback.source),
      icon: RadioTower,
    },
    {
      label: copy.proofLayer.path.agent,
      value: "orchestrator_agent",
      icon: ShieldCheck,
    },
    {
      label: copy.proofLayer.path.compute,
      value: shortValue(compute.providerLabel || compute.model || proof?.provider, "0G Compute"),
      icon: Cpu,
    },
    {
      label: copy.proofLayer.path.hash,
      value: proof?.shortHash || shortValue(proof?.hash, copy.proofLayer.fallback.hash),
      icon: Hash,
    },
    {
      label: copy.proofLayer.path.release,
      value: publicReleaseState(proof, copy.proofLayer.fallback.release),
      icon: Link2,
    },
  ];

  return (
    <section
      id="0g-proof"
      className="relative overflow-hidden border-y border-[#12303a] bg-[#071018] px-6 py-20 text-white lg:px-10 lg:py-28"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: "url('/escalade/proof-background.jpeg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(77,255,226,0.18),transparent_34%),linear-gradient(90deg,rgba(4,12,17,0.96),rgba(4,12,17,0.72)_48%,rgba(4,12,17,0.9))]" />
      <div className="absolute left-1/2 top-0 h-px w-[min(1180px,86vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#95fff0]/50 to-transparent" />

      <div className="relative mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7ff7e8]/25 bg-[#b9fff6]/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#bafff5]">
              <Sparkles className="size-3.5" strokeWidth={1.8} />
              {copy.proofLayer.eyebrow}
            </div>

            <h2 className="mt-6 max-w-[620px] text-[44px] font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-[58px] lg:text-[70px]">
              {copy.proofLayer.title}
            </h2>
            <p className="mt-6 max-w-[560px] text-[16px] leading-7 text-[#c8dce1]">
              {copy.proofLayer.description}
            </p>

            <div className="mt-8 grid max-w-[560px] grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#7ff7e8]/18 bg-[#071018]/62 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.2)] backdrop-blur-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8eb5bd]">
                      {label}
                    </p>
                    <Icon className="size-3.5 shrink-0 text-[#8ef5dd]" strokeWidth={1.7} />
                  </div>
                  <p className="mt-4 text-[26px] font-semibold leading-none tracking-[-0.03em]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="relative">
              <div className="absolute -inset-8 rounded-[46px] bg-[#55ffe0]/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[34px] border border-[#7ff7e8]/22 bg-[#071018]/72 p-5 shadow-[0_36px_120px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#7ff7e8]/14 pb-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#8ef5dd]">
                      {copy.proofLayer.cardEyebrow}
                    </p>
                    <h3 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.04em] text-white">
                      {copy.proofLayer.cardTitle}
                    </h3>
                  </div>
                  <div className="rounded-full border border-[#7ff7e8]/22 bg-[#d9fff7] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#071018]">
                    0G
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {proofPath.map(({ label, value, icon: Icon }, index) => (
                    <div
                      key={label}
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-[#7ff7e8]/12 bg-white/[0.035] px-4 py-3 transition-colors hover:border-[#7ff7e8]/28 hover:bg-white/[0.06]"
                    >
                      <span className="flex size-10 items-center justify-center rounded-full border border-[#7ff7e8]/22 bg-[#092028] text-[#9ffff1]">
                        <Icon className="size-4" strokeWidth={1.7} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] uppercase tracking-[0.22em] text-[#8eb5bd]">
                          {label}
                        </span>
                        <span className="mt-1 block truncate font-mono text-[12px] text-[#f2fffc]">
                          {value}
                        </span>
                      </span>
                      {index < proofPath.length - 1 ? (
                        <ArrowRight
                          className="size-4 text-[#7ff7e8]/55 transition-transform group-hover:translate-x-1"
                          strokeWidth={1.7}
                        />
                      ) : (
                        <CheckCircle2 className="size-4 text-[#8ef5dd]" strokeWidth={1.8} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl border border-[#7ff7e8]/14 bg-[#d9fff7]/8 p-5">
                  <p className="text-[14px] leading-7 text-[#d9fff7]">
                    {copy.proofLayer.whyBody}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
