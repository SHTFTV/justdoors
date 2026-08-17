# Just Doors (justdoors.co)

Residential, multi-family, and commercial door systems, fire-rated assemblies, architectural
hardware, and door-schedule takeoffs for the Lower Mainland of British Columbia. A division of
[Builderhaus](https://buildershaus.com).

Vite + React 19 single-page app with a small Express API (door-spec assistant, hardware
compatibility engine, quote/schedule intake).

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev      # http://localhost:3000
```

Optionally set `GEMINI_API_KEY` (see `.env.example`) to enable the AI door assistant. Without it,
the assistant returns a built-in advisory fallback and everything else works normally.

## Build

```bash
npm run build    # vite build -> dist/  (+ bundles the standalone Express server)
npm start        # serve the production build locally
```

## Deploy (Vercel)

This repo is configured for Vercel:

- `vite build` produces the static site in `dist/`.
- `api/index.ts` runs the API as a serverless function; `vercel.json` rewrites `/api/*` to it.

Import the repo in the Vercel dashboard (auto-detects Vite), or run `vercel` from the CLI. Add
`GEMINI_API_KEY` under Project -> Settings -> Environment Variables to enable the AI assistant.

## API routes

- `GET  /api/health`
- `POST /api/door-assistant`
- `POST /api/validate-hardware-compatibility`
- `POST /api/batch-validate-schedule`
- `POST /api/submit-quote`

---

Part of the Builderhaus trade network: buildershaus.com - steelstud.ca - framers.io - steelstudcontractors.com
