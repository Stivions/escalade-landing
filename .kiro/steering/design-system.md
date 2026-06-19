# Constitución de diseño — Escalade

> Fuente de verdad del diseño. Toda pieza nueva (componentes, secciones, assets)
> DEBE respetar estas reglas. Las skills de diseño se usan como ejecutoras DENTRO
> de estos rieles, nunca para rediseñar el sistema. Si una skill sugiere algo que
> contradice este documento, **gana este documento**.

## 0. Marca

- **Nombre del producto:** Escalade.
- **0G no es la marca:** "0G Compute" y "0G Storage" son la infraestructura/tecnología
  sobre la que corre Escalade. Se mencionan como referencias técnicas, no como nombre del producto.
- **Wordmark:** `Escalade` en `font-display` (Instrument Serif), acompañado del mark geométrico.
- **Tono de voz:** español, directo, sobrio, editorial. Sin hype ni clichés de IA
  ("Eleva", "Seamless", "Next-Gen", "Unleash"). Verbos concretos.

## 1. Color (tokens reales — NO inventar hex sueltos)

Todo color sale de las variables CSS en `src/app/globals.css`. Nunca hardcodear hex
fuera de ahí salvo para assets puntuales documentados.

Modo claro (`:root`):
- `--paper #ffffff` — fondo base
- `--primary #0a0a0a` — tinta principal (texto/titulares)
- `--secondary #404040` — texto de apoyo
- `--tertiary #737373` — metadatos / labels
- `--quaternary #a3a3a3` — texto desactivado / numeración tenue
- `--border-primary #e5e5e5` — bordes finos
- `--inverted #ffffff` — texto sobre fondos oscuros
- `--accent #84cc16` — **único** acento (verde lima); `--accent-dim` para fondos suaves

Modo oscuro (`.dark`): mismos roles, valores invertidos (`--paper #0a0a0a`,
`--primary #fafafa`, `--elevation #171717`, `--border-primary #262626`, acento igual).

Reglas:
- **Un solo color de acento.** El lima se reserva para señal (estado vivo, viñetas
  clave, foco de marca). No decorar con él.
- **Nada de morados/azules "AI", glows de neón, ni gradientes de relleno en texto.**
- Secciones oscuras usan `bg-primary` + `text-inverted` y derivados `text-inverted/80`, `/50`, `/15`.

## 2. Tipografía

- **Display:** `font-display` = Instrument Serif (`--font-instrument-serif`). Para
  titulares grandes (hero hasta ~120px). La serif editorial ES intencional aquí.
- **Texto:** `font-sans` = Inter (`--font-inter`). Cuerpo, navegación, UI.
- **Mono:** `font-mono` para `codeName` de agentes y datos técnicos.

Override explícito de skills: las skills desaconsejan Inter y la serif. **Aquí se
mantienen ambas** porque el diseño es editorial y ya es la identidad establecida.
Esta decisión es deliberada, no un default.

Escala/uso:
- Titulares de sección: `font-display` con `tracking-tight` y `leading` apretado
  (`leading-[1.02]`–`[1.05]`).
- Cuerpo: `text-secondary`, `leading-relaxed`, ancho de lectura contenido (`max-w-2xl`/`max-w-xl`).
- Labels/eyebrows: `text-[13px] uppercase tracking-[0.18em] text-tertiary`.

## 3. Layout y espaciado

- Contenedores centrados con `mx-auto` y anchos `max-w-[1100px]`/`[1200px]`.
- Padding de sección: `px-6 lg:px-10`, `py-24 lg:py-32` (más en secciones clave).
- Secciones separadas por `border-t border-border-primary`.
- **Grid sobre flex-math:** usar `grid grid-cols-… gap-…`, no `w-[calc(...)]`.
- Layouts asimétricos permitidos (`lg:grid-cols-[1.3fr_1fr]`) pero **colapsan a una
  sola columna en móvil** (`< md`).
- Radios: tarjetas `rounded-2xl`; controles shadcn según `--radius: 0.625rem`.

## 4. Profundidad y materialidad

- Estrategia única: **bordes finos + cambios de superficie**, no sombras dramáticas.
- Tarjetas: `border border-border-primary bg-paper`, hover `hover:border-primary`.
- La tarjeta destacada (p. ej. Orquestador) invierte a `bg-primary text-inverted`.
- No usar sombras de neón ni `box-shadow` genéricos.

## 5. Movimiento

- Patrón base: componente `Reveal` (entrada por viewport con
  `cubic-bezier(0.16,1,0.3,1)`, `translateY(16px)` → `0`, delays escalonados).
- Detalles vivos sutiles: punto `animate-ping` (estado activo), grid con fade radial,
  `animate-marquee-left`, `animate-bounce` del scroll cue.
- **Performance (regla dura):** animar **solo** `transform` y `opacity`. Nunca
  `top/left/width/height`. `useEffect` con animación → siempre cleanup.
- Easing de deceleración; nada de bounce exagerado en UI seria.

## 6. Accesibilidad

- Respetar jerarquía de texto de 4 niveles; no abusar de `tertiary/quaternary` en
  textos largos.
- Apuntar a contraste **AA**. Revisar grises pequeños (13px) sobre papel.
- Estados de foco visibles (`--ring`). Targets táctiles cómodos.
- `aria-label`/`aria-expanded` en controles (ya presente en el nav móvil).
- Validación WCAG completa requiere pruebas manuales con tecnología asistiva.

## 7. Iconografía e imágenes

- Iconos: SVG inline con `stroke="currentColor"`, `strokeWidth` consistente
  (`1.5`/`1.75`), o `lucide` (icon library configurada en `components.json`).
- **Prohibido usar emojis** en código, copy o alt text.
- Imágenes con fades sutiles hacia el fondo (claro/oscuro según contexto).

## 8. Stack y convenciones

- Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4 (config en CSS, sin
  `tailwind.config`). **No** usar el plugin `tailwindcss` en postcss (usar `@tailwindcss/postcss`).
- shadcn/ui estilo "new-york", `cssVariables: true`, aliases `@/components`, `@/lib`, etc.
- Verificar `package.json` antes de importar cualquier dependencia nueva.
- Componentes interactivos: `"use client"` arriba; mantener Server Components estáticos.
- Hero/secciones full-height: usar `min-h-screen` ya existente; preferir `min-h-[100dvh]`
  para nuevas secciones full-height (evita salto en móvil).

## 9. Checklist antes de entregar UI

- [ ] ¿Usa tokens (`paper/primary/secondary/.../accent`), sin hex sueltos?
- [ ] ¿Respeta tipografía (display serif para titulares, Inter para cuerpo)?
- [ ] ¿Un solo acento lima, sin glows ni morados AI?
- [ ] ¿Bordes finos como estrategia de profundidad (no sombras dramáticas)?
- [ ] ¿Anima solo transform/opacity y limpia efectos?
- [ ] ¿Colapsa a una columna en móvil?
- [ ] ¿Contraste AA y estados de foco?
- [ ] ¿Sin emojis; iconos coherentes?
- [ ] ¿Coherente con el resto de la landing (ritmo claro/oscuro, espaciados)?
