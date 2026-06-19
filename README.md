# 0G Creator Agent Network — Landing Page

Landing page informativa para **0G Creator Agent Network**, una red de agentes
autónomos para creación de contenido impulsada por 0G Compute y 0G Storage.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript 5**
- **Tailwind CSS 4** + shadcn/ui
- **Fuentes**: Inter (body) + Instrument Serif (display) — cargadas vía `next/font/google`

## Requisitos

- **Node.js 20+**
- **Bun** (recomendado) o npm/pnpm/yarn

Instalar Bun:
```bash
curl -fsSL https://bun.sh/install | bash
```

## Instalación

```bash
# 1. Descomprimir el proyecto
unzip 0g-creator-agent-network.zip
cd 0g-creator-agent-network

# 2. Instalar dependencias
bun install
# (o: npm install / pnpm install / yarn)

# 3. Arrancar en modo desarrollo
bun run dev
# (o: npm run dev / pnpm dev / yarn dev)
```

Abrir http://localhost:3000 en el navegador.

## Build de producción

```bash
bun run build
bun run start
```

## Estructura del proyecto

```
src/
├── app/
│   ├── globals.css        # Paleta de colores + utilidades
│   ├── layout.tsx         # Layout raíz + metadata
│   └── page.tsx           # Composición de la landing
├── components/
│   ├── ui/                # Componentes shadcn (no usados en esta landing)
│   └── zero-g/            # Componentes de la landing
│       ├── top-nav.tsx
│       ├── hero-section.tsx
│       ├── problem-section.tsx
│       ├── solution-section.tsx
│       ├── multi-agent-section.tsx
│       ├── agent-network-diagram.tsx   # SVG animado de red de nodos
│       ├── zero-g-section.tsx
│       ├── verifiable-decisions-section.tsx
│       ├── metrics-section.tsx
│       ├── demo-flow-section.tsx
│       ├── live-logs-terminal.tsx       # Terminal con logs animados
│       ├── closing-section.tsx
│       ├── site-footer.tsx
│       ├── reveal.tsx                   # Wrapper de animación scroll
│       └── use-in-view.ts               # Hook IntersectionObserver
└── lib/
    └── utils.ts
```

## Personalización

- **Colores**: edita las variables CSS en `src/app/globals.css` (bloque `:root`).
  - `--accent` (#84cc16 verde lima) es el color de acento principal
  - `--primary` (#0a0a0a) es el texto principal
  - `--paper` (#ffffff) es el fondo
- **Textos**: cada componente tiene sus strings al inicio del archivo (arrays `STEPS`, `METRICS`, `AGENTS`, etc.)
- **Logs del terminal**: edita el array `LOGS` en `live-logs-terminal.tsx`
- **JSON del ejemplo verificable**: edita el `<pre>` en `verifiable-decisions-section.tsx`

## Notas

- La landing es 100% estática en el frontend — no requiere API keys externas.
- Las fuentes se cargan automáticamente desde Google Fonts vía `next/font`.
- El `DATABASE_URL` en `.env` es solo para Prisma, pero la landing no usa la base de datos.
- `prisma/`, `db/`, `mini-services/`, `examples/` y `skills/` se incluyen por compatibilidad con el scaffold original, pero no son necesarios para la landing.
