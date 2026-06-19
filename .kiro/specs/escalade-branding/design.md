# Diseño — Escalade Branding

## Visión general

Se añade la identidad **Escalade** a la landing existente sin rediseñarla. El núcleo
es un **sistema de logo** (mark geométrico recreado en SVG, en variantes tinta/clara)
expuesto vía un componente `<Logo />` reutilizable, aplicado en nav, footer, favicon e
imagen social, junto con la reconciliación del naming y dos correcciones puntuales.

Todo se subordina a `.kiro/steering/design-system.md`. Las skills activas
(design-taste-frontend, interface-design, frontend-design) aportan rigor de ejecución
(jerarquía, accesibilidad, performance, estados) pero **no** alteran paleta, tipografía
ni "vibe".

## Decisiones de diseño

### El asset del logo
- **Recrear como SVG vectorial** a partir del mark provisto (cubo/flecha con triángulo
  interior). Razón: nitidez a cualquier escala y recoloreado por `currentColor` para
  soportar claro/oscuro sin duplicar archivos.
  - *Alternativa si el usuario prefiere:* guardar el PNG/SVG original en `public/` y que
    `<Logo />` lo consuma; se pierde el recoloreo por token.
- El SVG usará `fill="currentColor"` en el mark, de modo que el color lo defina el
  contenedor (`text-primary` / `text-inverted`). Una sola fuente, dos apariencias.
- Variante **badge**: el mismo mark centrado dentro de un cuadrado `bg-primary`
  (o negro de marca) con `rounded-[…]`, para favicon y usos sobre claro.

### Componente `<Logo />`
Ubicación propuesta: `src/components/zero-g/logo.tsx` (junto al resto del sistema).

API propuesta:
```tsx
type LogoProps = {
  /** "mark" = solo símbolo; "full" = símbolo + wordmark "Escalade" */
  variant?: "mark" | "full";
  /** Controla el color del símbolo vía currentColor del contenedor */
  className?: string;
  /** Alto en px del símbolo (mantiene aspect-ratio). Default depende del uso */
  size?: number;
  /** Etiqueta accesible; default "Escalade" */
  label?: string;
};
```
- El símbolo se implementa como SVG inline (no `<img>`) para heredar `currentColor`
  y animar/escalar sin pérdida.
- `variant="full"` añade el wordmark `Escalade` en `font-display`, alineado a baseline
  con el mark (patrón actual del nav: `flex items-baseline gap-2`).
- Accesibilidad: `role="img"` + `aria-label={label}` en el wrapper, o `<title>` dentro del SVG.
- Sin estado interno ⇒ puede ser Server Component; se usa dentro de los `"use client"`
  existentes sin problema.

### Aplicación en TopNav (`top-nav.tsx`)
- Reemplazar el bloque actual (`<span>0G</span> + "Creator Agent Network"`) por
  `<Logo variant="full" />` enlazado a `#top`.
- Mantener el comportamiento de scroll (`bg-paper/80 backdrop-blur`). El mark usa
  `text-primary`, legible en ambos estados.
- En móvil, posible `variant="mark"` o `full` con wordmark algo menor; decidir por legibilidad.

### Aplicación en SiteFooter (`site-footer.tsx`)
- Reemplazar el bloque de marca por `<Logo variant="full" />` (tamaño footer).
- Conservar el párrafo descriptivo (ajustando "0G" → contexto Escalade) y las columnas de enlaces.

### Favicon / íconos (App Router)
- Crear `src/app/icon.svg` con la **versión badge** (mark claro sobre fondo de marca).
  Next.js lo detecta automáticamente como favicon.
- Crear `src/app/apple-icon.png` (o `apple-icon.svg` si aplica) para dispositivos Apple.
- Verificar que el `favicon` por defecto deja de aparecer.

### Imagen social / OpenGraph
- Opción A (estática): `src/app/opengraph-image.png` + `twitter-image` con logo + título sobre fondo de marca.
- Opción B (generada): `src/app/opengraph-image.tsx` usando `ImageResponse` de `next/og`
  para componer logo + "Escalade" + tagline con los tokens. Preferida por mantenibilidad.
- Actualizar `metadata.openGraph`/`twitter` para que apunten correctamente.

### Reconciliación de naming (`layout.tsx` + secciones)
- `metadata.title`: "Escalade — Infraestructura Autónoma de Creación de Contenido".
- `openGraph.title`/`siteName`/`twitter.title`/`authors`: "Escalade".
- Mantener menciones "0G Compute"/"0G Storage" como infra (hero chips, sección 0G, footer "Ecosistema").
- Barrido de copy para "0G Creator Agent Network" como **nombre de producto** → "Escalade"
  (sin tocar la narrativa de la red de agentes).

### Correcciones
- `problem-section.tsx`: "Investinar" → "Investigar".
- Validar anclas del nav contra `id`s reales:
  - Confirmados: `#problema` (problem), `#agentes` (multi-agent).
  - A verificar/añadir: `#0g` (zero-g-section), `#pruebas` (verifiable-decisions), `#flujo` (demo-flow).
  - Acción: añadir el `id` correspondiente a cada `<section>` que falte, o corregir el href.

### CTA (opcional, Requisito 8)
- Si se aprueba: botón primario en hero (junto a los chips) y/o en `closing-section`.
- Estilo: fondo `bg-primary text-inverted` o contorno fino; acento lima solo como detalle;
  estados `hover/active (-translate-y-[1px])/focus-visible:ring`.
- Sin dependencias nuevas (botón nativo estilizado o el `button` de shadcn ya presente).

## Arquitectura de archivos afectados

| Archivo | Acción |
|---|---|
| `src/components/zero-g/logo.tsx` | **Nuevo** — componente `<Logo />` + SVG inline |
| `src/components/zero-g/top-nav.tsx` | Editar — usar `<Logo />` |
| `src/components/zero-g/site-footer.tsx` | Editar — usar `<Logo />` + ajustar copy |
| `src/app/icon.svg` | **Nuevo** — favicon badge |
| `src/app/apple-icon.png` | **Nuevo** — ícono Apple |
| `src/app/opengraph-image.tsx` | **Nuevo** (opción B) — imagen social |
| `src/app/layout.tsx` | Editar — metadata "Escalade" |
| `src/components/zero-g/problem-section.tsx` | Editar — typo |
| `zero-g-section.tsx`, `verifiable-decisions-section.tsx`, `demo-flow-section.tsx` | Editar — `id`s de ancla si faltan |
| `hero-section.tsx`, `closing-section.tsx` | Editar (opcional) — CTA |

## Consideraciones técnicas

- **SVG fidelidad:** la recreación geométrica puede variar mínimamente del original;
  validar con screenshot antes de cerrar.
- **currentColor:** garantiza claro/oscuro con un solo asset; el badge usa fondo fijo de marca.
- **Sin dependencias nuevas** salvo que se elija OG generada (usa `next/og`, incluido en Next).
- **Verificación:** build/lint tras los cambios + screenshot del nav, footer y pestaña.

## Estrategia de validación

1. Revisión visual (nav en tope y con scroll, footer, claro/oscuro) contra el checklist de la constitución.
2. Confirmar favicon en pestaña y ausencia del default.
3. Click-test de las anclas del menú.
4. `eslint .` y arranque dev sin errores.
