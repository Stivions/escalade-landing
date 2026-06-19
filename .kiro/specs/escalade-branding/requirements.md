# Requisitos — Escalade Branding

## Introducción

Esta feature introduce la identidad de marca **Escalade** en la landing existente:
un sistema de logo (el mark geométrico provisto), su aplicación en navegación, pie
de página, favicon e imagen social, y la reconciliación del naming actual
("0G Creator Agent Network") hacia **Escalade**, manteniendo "0G Compute" y
"0G Storage" como referencias de infraestructura.

Todo el trabajo se ejecuta **respetando la Constitución de diseño**
(`.kiro/steering/design-system.md`): estilo editorial, paleta papel/tinta + acento
lima, Instrument Serif + Inter, bordes finos, animaciones de solo `transform/opacity`.
No se rediseña la landing; se añade identidad de forma coherente.

Además se incluyen dos correcciones detectadas durante la revisión (typo y anclas
del menú) y una mejora opcional de conversión (CTA).

### Decisiones de alcance (confirmadas)
- Nombre del producto: **Escalade**.
- Logo: la **imagen provista** por el usuario (`public/logo.jpg`, mark blanco sobre fondo oscuro), usada como **badge** (no se recrea como SVG).
- CTA (Requisito 8): **fuera de este ciclo** por ahora (se revisita antes de la tarea 8).
- Skills de diseño activas como guardarraíles: design-taste-frontend, interface-design, frontend-design.

---

## Requisitos

### Requisito 1 — Asset del logo y su presentación como badge

**Historia de usuario:** Como equipo de Escalade, quiero usar la imagen de marca provista
presentada de forma consistente, para que el logo se vea nítido y coherente en cualquier contexto.

#### Criterios de aceptación
1. EL sistema DEBERÁ usar la imagen provista en `public/logo.jpg` (564x564, mark blanco sobre fondo oscuro) como fuente del logo.
2. EL logo DEBERÁ presentarse como un **badge** cuadrado con esquinas redondeadas, conservando su relación de aspecto 1:1 sin distorsión.
3. EL badge DEBERÁ verse correctamente tanto sobre superficies claras como oscuras (el fondo oscuro es parte del logo).
4. EL sistema DEBERÁ servir el logo optimizado (vía `next/image`) con tamaño configurable.
5. NO se recrea el mark como SVG vectorial; queda registrado que esta decisión sacrifica el recoloreo por token a cambio de fidelidad exacta al original.
6. SI más adelante se requiere recoloreo claro/oscuro o escalado vectorial ENTONCES DEBERÁ trazarse el logo a SVG en una iteración futura.

### Requisito 2 — Componente Logo reutilizable

**Historia de usuario:** Como desarrollador, quiero un único componente `<Logo />`,
para colocar la marca de forma consistente sin duplicar SVG.

#### Criterios de aceptación
1. EL sistema DEBERÁ exponer un componente `<Logo />` reutilizable.
2. EL componente DEBERÁ aceptar una prop para elegir variante/color (p. ej. `tone="ink" | "inverted"`) o derivar el color por `currentColor`.
3. EL componente DEBERÁ aceptar tamaño configurable sin distorsión (relación de aspecto fija).
4. EL componente DEBERÁ poder renderizar solo el mark, o mark + wordmark "Escalade".
5. CUANDO se renderice ENTONCES DEBERÁ incluir alternativa accesible (`aria-label`/`title` "Escalade").
6. EL wordmark DEBERÁ usar `font-display` (Instrument Serif), coherente con la constitución.

### Requisito 3 — Logo en la barra de navegación

**Historia de usuario:** Como visitante, quiero ver el logo de Escalade en el nav,
para identificar la marca de inmediato.

#### Criterios de aceptación
1. EL `TopNav` DEBERÁ mostrar `<Logo />` (mark + wordmark "Escalade") en lugar del texto "0G" actual.
2. CUANDO la página esté en el tope (sin scroll) ENTONCES el logo DEBERÁ verse correctamente sobre fondo transparente/papel.
3. CUANDO se haga scroll ENTONCES el logo DEBERÁ mantener legibilidad sobre el fondo `bg-paper/80 backdrop-blur`.
4. EL logo DEBERÁ enlazar a `#top`.
5. EN móvil EL logo DEBERÁ mantener tamaño y legibilidad adecuados.

