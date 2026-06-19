# Diseño — Sección de Resultados (Escalade)

## Visión general

Componente nuevo `ResultsSection` (Client Component) que renderiza un encabezado
editorial y un carrusel deslizable con las capturas reales de Twitter/X y YouTube.
Se inserta con una sola línea en `src/app/page.tsx`. No se modifica ninguna sección
existente. Las imágenes se muestran tal cual (sin difuminar) usando `next/image`.

## Decisiones de diseño

- **Carrusel:** se reutiliza el componente shadcn ya presente
  `@/components/ui/carousel` (`Carousel`, `CarouselContent`, `CarouselItem`,
  `CarouselPrevious`, `CarouselNext`). Internamente usa `embla-carousel-react`, por
  lo que cumple "deslizable/arrastrable" (mouse + touch), navegación por teclado
  (flechas) y botones con `aria-label`/`sr-only`. Evita reinventar y respeta
  "verificar dependencias antes de importar".
  - `opts={{ align: "start", loop: false }}`.
- **Ritmo claro/oscuro:** la sección vecina previa sugerida (Flujo/Demo) y el Cierre
  definen el contraste. Se elige **fondo claro** (`bg-paper text-primary`) para la
  sección, separada por `border-t border-border-primary`, manteniendo alternancia.
  (Si al verificar el ritmo conviene oscuro, se cambia a `bg-primary text-inverted`
  con derivados `/80 /50 /15`.)
- **Encabezado:** patrón idéntico a `MetricsSection`/`VerifiableDecisionsSection`:
  - eyebrow: `text-[13px] font-medium uppercase tracking-[0.18em] text-tertiary`
  - titular: `font-display ... leading-[1.02] tracking-tight text-primary`
  - párrafo: `text-lg leading-relaxed text-secondary`, `max-w-2xl`.
- **Tarjeta de cada slide:** superficie con `border border-border-primary bg-paper
  rounded-2xl overflow-hidden` (estrategia de bordes finos, sin sombras dramáticas).
  Opcional: reutilizar el "window chrome" (tres puntos) de
  `verifiable-decisions-section.tsx` como encabezado de la tarjeta para coherencia.
- **Imágenes:** `next/image` con `width`/`height` reales y
  `className="h-auto w-full object-contain"`. Las imágenes horizontales de YouTube y
  la casi cuadrada de Twitter conviven dentro de un contenedor de relación de aspecto
  estable (p. ej. `aspect-[16/9]` con `object-contain` y fondo neutro) para que el
  carrusel no "salte" de tamaño entre slides.
- **Entrada:** envolver encabezado y carrusel en `Reveal` (delays escalonados),
  cumpliendo animación solo de `opacity`/`transform`.

## Estructura del componente

```tsx
"use client";
import Image from "next/image";
import { Reveal } from "./reveal";
import {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from "@/components/ui/carousel";

const RESULTS = [
  { src: "/results/twitter-1.jpg", w: 792, h: 817, alt: "Estadísticas de la cuenta de Twitter/X operada por los agentes" },
  { src: "/results/youtube-1.jpg", w: 960, h: 495, alt: "Analíticas de YouTube Studio — vistas y tiempo de visualización" },
  { src: "/results/youtube-2.jpg", w: 960, h: 495, alt: "Analíticas de YouTube Studio — rendimiento de contenido" },
  { src: "/results/youtube-3.jpg", w: 960, h: 495, alt: "Analíticas de YouTube Studio — audiencia" },
  { src: "/results/youtube-4.jpg", w: 960, h: 495, alt: "Analíticas de YouTube Studio — alcance" },
];

export function ResultsSection() {
  return (
    <section id="resultados" className="border-t border-border-primary bg-paper px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          {/* eyebrow + titular + párrafo */}
        </Reveal>
        <Reveal delayMs={120}>
          <Carousel opts={{ align: "start", loop: false }} className="mt-12">
            <CarouselContent>
              {RESULTS.map((r) => (
                <CarouselItem key={r.src} className="md:basis-4/5">
                  {/* tarjeta con borde + Image object-contain */}
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
```

## Inserción en page.tsx

Importar `ResultsSection` y colocarla entre `DemoFlowSection` y `ClosingSection`:

```tsx
<DemoFlowSection />
<ResultsSection />
<ClosingSection />
```

## Consideraciones responsive

- `CarouselItem` en `basis-full` (móvil) y `md:basis-4/5` para insinuar el siguiente
  slide en pantallas medianas/grandes.
- Botones prev/next de shadcn quedan a `-left-12/-right-12`; en móvil se añade
  margen del contenedor o se ajusta a `left-2/right-2` si fuese necesario tras
  verificación visual.

## Verificación

- Compila sin errores nuevos (lint preexistente queda fuera de alcance).
- `id="resultados"` presente; sección entre Flujo y Cierre.
- Carrusel arrastrable (mouse/touch), teclado y botones funcionan.
- Imágenes nítidas, sin difuminar, con `alt` descriptivo.
- Coherencia de tokens, bordes finos, `Reveal`, colapso a una columna en móvil.
- Captura de pantalla del resultado para revisión.
