# Requisitos — Sección de Resultados (Escalade)

## Introducción

Agregar una nueva sección **"Resultados"** a la landing de Escalade que muestre
evidencia real del rendimiento de las cuentas operadas por los agentes: capturas
de estadísticas de Twitter/X y de YouTube. La sección es **aditiva** (no modifica
ni rompe ninguna sección existente) y respeta la constitución de diseño
(`.kiro/steering/design-system.md`) y el ritmo claro/oscuro de la página.

Las imágenes ya están colocadas por el usuario en `public/results/`:
- `twitter-1.jpg` (792×817, estadísticas de Twitter/X, fondo claro)
- `youtube-1.jpg` … `youtube-4.jpg` (~960×495, analíticas de YouTube Studio, fondo oscuro)

Decisión del usuario: el PDF de YouTube queda **fuera de alcance** (no se extraen
números ni se enlaza). Las imágenes se muestran **tal cual**, sin difuminar.

## Requisitos

### Requisito 1 — Sección "Resultados" aditiva
**Historia:** Como visitante, quiero ver resultados reales, para confiar en que el
sistema produce contenido publicado y con tracción.

#### Criterios de aceptación
1. CUANDO se renderiza la página ENTONCES existe una sección con `id="resultados"`.
2. La sección DEBE agregarse con un componente nuevo (`ResultsSection`) y **una sola
   línea** en `src/app/page.tsx`, sin modificar otras secciones.
3. La sección DEBE ubicarse después de la sección de Flujo/Demo y antes del Cierre.
4. El encabezado DEBE seguir la jerarquía editorial: eyebrow (uppercase tracking),
   titular en `font-display` y un párrafo de apoyo en `text-secondary`.
5. La palabra "Escalade" NO aparece en el titular (solo en marca/nav/footer).

### Requisito 2 — Carrusel deslizable/arrastrable
**Historia:** Como visitante, quiero deslizar entre las capturas, para revisarlas a mi ritmo.

#### Criterios de aceptación
1. El carrusel DEBE usar `embla-carousel-react` (ya instalado), con arrastre por
   mouse y touch.
2. CUANDO el usuario arrastra o desliza ENTONCES las capturas avanzan suavemente.
3. DEBE haber controles accesibles (botones anterior/siguiente con `aria-label`) y/o
   indicadores de posición.
4. El carrusel DEBE mostrar las imágenes **tal cual** (sin recorte que oculte datos,
   sin difuminar). Se permite encuadre con `object-contain` sobre una superficie.
5. Las imágenes DEBEN cargarse con `next/image` para optimización.

### Requisito 3 — Coherencia visual y responsive
**Historia:** Como dueño del diseño, quiero que la sección se vea parte del sistema.

#### Criterios de aceptación
1. Solo tokens de color (`paper/primary/secondary/tertiary/quaternary/accent`), sin
   hex sueltos; un único acento lima, sin glows ni morados "AI".
2. Profundidad mediante bordes finos (`border-border-primary`, `rounded-2xl`), no
   sombras dramáticas (se permite el "window chrome" reutilizado del sitio).
3. La entrada DEBE usar el componente `Reveal` (anima solo `opacity`/`transform`).
4. En móvil (`< md`) la sección DEBE colapsar a una sola columna y el carrusel seguir
   siendo deslizable.
5. La sección DEBE respetar el ritmo claro/oscuro existente eligiendo fondo claro
   (`bg-paper`) u oscuro (`bg-primary text-inverted`) según la sección vecina.

### Requisito 4 — Accesibilidad y rendimiento
1. Cada imagen DEBE tener `alt` descriptivo (sin emojis).
2. Los controles DEBEN tener estados de foco visibles y targets táctiles cómodos.
3. Animaciones limitadas a `transform`/`opacity`; los `useEffect` con efectos deben
   limpiar (cleanup) según la constitución.

## Fuera de alcance
- Extraer métricas del PDF o enlazarlo.
- Difuminar o censurar datos en las capturas.
- Modificar secciones existentes más allá de la línea de inserción en `page.tsx`.
