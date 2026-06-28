"use client";

import { Reveal } from "./reveal";
import { SignalPlanet } from "./signal-planet";
import { useLocaleCopy } from "./locale-provider";

const RELAYS = [
  { step: "01", label: "Scan", className: "left-[8%] top-[18%]" },
  { step: "02", label: "Write", className: "left-[24%] top-[10%]" },
  { step: "03", label: "Edit", className: "right-[24%] top-[14%]" },
  { step: "04", label: "Post", className: "right-[9%] top-[38%]" },
  { step: "05", label: "Measure", className: "left-[30%] bottom-[12%]" },
];

export function ProblemSection() {
  const { copy } = useLocaleCopy();

  return (
    <section
      id="problema"
      className="relative overflow-hidden border-t border-[#d7e9e8] bg-[#f5fbfb] px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/escalade/second-background.jpeg')] bg-cover bg-center opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(245,251,251,0.76)_0%,rgba(245,251,251,0.88)_44%,rgba(245,251,251,0.96)_100%)]" />

      <div className="relative mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.24em] text-[#4a6f75]">
                {copy.problem.eyebrow}
              </p>

              <h2 className="mt-5 text-[42px] font-semibold leading-[0.92] tracking-[-0.05em] text-[#091217] sm:text-[56px] lg:text-[68px]">
                {copy.problem.title[0]}
                <br />
                {copy.problem.title[1]}
              </h2>
            </div>

            <p className="max-w-[320px] text-[17px] leading-8 text-[#4f666d] sm:text-[18px]">
              {copy.problem.side}
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={140} className="mt-10">
          <div className="relative min-h-[460px] overflow-hidden rounded-[42px] border border-[#d9e8e9] bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(242,251,251,0.94))] shadow-[0_30px_100px_rgba(31,92,102,0.12)] backdrop-blur-md sm:min-h-[520px] lg:min-h-[580px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(172,250,243,0.18),rgba(172,250,243,0))]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,rgba(245,251,251,0),rgba(245,251,251,0.78)_55%,rgba(245,251,251,0.98)_100%)]" />

            <div className="absolute left-1/2 top-[56%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 sm:h-[360px] sm:w-[360px] lg:h-[430px] lg:w-[430px]">
              <SignalPlanet />
            </div>

            <div className="pointer-events-none absolute inset-0 z-10">
              <div className="absolute left-1/2 top-1/2 flex w-[280px] max-w-[78vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center sm:w-[340px] lg:w-[380px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5b8990]">
                  {copy.problem.centerEyebrow}
                </p>

                <h3 className="mt-4 text-[34px] font-semibold leading-[0.92] tracking-[-0.05em] text-[#091217] drop-shadow-[0_14px_40px_rgba(255,255,255,0.55)] sm:text-[44px] lg:text-[56px]">
                  {copy.problem.centerTitle[0]}
                  <br />
                  {copy.problem.centerTitle[1]}
                </h3>

                <p className="mt-4 max-w-[260px] text-[12px] font-semibold uppercase tracking-[0.28em] text-[#4b8e96] sm:max-w-none sm:text-[13px]">
                  {copy.problem.centerCaption}
                </p>
              </div>

              <div className="hidden lg:block">
                {RELAYS.map(({ step, label, className }) => (
                  <div
                    key={step}
                    className={`relay-tag ${className} absolute`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#77a0a4]">
                        {step}
                      </span>
                      <span className="text-[13px] font-semibold tracking-[-0.02em] text-[#0e1a1f]">
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx>{`
        @keyframes relayTagFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -9px, 0);
          }
        }

        .relay-tag {
          animation: relayTagFloat 5.8s ease-in-out infinite;
        }

        .relay-tag:nth-child(2) {
          animation-delay: 0.45s;
        }

        .relay-tag:nth-child(3) {
          animation-delay: 0.9s;
        }

        .relay-tag:nth-child(4) {
          animation-delay: 1.35s;
        }

        .relay-tag:nth-child(5) {
          animation-delay: 1.8s;
        }
      `}</style>
    </section>
  );
}
