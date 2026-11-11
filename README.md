# DSNT Demo — Accer

MVP mobile app for **credit card onboarding & identity verification**, built as a mobile-first web app
so the team can test and showcase it in any browser.

- **Design**: [Figma — Demo-DSNT](https://www.figma.com/design/dcN7QgL7L0HSpOuKC9UZA2/Demo-DSNT?node-id=0-1)
- **Stack**: Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Zustand
- **Backend**: none — all data is mocked in `src/lib/mock`
- **Rules for humans & AI agents**: [AGENTS.md](AGENTS.md) ← read this first

## Getting started

Requires Node.js >= 20.9.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

- On desktop the app renders inside a 375 × 812 phone frame.
- On a phone (or DevTools device mode < 640px) it renders full screen.
- The home page (`/`) is the demo hub: every Figma screen with its build status.

## Demo data

| What        | Value                                                |
| ----------- | ---------------------------------------------------- |
| OTP code    | `123456`                                             |
| Promo code  | `DSNT2026`                                           |
| Camera      | Uses your webcam if allowed, otherwise sample images |
| Reset state | Close the tab (state lives in `sessionStorage`)      |

## Scripts

| Script           | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Dev server                               |
| `npm run build`  | Production build                         |
| `npm run check`  | Lint + typecheck + format check (pre-PR) |
| `npm run format` | Format all files with Prettier           |

## Workflow

1. Pick a screen in `src/config/screens.ts` that is `todo` and not taken by an open PR.
2. `git checkout -b feature/<screen-name>` from the latest `main`.
3. Build it to match Figma, run `npm run check && npm run build`.
4. Push and open a PR → Vercel posts a preview URL → review on a real phone.
5. Merge into `main` → production showcase updates automatically.

Details in [AGENTS.md §8](AGENTS.md#8-git--collaboration-workflow).

## Deploy (Vercel)

One-time setup by a repo admin: on [vercel.com/new](https://vercel.com/new) import `ndt1455/DSNT-Demo`
(framework preset: Next.js, no env vars needed). After that every branch gets a preview URL and `main`
deploys to production.
