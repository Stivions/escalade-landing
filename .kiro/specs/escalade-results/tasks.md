# Tareas — Sección de Resultados (Escalade)

- [x] 1. Crear el componente `ResultsSection`
  - Crear `src/components/zero-g/results-section.tsx` como Client Component.
  - Encabezado editorial (eyebrow + titular `font-display` + párrafo `text-secondary`).
  - Definir el arreglo `RESULTS` con las 5 capturas de `public/results/`.
  - _Requisitos: 1, 3_

- [ ] 2. Integrar el carrusel deslizable
  - Usar `@/components/ui/carousel` (`Carousel`, `CarouselContent`, `CarouselItem`,
    `CarouselPrevious`, `CarouselNext`) con `opts={{ align: "start", loop: false }}`.
  - `CarouselItem` en `basis-full md:basis-4/5`.
  - Botones con `aria-label` en español ("Resultado anterior/siguiente").
  - _Requisitos: 2, 4_

- [ ] 3. Renderizar imágenes tal cual con next/image
  - `next/image` con `width`/`height` reales y `object-contain` dentro de una tarjeta
    `border border-border-primary bg-paper rounded-2xl overflow-hidden` con relación
    de aspecto estable.
  - `alt` descriptivo (sin emojis); sin difuminar.
  - _Requisitos: 2, 3, 4_

- [ ] 4. Animación de entrada con Reveal
  - Envolver encabezado y carrusel en `Reveal` (delays escalonados).
  - _Requisitos: 3, 4_

- [ ] 5. Insertar la sección en page.tsx
  - Importar `ResultsSection` y colocarla entre `DemoFlowSection` y `ClosingSection`
    (una sola línea de inserción, sin tocar otras secciones).
  - _Requisitos: 1_

- [x] 6. Verificación
  - Arrancar dev con `node node_modules\next\dist\bin\next dev -p 3000` y confirmar 200.
  - Comprobar `id="resultados"`, orden correcto, carrusel arrastrable, teclado y botones.
  - Revisar responsive (colapso a una columna en móvil) y ritmo claro/oscuro.
  - Tomar captura para revisión y ajustar si hay desalineación.
  - _Requisitos: 1, 2, 3, 4_
