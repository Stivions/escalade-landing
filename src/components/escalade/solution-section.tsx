"use client";

import { Reveal } from "./reveal";
import { useLocaleCopy } from "./locale-provider";

export function SolutionSection() {
  const { copy } = useLocaleCopy();

  return (
    <section
      id="flujo"
      className="bg-primary px-6 py-24 text-inverted lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-inverted/50">
            {copy.solution.eyebrow}
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <h2 className="mt-6 max-w-4xl font-display text-[40px] leading-[1.05] tracking-tight text-inverted sm:text-[56px] lg:text-[80px]">
            {copy.solution.title}
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal delayMs={120}>
            <p className="text-lg leading-relaxed text-inverted/80 lg:text-xl">
              {copy.solution.bodyA}
            </p>

            <p className="mt-6 text-lg leading-relaxed text-inverted/80 lg:text-xl">
              {copy.solution.bodyB}
            </p>
          </Reveal>

          <Reveal delayMs={200}>
            <div className="border-l border-inverted/15 pl-8">
              <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-inverted/40">
                {copy.solution.visionEyebrow}
              </p>

              <p className="mt-4 font-display text-2xl leading-snug text-inverted lg:text-3xl">
                {copy.solution.vision}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Reveal delayMs={220}>
            <div className="rounded-[22px] border border-inverted/12 bg-white/5 px-5 py-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-inverted/42">
                {copy.solution.computeTitle}
              </p>
              <p className="mt-3 text-[15px] leading-7 text-inverted/74">
                {copy.solution.computeBody}
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={260}>
            <div className="rounded-[22px] border border-inverted/12 bg-white/5 px-5 py-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-inverted/42">
                {copy.solution.storageTitle}
              </p>
              <p className="mt-3 text-[15px] leading-7 text-inverted/74">
                {copy.solution.storageBody}
              </p>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
