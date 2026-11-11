# AGENTS.md

Shared rules for every AI coding agent (Codex, Claude Code, Cursor, Copilot, …) and every human on this repo.
Read this whole file before writing code. If a rule here conflicts with your defaults, **this file wins**.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 1. Product context

- **What**: DSNT MVP — a mobile banking app ("Accer") for **credit card onboarding + identity verification (eKYC)**.
- **Why it runs on the web**: the MVP is a _mobile app UI_ that runs in a browser for testing and showcasing. It is deployed on Vercel. There is no native build.
- **Design source of truth**: Figma file **Demo-DSNT**
  https://www.figma.com/design/dcN7QgL7L0HSpOuKC9UZA2/Demo-DSNT?node-id=0-1
  - Section `Flow 1` (node `6:1048`): Splash → Product selecting → "Just 3 steps" → Contact details → Bureau consent & T&C → Marketing & PIA → Step 1 completed → OTP → Verified.
  - Section `Flow 2` (node `6:1049`): Scan EID → Promo code → EID front/back camera → Selfie intro → Selfie camera → Documents verified.
  - "Finalize & Offers" (additional info, offer listing, bank request info) is **not designed yet** — do not invent it without a design.
- **Backend**: none. Everything is **mocked** (see §5). Do not add a database, auth provider or real API calls.

## 2. Tech stack (do not change without team agreement)

