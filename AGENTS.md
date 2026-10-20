# AGENTS.md

Guidance for AI agents working on `EnvoyTradeLanding`.

---

## 1. What This Is

Public marketing landing page, documentation portal, and legal compliance site for **EnvoyTrade** (trade copier platform on Indian broker APIs).
- **Stack**: Solid.js 1.9, TypeScript 5.7, Vite 6, Tailwind CSS 3.4.
- **Architecture**: Static Multi-Page Application (MPA). Each page has an independent HTML file and Solid.js entry point.
- **Hosting**: GitHub Pages (`gh-pages` branch) mapped to custom domain `envoytrade.in`.
- **Target Audience**: Indian retail derivative traders (F&O, Equity, Commodity) running 1-master to N-follower accounts across Zerodha, Angel One, FYERS, Dhan, Upstox, Groww, Kotak Neo.

---

## 2. Commands

Run from project root (`/Users/msp/MSP/Projects/EnvoyTradeLanding`):

```sh
# Install dependencies
pnpm install

# Local development server (port 5174, host 0.0.0.0)
pnpm dev

# Force clear cache if JSX / TypeScript compilation drifts
pnpm dev --force

# Production build (outputs to dist/)
pnpm build

# Preview production build locally on port 5174
pnpm preview

# Deploy build to gh-pages branch on GitHub
pnpm run deploy:pages
```

---

## 3. Architecture & Routing

### Multi-Page App (MPA) Entry Points
Every route has a dedicated directory with `index.html` referencing `src/entries/<page>.tsx`:
- `/` &rarr; `index.html` &rarr; `src/entries/home.tsx` &rarr; `src/pages/HomePage.tsx`
- `/brokers/` &rarr; `brokers/index.html` &rarr; `src/entries/brokers.tsx` &rarr; `src/pages/BrokersPage.tsx`
- `/docs/` &rarr; `docs/index.html` &rarr; `src/entries/docs.tsx` &rarr; `src/pages/DocsPage.tsx`
- `/setup-guide/` &rarr; `setup-guide/index.html` &rarr; `src/entries/setupGuide.tsx` &rarr; `src/pages/SetupGuidePage.tsx`
- `/contact/` &rarr; `contact/index.html` &rarr; `src/entries/contact.tsx` &rarr; `src/pages/ContactPage.tsx`
- `/terms/` &rarr; `terms/index.html` &rarr; `src/entries/terms.tsx` &rarr; `src/pages/TermsPage.tsx`
- `/privacy/` &rarr; `privacy/index.html` &rarr; `src/entries/privacy.tsx` &rarr; `src/pages/PrivacyPage.tsx`
- `/risk-disclosure/` &rarr; `risk-disclosure/index.html` &rarr; `src/entries/risk.tsx` &rarr; `src/pages/RiskDisclosurePage.tsx`
- `/refund/` &rarr; `refund/index.html` &rarr; `src/entries/refund.tsx` &rarr; `src/pages/RefundPage.tsx`

`vite.config.ts` explicitly bundles every entry point via `rollupOptions.input`. When adding a new page:
1. Create directory `<page>/index.html` following the pattern in existing subpages.
2. Create entry point in `src/entries/<page>.tsx`.
3. Create page component in `src/pages/<Page>Page.tsx`.
4. Register path in `vite.config.ts` under `rollupOptions.input` and `pages` array in `mpa-routing-dev` plugin.

### URL & Link Resolution
- Always resolve internal paths using `getRelativePath(target, isSubpage)` from [`src/config/site.ts`](src/config/site.ts). This ensures URLs resolve properly whether hosted at domain root (`envoytrade.in`), subpaths on GitHub Pages (`<user>.github.io/<repo>/`), or Vite dev server.
- External links ("Sign In", WhatsApp, social links) MUST include `target="_blank" rel="noopener noreferrer"`.
- Production app URL is `https://mime.envoytrade.in` (login at `https://mime.envoytrade.in/login`).

---

## 4. Theme & Design System

### Dark / Light Mode
- Managed via signal in [`src/context/theme.ts`](src/context/theme.ts).
- Sets `data-theme="light"` or `data-theme="dark"` attribute on `<html>` (`document.documentElement`).
- Persists user selection in `localStorage` with fallback to system `prefers-color-scheme`.
- CSS custom variables defined in [`src/styles/main.css`](src/styles/main.css):
  - Dark: `--color-bg-rgb: 15 17 23`, `--color-surface-rgb: 26 28 36`, `--color-border-rgb: 42 44 52`, `--color-logo-secondary: #ffffff`
  - Light: `--color-bg-rgb: 255 255 255`, `--color-surface-rgb: 245 245 247`, `--color-border-rgb: 226 228 234`, `--color-logo-secondary: #000000`

### Brand Logo & Favicon
- Logo component: [`src/components/EnvoyLogo.tsx`](src/components/EnvoyLogo.tsx).
  - Upper master trajectory: `accentColor` (defaults to brand accent).
  - Lower follower trajectory: `var(--color-logo-secondary)` &rarr; **white in dark mode, black in light mode**.
- Favicons: [`favicon.svg`](favicon.svg) and [`public/favicon.svg`](public/favicon.svg) have embedded `@media (prefers-color-scheme: dark)` styling matching the logo colors.

---

## 5. Deployment & GitHub Pages Gotchas

- **Custom Domain (`CNAME`)**: [`public/CNAME`](public/CNAME) contains `envoytrade.in`. Vite copies files from `public/` into `dist/` on build. Never remove `public/CNAME` or GitHub Pages will reset custom domain routing.
- **Jekyll Bypassing**: [`public/.nojekyll`](public/.nojekyll) is required so GitHub Pages does not ignore underscore-prefixed assets.
- **Deploy Script**: `pnpm run deploy:pages` runs `pnpm build`, initializes a temporary git repository in `dist/`, checks out `gh-pages`, commits, and force-pushes to `git@github.com:DragoHex/EnvoyTradeLanding.git gh-pages`.
- **Git Branches**:
  - `main`: Canonical source branch for live deployments.
  - `gh-pages`: Built static artifact branch consumed by GitHub Pages.
  - `violet`: Experimental violet theme branch.
