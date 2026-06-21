"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink, Github, Youtube } from "lucide-react";
import { Reveal } from "./reveal";
import { useLocaleCopy } from "./locale-provider";

const ACCOUNT_LINKS = [
  { label: "X / @anonimo1is", href: "https://x.com/anonimo1is" },
  { label: "YouTube / kiwi", href: "https://www.youtube.com/@soyverdekiwi" },
  { label: "YouTube / Stivion", href: "https://www.youtube.com/@sstivion" },
  { label: "YouTube / RACSO DRAWS", href: "https://www.youtube.com/@racsodraws" },
  { label: "YouTube / NetoxClips", href: "https://www.youtube.com/@Netoclipp" },
  { label: "YouTube / visionclip", href: "https://www.youtube.com/@visionclipvn" },
  {
    label: "Public repo",
    href: "https://github.com/Stivions/0g-creator-agent-network",
  },
] as const;

export function ResultsSection() {
  const { copy } = useLocaleCopy();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selectedItem = copy.results.items[selectedIndex];

  return (
    <section
      id="resultados"
      className="border-t border-border-primary bg-[linear-gradient(180deg,#f8fcfc_0%,#f3f8f8_100%)] px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[1260px]">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#5a7a7e]">
                {copy.results.eyebrow}
              </p>
              <h2 className="mt-5 max-w-4xl text-[38px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#091217] sm:text-[52px] lg:text-[62px]">
                {copy.results.title}
              </h2>
            </div>

            <p className="max-w-[390px] text-[15px] leading-7 text-[#516a70]">
              {copy.results.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <Reveal delayMs={80}>
            <div className="rounded-[26px] border border-[#dbe8e8] bg-white/78 p-5 shadow-[0_24px_80px_rgba(30,84,92,0.08)] backdrop-blur-xl">
              <div className="space-y-3">
                {copy.results.items.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`w-full rounded-[20px] border px-4 py-4 text-left transition-all ${
                      selectedIndex === index
                        ? "border-[#12252d] bg-[#0d171d] text-white shadow-[0_18px_46px_rgba(8,18,22,0.18)]"
                        : "border-[#d8e5e6] bg-white/88 text-[#0b1720] hover:border-[#b9d7d8]"
                    }`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.22em] opacity-55">
                      {item.meta}
                    </p>
                    <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.03em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-6 opacity-72">
                      {item.caption}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[20px] border border-[#d8e5e6] bg-white/88 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#5a7a7e]">
                  {copy.results.links}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ACCOUNT_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#d9e7e8] bg-[#f7fbfb] px-3 py-2 text-[12px] text-[#1d353b] transition-colors hover:border-[#b9d7d8]"
                    >
                      {link.href.includes("github.com") ? (
                        <Github className="size-3.5" />
                      ) : link.href.includes("youtube.com") ? (
                        <Youtube className="size-3.5" />
                      ) : (
                        <ExternalLink className="size-3.5" />
                      )}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={140}>
            <div className="overflow-hidden rounded-[28px] border border-[#dbe8e8] bg-white/82 shadow-[0_30px_100px_rgba(30,84,92,0.10)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-[#dfeaea] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="size-2.5 rounded-full bg-[#27c93f]" />
                </div>

                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5a7a7e]">
                  {copy.results.openLabel}
                </span>
              </div>

              <div className="bg-[#f8fbfb] p-5">
                <div className="overflow-hidden rounded-[24px] border border-[#dfeaea] bg-white shadow-[0_20px_60px_rgba(21,56,62,0.06)]">
                  <Image
                    src={selectedItem.src}
                    width={1200}
                    height={760}
                    alt={selectedItem.title}
                    sizes="(min-width: 1280px) 840px, (min-width: 768px) 68vw, 100vw"
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>

                <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#5a7a7e]">
                      {selectedItem.meta}
                    </p>
                    <h3 className="mt-3 text-[28px] font-semibold tracking-[-0.04em] text-[#091217]">
                      {selectedItem.title}
                    </h3>
                    <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-[#516a70]">
                      {selectedItem.caption}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-4">
                  {copy.results.items.map((item, index) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className={`overflow-hidden rounded-[18px] border text-left transition-all ${
                        selectedIndex === index
                          ? "border-[#12252d] shadow-[0_18px_48px_rgba(18,37,45,0.16)]"
                          : "border-[#dbe8e8]"
                      }`}
                    >
                      <Image
                        src={item.src}
                        width={420}
                        height={260}
                        alt={item.title}
                        sizes="(min-width: 768px) 20vw, 45vw"
                        className="aspect-[16/10] h-auto w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
