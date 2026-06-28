# Escalade Landing

Production landing for Escalade.

Escalade turns live internet signals into channel-ready content for X and
YouTube, with public metrics, release evidence, and a bilingual interface.

## What This Site Shows

- A concise product story for creators and operators.
- Real public YouTube channel data through the public snapshot API.
- Published-output evidence through curated screenshots.
- A proof-oriented explanation of how Escalade records release context.
- English and Spanish copy.

## Local Development

```bash
npm install
npm run dev
```

## Environment

Use `.env.local` for deployment-specific URLs and API keys. Do not commit
private tokens or raw refresh tokens.

```env
NEXT_PUBLIC_SITE_URL=https://escalade.dev
ESCALADE_RUNTIME_API_URL=https://escalade.dev/api/runtime
YOUTUBE_API_KEY=
```

## Verification

```bash
npm run lint
npm run build
```
