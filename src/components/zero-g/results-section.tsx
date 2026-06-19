"use client";

import Image from "next/image";
import { Reveal } from "./reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Result = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const RESULTS: Result[] = [
  {
    src: "/results/twitter-1.jpg",
    width: 792,
    height: 817,
    alt: "Estadísticas de la cuenta de Twitter/X operada por los agentes",
  },
  {
    src: "/results/youtube-1.jpg",
    width: 960,
    height: 495,
    alt: "Analíticas de YouTube Studio — vistas y tiempo de visualización",
  },
  {
    src: "/results/youtube-2.jpg",
    width: 960,
    height: 495,
    alt: "Analíticas de YouTube Studio — rendimiento de contenido",
  },
  {
    src: "/results/youtube-3.jpg",
    width: 960,
    height: 495,
    alt: "Analíticas de YouTube Studio — audiencia",
  },
  {
    src: "/results/youtube-4.jpg",
    width: 960,
    height: 495,
    alt: "Analíticas de YouTube Studio — alcance",
  },
];

export function ResultsSection() {
  return (
    <section
      id="resultados"
      className="border-t border-border-primary bg-paper px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-tertiary">
            Resultados
          </p>
          <h2 className="mt-6 font-display text-[40px] leading-[1.02] tracking-tight text-primary sm:text-[56px] lg:text-[64px]">
            Lo que se publica, deja huella.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">
            Capturas reales del rendimiento de las cuentas operadas por los
            agentes en Twitter/X y YouTube. Deslízalas para revisarlas.
          </p>
        </Reveal>

        <Reveal delayMs={120}>
          <Carousel
            opts={{ align: "start", loop: false }}
            className="mt-12 px-12 sm:px-0"
          >
            <CarouselContent>
              {RESULTS.map((r) => (
                <CarouselItem
                  key={r.src}
                  className="flex basis-full justify-center md:basis-4/5"
                >
                  <Image
                    src={r.src}
                    width={r.width}
                    height={r.height}
                    alt={r.alt}
                    sizes="(min-width: 768px) 80vw, 100vw"
                    className="h-auto max-h-[70vh] w-auto max-w-full rounded-2xl object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious aria-label="Resultado anterior" />
            <CarouselNext aria-label="Resultado siguiente" />
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