### Requisito 4 — Logo en el pie de página

**Historia de usuario:** Como visitante, quiero ver la marca en el footer,
para reforzar identidad al final del recorrido.

#### Criterios de aceptación
1. EL `SiteFooter` DEBERÁ mostrar `<Logo />` en lugar del bloque de texto "0G" actual.
2. EL tratamiento DEBERÁ ser coherente con el del nav (misma marca, distinto tamaño si aplica).
3. EL texto descriptivo y los enlaces existentes del footer DEBERÁN conservarse.

### Requisito 5 — Favicon e íconos de la app

**Historia de usuario:** Como visitante, quiero ver el logo en la pestaña del navegador,
para reconocer Escalade entre mis pestañas.

#### Criterios de aceptación
1. EL sistema DEBERÁ definir un ícono de app que Next.js App Router detecte (p. ej. `src/app/icon.svg`).
2. EL ícono DEBERÁ usar la versión **badge** (mark claro sobre fondo oscuro) para verse bien en pestañas claras y oscuras.
3. EL sistema DEBERÁ proveer `apple-icon` para dispositivos Apple.
4. CUANDO se cargue la página ENTONCES el favicon por defecto de Next NO DEBERÁ aparecer (queda reemplazado).

### Requisito 6 — Reconciliación de naming a "Escalade"

**Historia de usuario:** Como equipo, quiero que el producto se llame Escalade en todo
el sitio, manteniendo 0G como infraestructura, para que la marca sea coherente.

#### Criterios de aceptación
1. EL `metadata` de `layout.tsx` (title, openGraph, twitter, siteName, authors) DEBERÁ reflejar "Escalade".
2. EL nav y el footer DEBERÁN mostrar "Escalade" como wordmark.
3. LAS referencias a "0G Compute" y "0G Storage" DEBERÁN conservarse como tecnología/infraestructura.
4. EL sistema NO DEBERÁ romper el copy que describe la red de agentes; se ajusta el nombre del producto, no la narrativa.
5. CUANDO exista ambigüedad "0G" vs "Escalade" en copy ENTONCES DEBERÁ resolverse a favor de Escalade como producto y 0G como infra.

### Requisito 7 — Correcciones detectadas

**Historia de usuario:** Como equipo, quiero corregir errores visibles y enlaces rotos,
para que la landing se sienta pulida.

#### Criterios de aceptación
1. EL typo "Investinar nuevas tecnologías" en `problem-section.tsx` DEBERÁ corregirse a "Investigar nuevas tecnologías".
2. LOS enlaces del menú (`#problema`, `#agentes`, `#0g`, `#pruebas`, `#flujo`) DEBERÁN apuntar a secciones con `id` existente.
3. CUANDO un ancla del menú no tenga sección correspondiente ENTONCES DEBERÁ añadirse el `id` faltante a la sección correcta o corregirse el enlace.
4. CUANDO se haga clic en un enlace del menú ENTONCES la página DEBERÁ hacer scroll a la sección correspondiente.

### Requisito 8 — CTA de conversión (opcional / stretch)

**Historia de usuario:** Como visitante interesado, quiero una acción clara,
para poder dar el siguiente paso.

#### Criterios de aceptación
1. SI se aprueba este requisito ENTONCES el hero y/o la sección de cierre DEBERÁN incluir un CTA (p. ej. "Ver demo", "Explorar", enlace a GitHub/docs).
2. EL CTA DEBERÁ respetar el estilo editorial (sin glows, acento lima con intención, estados hover/active/focus).
3. EL CTA DEBERÁ ser accesible (foco visible, área táctil adecuada, contraste AA).

---

## Requisitos no funcionales

1. **Respeto al diseño:** todo cambio cumple `.kiro/steering/design-system.md`. Ante conflicto con una skill, gana la constitución.
2. **Performance:** animaciones solo en `transform`/`opacity`; sin dependencias nuevas salvo justificación (verificar `package.json`).
3. **Accesibilidad:** contraste AA, foco visible, `aria` en controles, sin emojis.
4. **Compatibilidad:** funciona en modo claro y oscuro (tokens invertidos).
5. **Sin regresiones:** el resto de la landing y su ritmo visual se mantienen intactos.
