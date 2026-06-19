# Plan de implementacion - Escalade Branding

- [x] 1. Recrear el logo como SVG y crear el componente Logo
  - Decision final: se usa la imagen provista (`public/logo.jpg`) como badge, no SVG.
  - Creado `src/components/zero-g/logo.tsx` con props `variant` ("mark" | "full"), `size`, `className`, `label`.
  - La variante "full" agrega el wordmark "Escalade" en `font-display`.
  - Accesibilidad: `aria-label`/`alt` (default "Escalade").
  - _Requisitos: 1.1, 1.2, 1.3, 1.4, 2.1, 2.3, 2.4, 2.5, 2.6_

- [x] 2. Integrar el logo en la barra de navegacion
  - Sustituido el texto "0G" por el componente Logo (variante full) en `top-nav.tsx`, enlazado a `#top`.
  - _Requisitos: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 3. Integrar el logo en el pie de pagina
  - Sustituido el bloque de marca de `site-footer.tsx` por el componente Logo; copyright a "Escalade".
  - Conservado el parrafo descriptivo y las columnas de enlaces.
  - _Requisitos: 4.1, 4.2, 4.3_

- [x] 4. Reconciliar el naming a Escalade
  - Actualizado `metadata` en `layout.tsx` (title, openGraph, twitter, siteName, authors) a "Escalade".
  - Copy de cierre: "0G Creator Agent Network" como producto pasa a "Escalade".
  - Conservadas "0G Compute" y "0G Storage" como infraestructura.
  - _Requisitos: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 5. Favicon e iconos de la app
  - Generados `src/app/icon.png` (256) y `src/app/apple-icon.png` (180) desde `logo.jpg`.
  - _Requisitos: 5.1, 5.2, 5.3, 5.4_

- [x] 6. Imagen social (OpenGraph/Twitter)
  - Creado `src/app/opengraph-image.tsx` con `next/og` (logo + "Escalade" + tagline + acento lima).
  - Verificado: ruta responde 200 image/png.
  - _Requisitos: 6.1_

- [x] 7. Correcciones detectadas
  - [x] 7.1 Typo "Investinar" -> "Investigar" en `problem-section.tsx`.
    - _Requisitos: 7.1_
  - [x] 7.2 Anclas del nav verificadas (`#top`, `#problema`, `#agentes`, `#0g`, `#pruebas`, `#flujo`): todas existen, sin enlaces rotos.
    - _Requisitos: 7.2, 7.3, 7.4_

- [x] 8. CTA de conversion
  - Agregado CTA en hero ("Explorar los agentes" -> #agentes, "Ver el flujo" -> #flujo) y en cierre
    ("Explorar la red" -> #agentes, "Ver una prueba verificable" -> #pruebas), estilo editorial con foco visible.
  - _Requisitos: 8.1, 8.2, 8.3_

- [x] 9. Verificacion final
  - Home responde 200; OpenGraph responde 200 image/png; archivos modificados pasan eslint.
  - Pendientes fuera de alcance: 6 errores de lint preexistentes (no introducidos aqui) y enlaces del footer como placeholders.
  - _Requisitos no funcionales: 1, 2, 3, 4, 5_
