# Escalade Landing

Production landing page for **Escalade**, an autonomous creator network for X
and YouTube powered by 0G Compute.

The page explains the product, presents public channel evidence, and links to
the public backend repository used for the Zero Cup submission.

## What Is Live

- Public YouTube channel totals and recent uploads are read server-side from
  official YouTube channel pages and RSS feeds.
- The dashboard refreshes every two minutes and never displays guessed metrics.
- English and Spanish are available from the navigation.
- The hero video and optional soundtrack are served locally from `public/`.

## 0G Backend

The public agent backend lives at:

https://github.com/Stivions/0g-creator-agent-network

This landing is published at:

https://github.com/Stivions/escalade-landing

The production site is available at:

https://escalade.dev

0G Compute is the primary inference layer in that repository. The landing does
not expose backend credentials and does not claim that local fallback proofs
were uploaded to 0G Storage.

## Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Local Development

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm run start
```

The build uses Next.js standalone output. The post-build script copies the
required static and public assets into `.next/standalone`.

Set `PORT` and `HOSTNAME` when the deployment platform requires custom values:

```bash
PORT=3000 HOSTNAME=0.0.0.0 npm run start
```

Set the final public URL before building:

```bash
NEXT_PUBLIC_SITE_URL=https://escalade.dev
```

The deployment templates in `deploy/` run the standalone server on
`127.0.0.1:3100` behind Nginx. TLS is issued and renewed by Certbot.

## Verification

```bash
npm run lint
npx tsc -p tsconfig.json --noEmit
npm run build
```

The YouTube snapshot endpoint is available at:

```text
/api/youtube-public-snapshot
```

## Submission Links

- Public landing: https://github.com/Stivions/escalade-landing
- Public backend: https://github.com/Stivions/0g-creator-agent-network
- 0G Zero Cup criteria: https://0g.ai/arena/zero-cup/submission-criteria
- X account: https://x.com/anonimo1is
- 0G Discord: https://discord.com/invite/0glabs

## Zero Cup Alignment

- **AI-native on 0G:** the backend uses 0G Compute as its primary inference
  provider. A real provider health check and inference request are available in
  the backend scripts.
- **Public source:** both the landing and backend repositories are public.
- **Working build:** the landing passes lint, TypeScript, production build, and
  standalone browser checks.
- **No false storage claim:** 0G Storage support exists in the backend, but the
  landing describes it as optional until production uploads are enabled.
- **Safe publishing:** real posting remains disabled by default.

Attach the live URL and demo video to the tournament submission.

## Safety

- Secrets and `.env` files are ignored.
- No OAuth credentials are required by this landing.
- Real publishing remains controlled by the backend and is not enabled here.
