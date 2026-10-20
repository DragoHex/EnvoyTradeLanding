# Custom Domain Setup Guide: GitHub Pages & Cloudflare

This guide documents the step-by-step configuration required to map a custom apex domain (`envoytrade.in` and `www.envoytrade.in`) to a GitHub Pages repository site, ensuring secure HTTPS, zero redirect loops, and complete support for all page routes/subpaths.

---

## Architecture & Common Failure Modes

When connecting Cloudflare DNS to GitHub Pages, setups typically fail due to four specific configuration mismatches:

1. **Cloudflare Proxy Enabled During Verification (Orange Cloud)**  
   If Cloudflare's proxy is turned on initially, GitHub's automated verification bot and Let's Encrypt certificate challenge see Cloudflare's edge IP addresses instead of GitHub's servers, causing domain verification or certificate issuance to fail.

2. **Cloudflare "Flexible" SSL Mode (Redirect Loop)**  
   GitHub Pages automatically enforces HTTPS. If Cloudflare's SSL mode is left on "Flexible", Cloudflare communicates with GitHub over unencrypted HTTP (port 80). GitHub immediately issues an HTTP 301 redirect to HTTPS. Cloudflare passes this redirect to the browser, resulting in an infinite loop (`ERR_TOO_MANY_REDIRECTS`).

3. **Build Pipeline Overwriting the `CNAME` File**  
   Configuring a custom domain in GitHub Pages adds a `CNAME` file to the publishing branch. If your frontend build tool (Vite, Webpack, etc.) generates fresh output without copying `CNAME` from your `public/` folder, every deployment will wipe the `CNAME` file, silently resetting the domain.

4. **Single-Page Application (SPA) / Multi-Page Routing on Subpaths**  
   GitHub Pages serves static files directly from disk. Navigating or refreshing on a path without an explicit physical `index.html` file (e.g. `/docs`, `/pricing`) returns a GitHub 404 error unless properly handled by static routing files or edge rewrite rules.

---

## Step 1: Configure Cloudflare DNS

In your Cloudflare dashboard for `envoytrade.in`, navigate to **DNS** &rarr; **Records**.

### 1. Apex Domain Records (`envoytrade.in` / `@`)
Add four `A` records pointing to GitHub Pages' global Anycast IP addresses:

| Type | Name | IPv4 Target | Proxy Status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `185.199.108.153` | **DNS Only (Grey Cloud)** | Auto |
| **A** | `@` | `185.199.109.153` | **DNS Only (Grey Cloud)** | Auto |
| **A** | `@` | `185.199.110.153` | **DNS Only (Grey Cloud)** | Auto |
| **A** | `@` | `185.199.111.153` | **DNS Only (Grey Cloud)** | Auto |

*(Optional)* You may also add the corresponding IPv6 `AAAA` records:
* `2606:50c0:8000::153`
* `2606:50c0:8001::153`
* `2606:50c0:8002::153`
* `2606:50c0:8003::153`

### 2. Subdomain Record (`www.envoytrade.in`)
Add a `CNAME` record to route `www` traffic to your GitHub Pages user/organization domain:

| Type | Name | Target | Proxy Status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `<github-user-or-org>.github.io` | **DNS Only (Grey Cloud)** | Auto |

> [!IMPORTANT]
> Keep the proxy toggle set to **DNS Only (Grey Cloud)** until GitHub completes domain verification and issues the TLS certificate.

---

## Step 2: Configure Cloudflare SSL/TLS Mode

In Cloudflare, navigate to **SSL/TLS** &rarr; **Overview**:

* Set encryption mode to **Full** or **Full (Strict)**.
* **Do NOT use Flexible**: "Flexible" triggers the `ERR_TOO_MANY_REDIRECTS` loop.

---

## Step 3: Configure GitHub Pages & Persist `CNAME`

1. Open the repository on GitHub and navigate to **Settings** &rarr; **Pages**.
2. Under **Custom domain**, enter:
   ```text
   envoytrade.in
   ```
3. Click **Save**. GitHub will check DNS records against the apex IPs configured in Step 1.
4. Once verified, check **Enforce HTTPS** (if initially unavailable, wait a few minutes for TLS certificate generation to complete).
5. **Persist the CNAME file in source control**:
   Create a file at `public/CNAME` containing:
   ```text
   envoytrade.in
   ```
   This ensures that every build process automatically bundles `CNAME` into the deployment output directory (`dist/`).

---

## Step 4: Subpath & Direct Route Support

Because this site contains multiple paths and static routes, ensure routing behaves correctly on page reload and direct visits.

### Vite / Bundler Configuration
In `vite.config.ts`, verify the `base` property is set to root or relative:
```ts
export default defineConfig({
  base: './', // or '/'
  // ...
})
```
Avoid hardcoding repo subpaths (e.g. `/EnvoyTradeLanding/`) in the `base` path or router `basename` when operating under a custom domain.

### Routing / Fallback Options

#### Option A: Multi-Page App (MPA) Static Outputs (Current Setup)
Ensure all pages are defined in `vite.config.ts` under `build.rollupOptions.input` so that physical `index.html` files exist for each route (e.g., `dist/docs/index.html`, `dist/brokers/index.html`).

#### Option B: Cloudflare URL Rewrite Rule (For SPAs / Client-Side Routers)
If Cloudflare Proxy is enabled (Orange Cloud):
1. Navigate to Cloudflare &rarr; **Rules** &rarr; **Transform Rules** &rarr; **URL Rewrite Rules**.
2. Click **Create Rule**:
   * **Rule name**: `SPA / Route Fallback`
   * **Expression**:
     ```text
     (not http.request.uri.path contains ".") and (http.request.uri.path ne "/")
     ```
   * **Rewrite to**: Static &rarr; `/index.html`
3. Click **Deploy**.

---

## Verification

Run the following checks from your terminal to verify configuration:

```sh
# 1. Verify DNS resolution
dig envoytrade.in A +short
# Expected output: 185.199.108.153, 185.199.109.153, etc.

# 2. Verify HTTPS response and HTTP-to-HTTPS redirect
curl -I http://envoytrade.in
# Expected: 301 Moved Permanently to https://envoytrade.in/

curl -I https://envoytrade.in
# Expected: HTTP/2 200 (or HTTP/1.1 200)
```