| Area      | Choice                                                                    |
| --------- | ------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, `src/` dir, Turbopack) — read the bundled docs ↑  |
| Language  | TypeScript, `strict: true`                                                |
| UI        | React 19, Tailwind CSS v4 (CSS-first `@theme` tokens, no tailwind.config) |
| State     | Zustand (`src/stores`) for cross-screen state; `useState` for local       |
| Icons     | `lucide-react` (unless Figma has a custom icon → export SVG)              |
| Fonts     | Sora (body/headings), Manrope (buttons) via `next/font/google`            |
| Lint/fmt  | ESLint (`eslint-config-next`) + Prettier (+ tailwind class sorting)       |
| Deploy    | Vercel — preview deploy per branch, production = `main`                   |
| Node      | >= 20.9, npm (commit `package-lock.json`; don't use yarn/pnpm/bun)        |

Adding a dependency: only if it clearly saves work, is well-maintained, and works in the browser. State why in the PR description.

## 3. Commands

```bash
npm install          # first time
npm run dev          # http://localhost:3000
npm run lint         # ESLint
npm run typecheck    # tsc (generates route types first)
npm run format       # Prettier write
npm run check        # lint + typecheck + format:check — MUST pass before every PR
npm run build        # production build — MUST pass before every PR
```

## 4. Project structure

```
src/
  app/                    # Routes only. page.tsx files stay thin: render a screen from src/features
    layout.tsx            # Fonts + <MobileShell>
    page.tsx              # Demo hub: list of all screens + status (reads src/config/screens.ts)
    globals.css           # Design tokens (@theme) — the ONLY place for colors/type scale
  components/
    layout/               # MobileShell (phone frame), StatusBar
    ui/                   # Shared primitives used by 2+ features (Button, Input, Checkbox, …)
  features/<feature>/     # Screens + feature-only components/hooks (see src/features/README.md)
  config/screens.ts       # Route ↔ Figma node registry + build status
  lib/mock/               # Mock services (OTP, products, identity) — the only "backend"
  lib/utils/              # cn() and small helpers
  stores/                 # Zustand stores (application journey state)
public/mock/              # Sample images for camera fallbacks (EID front/back, selfie)
```

Routes (keep in sync with `src/config/screens.ts`):

| Route                                               | Screen               | Feature       |
| --------------------------------------------------- | -------------------- | ------------- |
| `/`                                                 | Demo hub             | —             |
| `/splash`                                           | Loading screen       | `onboarding`  |
| `/products`                                         | Product selecting    | `onboarding`  |
| `/apply`                                            | Just 3 steps         | `application` |
| `/apply/contact`                                    | Contact details      | `application` |
| `/apply/consent`                                    | Bureau consent & T&C | `application` |
| `/apply/marketing`                                  | Marketing & PIA      | `application` |
| `/apply/step-status`                                | Step 1 completed     | `application` |
| `/verify/otp`, `/verify/otp/success`                | OTP + verified       | `otp`         |
| `/verify/id`, `/verify/id/front`, `/verify/id/back` | Scan EID             | `identity`    |
| `/verify/promo`                                     | Promo code           | `identity`    |
| `/verify/selfie`, `/verify/selfie/camera`           | Selfie               | `identity`    |
| `/verify/done`                                      | Documents verified   | `identity`    |

## 5. Mobile-on-web rules

- Design frames are **iPhone 375 × 812**. Build every screen for a 375px-wide viewport.
- `MobileShell` (in the root layout) handles the frame: full screen on phones, centered phone frame with a fake status bar on desktop. **Never** set page-level widths, never put a second frame inside a screen, never rely on `<body>` scrolling.
- Screen anatomy from Figma — reuse it:
  - Header (72px): back arrow, small caption ("Set up profile" / "Verify Identity") + title, kebab menu.
  - Progress bar (4px) at the very top of step screens.
  - Content with 24px horizontal padding (`px-screen-x`).
  - Bottom bar pinned to the bottom: 24px padding, CTA 56px tall (`<Button>`).
- Touch first: tap targets >= 44px, no hover-only interactions, use `active:` states.
- Camera screens (`/verify/id/*`, `/verify/selfie/camera`) may use `navigator.mediaDevices.getUserMedia`, but **must** work without a camera (permission denied / desktop without webcam) by using the images in `public/mock/`. Never upload or store captured images anywhere — keep them in memory only.
- Don't use browser-only APIs during render (`window`, `sessionStorage`, …); use them in effects/handlers in `"use client"` components.

## 6. Design implementation rules

1. **Look at the Figma node first.** Find the screen in `src/config/screens.ts`, open its node (Figma MCP `get_design_context` / `get_screenshot`, or the browser). Match layout, spacing, copy and states. Don't guess from memory.
2. **Tokens only.** Colors and type sizes come from `src/app/globals.css` (`bg-brand-9`, `text-gray-11`, `text-p-sm`, `text-h5`, `font-button`…). No raw hex values or arbitrary font sizes in components. Missing token → add it to `globals.css` (named after the Figma variable) in the same PR, and to `cn()`'s list if it's a `--text-*` size.
3. **Copy is exact.** Use Figma text verbatim (English). Placeholder lorem-style copy in Figma (e.g. repeated "I authorize Appro to access my credit information") is fine to keep as-is for the MVP.
4. **Components**: check `src/components/ui` before creating one. Figma component names map to code names (`Button`, `Input Field` → `InputField`, `Checkbox`, `Toggle`, `SwipeSlider`, `OTP` → `OtpInput`, `Stepper Vertical` → `StepperVertical`, `Product Card` → `ProductCard`, `Tab button` → `TabButton`, `Progress bar` → `ProgressBar`, `Header` → `ScreenHeader`).
5. Illustrations/images from Figma: export as SVG/PNG into `public/` (subfolder per feature), use `next/image`.
6. Accessibility basics: real `<button>`/`<input>`/`<label>`, `alt` text, visible focus, form errors announced in text.

## 7. Code conventions

- TypeScript strict; no `any` (use `unknown` + narrowing). Export types next to the code that owns them.
- React Server Components by default. Add `"use client"` only to components that need state, effects, or browser APIs — keep it as low in the tree as possible.
- Files: components `PascalCase.tsx`, hooks `useThing.ts`, everything else `camelCase.ts`. One exported component per file.
- Named exports (except Next.js files that require default exports: `page.tsx`, `layout.tsx`, …).
- Import with the `@/` alias, never long `../../..` paths.
- Styling: Tailwind classes + `cn()` for conditionals. No CSS modules, no inline `style` except for truly dynamic values.
- UI code gets data **only** through `@/lib/mock` (later swappable for `@/lib/api`). No `fetch` in components.
- Navigation between journey screens: `next/link` or `useRouter().push`. Guard screens that need earlier data (e.g. OTP without a phone) by redirecting back.
- Keep it simple: MVP quality, readable over clever. No premature abstractions, no unused code, no commented-out code.
- Comments explain _why_, not _what_.

## 8. Git & collaboration workflow

Matches the team process in Figma ("Working with team in Github"): build per feature → deploy each branch → merge into `main`.

- `main` = always deployable; it is the showcase build on Vercel. **Never push directly to `main`** — always a PR.
- Branch per feature/screen from the latest `main`:
  - `feature/<short-name>` (e.g. `feature/otp-verification`), `fix/<short-name>`, `chore/<short-name>`, `docs/<short-name>`.
- **One agent / one person per branch.** Before starting, check open PRs/branches so two agents don't build the same screen. Claim a screen by setting its `status: "in-progress"` in `src/config/screens.ts` in your first commit.
- Commits: [Conventional Commits](https://www.conventionalcommits.org/) — `feat(otp): add resend timer`, `fix(shell): …`, `chore: …`, `docs: …`. Small, focused commits.
- Before opening a PR: rebase on / merge latest `main`, run `npm run check` and `npm run build`.
- PR: fill in `.github/pull_request_template.md` — Figma node links, screenshot at 375px, Vercel preview link. Keep PRs to one feature.
- When a screen is complete, set its `status: "done"` in `src/config/screens.ts` in that PR.
- Shared files (`globals.css`, `components/ui/*`, `stores/*`, `config/screens.ts`, this file): change only what your feature needs, and call it out in the PR to reduce merge conflicts.
- Never commit secrets, `.env.local`, or generated folders (`.next/`, `node_modules/`).

## 9. Definition of done (per screen)

- [ ] Matches the Figma frame at 375px (layout, spacing, copy, colors, all states in Figma: empty/filled/disabled/error/loading).
- [ ] Works in the desktop phone frame **and** on a real phone browser (iOS Safari / Android Chrome) via the Vercel preview.
- [ ] Navigation to the previous/next screen works; journey state persists on refresh.
- [ ] Uses tokens + shared components; no console errors or warnings.
- [ ] `npm run check` and `npm run build` pass.
- [ ] `src/config/screens.ts` status updated.

## 10. Updating this file

This file is shared context for all agents. If you establish a new convention (new shared component, new token group, new folder), add one line here in the same PR. Keep it short and factual.
