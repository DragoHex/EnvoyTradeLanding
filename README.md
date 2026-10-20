# EnvoyTrade Landing Page

Production landing site and legal documentation portal for **EnvoyTrade** — fast trade copier platform for Indian brokers.

Built with **Solid.js**, **TypeScript**, **Vite (MPA)**, and **Tailwind CSS**.

---

## Features & Pages

- **Home (`/`)**: Hero, Live Broker Status, Performance Stats, Features, How it Works, Transparent Pricing, FAQ, Final CTA.
- **Brokers (`/brokers/`)**: Detailed integration profiles and latency statistics for Zerodha Kite Connect, Angel One SmartAPI, FYERS, Dhan, and Upstox.
- **Documentation (`/docs/`)**: Quick-start setup guide covering broker API credentials, postback webhooks (`/broker-callback`), and static IP whitelisting.
- **Contact & Support (`/contact/`)**: Support center with WhatsApp (+91-9549156751), email (`myenvoytrade@gmail.com`), X/Twitter (`@myenvoytrade`), and inquiry submission form.
- **Legal & Regulatory Compliance**:
  - **Risk Disclosure (`/risk-disclosure/`)**: Mandatory SEBI risk disclosure regarding capital risk in Futures & Options (F&O) derivatives.
  - **Terms of Service (`/terms/`)**: Software SaaS license, limitation of liability, and account responsibilities.
  - **Privacy Policy (`/privacy/`)**: Zero-password storage, token encryption, and non-sharing guarantee.
  - **Refund Policy (`/refund/`)**: 7-day free trial terms, monthly billing cycles, and cancellation policy.

---

## Development

```bash
# Install dependencies
pnpm install

# Start local dev server
pnpm dev

# Build production static MPA (Multi-Page Application)
pnpm build

# Preview production build locally
pnpm preview
```

---

## Static Hosting on GitHub Pages

The build outputs clean directories containing `index.html` for every route in `dist/`.
Reloading any subpage directly resolves to that subpage natively without returning a 404 or redirecting back to the home page.

A preconfigured GitHub Actions workflow is provided at `.github/workflows/deploy.yml`. When pushed to GitHub, it will automatically build and publish the site to GitHub Pages.
