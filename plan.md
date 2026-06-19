# Plan de mejora — Landing Escalade

> Objetivo: limpiar y endurecer el proyecto **sin cambiar el diseño ni romper nada**.
> Cada fase es independiente y reversible. Se verifica después de cada fase
> (lint + build + `node node_modules\next\dist\bin\next dev -p 3000` respondiendo 200).
>
> **Fuera de alcance (decisión del usuario):** Dark mode. No se toca el tema `.dark`
> de `globals.css` ni se añade `ThemeProvider`/toggle.

## Principios
- Cambios aditivos o de borrado de **código muerto** confirmado.
- No se modifica el diseño visible ni el contenido salvo lo indicado en Fase 4.
- Verificar tras cada fase; si algo falla, revertir solo esa fase.
- Respetar la constitución de diseño (`.kiro/steering/design-system.md`).

---

## Fase 1 — Limpieza de código muerto (riesgo bajo)

### Tareas
- [ ] 1.1 Eliminar la carpeta `src/components/cosmos/` (plantilla "Cosmos", no se
  importa en ningún archivo; la landing usa `src/components/zero-g/`).
- [ ] 1.2 Eliminar archivos temporales de la raíz: `tmp-preview.cjs`, `tmp-trace.svg`.
- [ ] 1.3 Eliminar el endpoint de ejemplo `src/app/api/route.ts` (devuelve
  "Hello, world!", sin uso).

### Verificación
- Confirmar con búsqueda global que nada importa `components/cosmos` ni `/api`.
- `eslint .` ya no reporta los 2 errores de `tmp-preview.cjs`.
- Build/dev OK y la página se ve igual.

---

## Fase 2 — Quitar base de datos y dependencias sin uso (riesgo medio)

> Hacerlo en pasos pequeños, verificando build entre cada grupo. Si algo se importa
> de forma indirecta, no se quita.

### Tareas
- [ ] 2.1 Confirmar que no hay imports de Prisma en `src/`. Si está limpio:
  - Eliminar `prisma/schema.prisma` y `db/custom.db`.
  - Quitar `prisma` y `@prisma/client` de `package.json`.
  - Quitar scripts `db:push`, `db:generate`, `db:migrate`, `db:reset`.
- [ ] 2.2 Revisar y eliminar dependencias sin uso (verificando import por import
  antes de borrar cada una): `@dnd-kit/*`, `@mdxeditor/editor`,
  `@tanstack/react-query`, `@tanstack/react-table`, `recharts`,
  `react-syntax-highlighter`, `next-auth`, `next-intl`, `zustand`,
  `react-hook-form`, `@hookform/resolvers`, `react-markdown`, `uuid`,
  `react-day-picker`, `input-otp`, `vaul`, `cmdk`, `react-resizable-panels`,
  `z-ai-web-dev-sdk`, `potrace` (devDep).
  - **Nota:** algunos componentes en `src/components/ui/` dependen de estos paquetes
    (p. ej. `chart.tsx`→recharts, `form.tsx`→react-hook-form, `command.tsx`→cmdk,
    `drawer.tsx`→vaul, `sidebar.tsx`→use-mobile). Si un componente UI no se usa en la
    landing, eliminar también ese archivo UI antes de quitar su dependencia. Si se
    usa, conservar ambos.
- [ ] 2.3 `bun install` para regenerar el lockfile.

### Verificación
- `npx tsc --noEmit` y build sin errores nuevos.
- dev responde 200 y la landing se ve idéntica.

---

## Fase 3 — Configuración más segura (riesgo bajo–medio)

### Tareas
- [ ] 3.1 En `next.config.ts` cambiar `typescript.ignoreBuildErrors` de `true` a
  `false`.
- [ ] 3.2 Ejecutar `npx tsc --noEmit` y corregir los errores de tipos que aparezcan.
- [ ] 3.3 (Opcional) Poner `reactStrictMode: true` y verificar que no rompa nada.

### Verificación
- `tsc --noEmit` en verde; build OK.

---

## Fase 4 — Navegación y contenido (riesgo bajo)

### Tareas
- [ ] 4.1 Añadir `Resultados` (y evaluar `Métricas`) a `NAV_LINKS` en
  `src/components/zero-g/top-nav.tsx` (`{ href: "#resultados", label: "Resultados" }`).
- [ ] 4.2 Verificar que cada ancla del nav apunte a una sección existente:
  `#problema, #agentes, #0g, #pruebas, #flujo, #metricas, #resultados` y que el logo
  (`#top`) tenga su ancla en el hero. Corregir cualquier desajuste.
- [ ] 4.3 Confirmar el texto junto al logo ("Creator Agent Network"): decidir si se
  mantiene como descriptor o se ajusta a la marca Escalade. (Cambio de copy solo si
  el usuario lo aprueba.)

### Verificación
- Click en cada enlace del nav navega a su sección (incluida Resultados).

---

## Fase 5 — SEO y compartir (riesgo bajo)

### Tareas
- [ ] 5.1 Añadir `metadataBase: new URL("https://DOMINIO")` en `metadata` de
  `src/app/layout.tsx` (pedir el dominio real al usuario; placeholder mientras tanto).
- [ ] 5.2 Crear `src/app/sitemap.ts` (App Router) con la URL principal.
- [ ] 5.3 Revisar `public/robots.txt` para permitir indexación y referenciar el sitemap.

### Verificación
- Build sin warnings de metadata; `/sitemap.xml` y `/robots.txt` responden.

---

## Fase 6 — Lint en verde y accesibilidad (riesgo bajo)

### Tareas
- [ ] 6.1 Resolver los `set-state-in-effect` restantes:
  `src/components/zero-g/use-in-view.ts`, `src/hooks/use-mobile.ts`,
  `src/components/ui/carousel.tsx` (si `carousel` se conserva). Ajustar los efectos
  para no llamar `setState` síncronamente (usar lectura inicial fuera del efecto o
  guardas), respetando el comportamiento actual.
- [ ] 6.2 Añadir soporte `prefers-reduced-motion`: cuando esté activo, `Reveal` y
  marquees no animan (mostrar contenido estático).
- [ ] 6.3 Verificar contraste AA de grises pequeños (13px `text-tertiary`/
  `quaternary`) sobre fondo claro; ajustar token o tamaño si no cumple.
- [ ] 6.4 Revisar en móvil que los botones prev/next del carrusel de Resultados sean
  visibles y cómodos al tacto.
- [ ] 6.5 Revisar legibilidad de la captura de Twitter (`public/results/twitter-1.jpg`);
  si tiene poco contraste, sugerir reemplazo (no se difumina ni recorta).

### Verificación
- `eslint .` con 0 errores.
- Prueba manual con `prefers-reduced-motion` activado.

---

## Orden sugerido de ejecución
1. Fase 1 (limpieza) → 2. Fase 4 (nav, win rápido) → 3. Fase 5 (SEO) →
4. Fase 3 (config) → 5. Fase 2 (deps, la más delicada) → 6. Fase 6 (lint/a11y).

## Notas de seguridad / rollback
- Git: idealmente un commit por fase para poder revertir aislado.
- No se toca el diseño visible salvo nav (Fase 4) y posibles ajustes de a11y (Fase 6).
- Dark mode queda explícitamente fuera de alcance.
