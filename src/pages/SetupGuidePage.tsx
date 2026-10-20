import { SITE_CONFIG } from '../config/site'
import { WhatsAppIcon } from '../components/WhatsAppIcon'

export function SetupGuidePage() {
  const steps = [
    {
      step: '01',
      title: 'Create Developer App in Broker Console',
      badge: 'Prerequisite',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Each trading account (master trader and child follower) connects through its own dedicated broker application credentials.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 text-xs">
            <div class="p-4 rounded-xl bg-brand-dark border border-brand-border">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-white text-sm">Zerodha Kite Connect</span>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/25">Live</span>
              </div>
              <p class="mb-2">
                Log in to <a href="https://developers.kite.trade" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">developers.kite.trade</a> and click <strong>Create New App</strong>.
              </p>
              <ul class="list-disc list-inside space-y-1 text-brand-light">
                <li>App Name: <code class="text-brand-accent">EnvoyTrade Copier</code></li>
                <li>Redirect URL: <code class="text-brand-light">https://mime.envoytrade.in/login/callback</code></li>
                <li>Save your <code class="text-brand-accent">api_key</code> and <code class="text-brand-accent">api_secret</code></li>
              </ul>
            </div>
            <div class="p-4 rounded-xl bg-brand-dark border border-brand-border">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-white text-sm">Other Brokers (Angel One, FYERS, Dhan)</span>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/25">Ready</span>
              </div>
              <p class="mb-2">
                Create an API application in your respective broker portal (SmartAPI, FYERS Dashboard, or DhanHQ Developer).
              </p>
              <ul class="list-disc list-inside space-y-1 text-brand-light">
                <li>Save App ID, API Key, and Secret</li>
                <li>Set Webhook URL to EnvoyTrade ingest</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '02',
      title: 'Configure Real-Time Postback Webhook',
      badge: 'Critical for <100ms Latency',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Postbacks notify EnvoyTrade the exact millisecond a master trade fills. This triggers the zero-latency fan-out engine without waiting for polling loops.
          </p>
          <div class="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-2">
            <span class="text-xs text-brand-muted block font-mono">
              # Paste this into your Kite Developer App Postback URL field:
            </span>
            <div class="flex items-center justify-between bg-brand-surface p-3 rounded-lg border border-brand-border font-mono text-xs sm:text-sm text-brand-accent overflow-x-auto">
              <span>https://api.envoytrade.in/broker-callback</span>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText('https://api.envoytrade.in/broker-callback')}
                class="ml-3 text-xs text-brand-muted hover:text-white bg-brand-dark px-2.5 py-1 rounded border border-brand-border transition"
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
          </div>
          <p class="text-xs text-brand-muted">
            <strong class="text-white">Security Guarantee:</strong> EnvoyTrade verifies every postback using HMAC SHA-256 against the account’s own API secret. Fake or unauthorized webhooks are rejected immediately.
          </p>
        </div>
      ),
    },
    {
      step: '03',
      title: 'Whitelist Dedicated Static Egress IP',
      badge: 'Broker Compliance',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Broker security firewalls block API calls originating from dynamic cloud IP ranges. EnvoyTrade provisions a <strong>dedicated static proxy IP</strong> for each follower account.
          </p>
          <div class="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-2 text-xs">
            <ol class="list-decimal list-inside space-y-1.5 text-brand-light">
              <li>Open your <strong>EnvoyTrade Dashboard &rarr; Accounts</strong> page.</li>
              <li>Select your account to view the allocated <code class="text-brand-accent">Dedicated Static Proxy IP</code>.</li>
              <li>In your broker developer console under <strong>App Settings &rarr; IP Whitelist</strong>, paste this IP.</li>
              <li>Save changes. All orders from EnvoyTrade will egress exclusively through this verified IP address.</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      step: '04',
      title: 'Add Accounts to EnvoyTrade Dashboard',
      badge: 'Account Management',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Log in to the dashboard at <a href={SITE_CONFIG.loginUrl} target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">mime.envoytrade.in</a> to register your master and child trading accounts.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 text-xs">
            <div class="p-4 rounded-xl bg-brand-dark border border-brand-border">
              <h4 class="font-bold text-white text-sm mb-2">Master Trading Account</h4>
              <p class="text-brand-muted mb-2">The account where manual or algorithmic trades are placed.</p>
              <ul class="space-y-1 text-brand-light">
                <li>&bull; Role: <strong class="text-brand-accent">Master</strong></li>
                <li>&bull; Broker User ID (e.g. <code class="text-brand-light">AB1234</code>)</li>
                <li>&bull; API Key & API Secret</li>
                <li>&bull; Kite Password & Base32 TOTP Secret</li>
              </ul>
            </div>
            <div class="p-4 rounded-xl bg-brand-dark border border-brand-border">
              <h4 class="font-bold text-white text-sm mb-2">Follower Child Accounts</h4>
              <p class="text-brand-muted mb-2">Accounts that automatically mirror the master's orders.</p>
              <ul class="space-y-1 text-brand-light">
                <li>&bull; Role: <strong class="text-sky-400">Follower</strong></li>
                <li>&bull; Assigned dedicated Proxy IP (IPv4 / IPv6)</li>
                <li>&bull; Assigned Copy Group</li>
                <li>&bull; Sizing Multiplier (e.g. 1.0x, 2.0x, 0.5x)</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '05',
      title: 'Configure Copy Groups & Sizing Multipliers',
      badge: 'Risk & Allocation',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Groups allow you to organize followers and dictate how order quantities scale:
          </p>
          <div class="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-3 text-xs">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-brand-accent mt-1.5 shrink-0" />
              <div>
                <strong class="text-white block">Lot Size Flooring Rule:</strong>
                <span class="text-brand-muted">
                  Derivative orders are always floored to exact contract lot multiples (resolved live from official exchange master instrument tables). A 0.5x multiplier on a 1-lot order never places an invalid fractional order.
                </span>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-brand-accent mt-1.5 shrink-0" />
              <div>
                <strong class="text-white block">Per-Order Quantity Cap:</strong>
                <span class="text-brand-muted">
                  Set a hard cap (e.g. 1,800 qty for Nifty / Bank Nifty) to prevent unexpected over-allocation in case of fat-finger errors on the master.
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '06',
      title: 'Execute a Test Trade & Live Verification',
      badge: 'Go-Live Verification',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Verify the pipeline before trading live capital:
          </p>
          <div class="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-2 text-xs">
            <p>1. Place a 1-share or 1-lot order on the master Kite account.</p>
            <p>2. Watch the EnvoyTrade real-time dashboard activity feed: observe postback received &rarr; fan-out dispatched &rarr; child order confirmed.</p>
            <p>3. Check the follower trading terminal to confirm order execution with tag <code class="text-brand-accent">ET-[hash]</code>.</p>
            <p>4. Verify the recorded latency timestamp in the dashboard audit log (&lt; 100ms).</p>
          </div>
        </div>
      ),
    },
    {
      step: '07',
      title: 'Daily Automated Session Renewal',
      badge: 'Hands-Free Operation',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Indian broker API access tokens expire daily at 6:00 AM IST. EnvoyTrade eliminates manual morning logins:
          </p>
          <p class="text-xs text-brand-light">
            Our background daemon uses your securely encrypted credentials and TOTP secret to automatically initialize and renew daily broker sessions at <strong>8:45 AM IST</strong>, well before market pre-open. Check the dashboard status indicator: a solid green dot confirms readiness.
          </p>
        </div>
      ),
    },
  ]

  return (
    <div class="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div class="mb-14 text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
          Onboarding & Configuration
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Platform Setup Guide
        </h1>
        <p class="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
          Follow this 7-step guide to configure broker developer apps, postback webhooks, dedicated static IP whitelisting, and copy groups for automated execution.
        </p>
      </div>

      {/* Steps List */}
      <div class="space-y-8">
        {steps.map((s) => (
          <section class="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 relative overflow-hidden glass-card-hover">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-brand-border/60">
              <div class="flex items-center gap-3.5">
                <span class="w-9 h-9 rounded-xl bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-mono font-bold flex items-center justify-center text-sm shrink-0">
                  {s.step}
                </span>
                <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {s.title}
                </h2>
              </div>
              <span class="self-start sm:self-center text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-dark border border-brand-border text-brand-light">
                {s.badge}
              </span>
            </div>
            {s.content}
          </section>
        ))}
      </div>

      {/* White-Glove Support Box */}
      <div class="mt-16 bg-gradient-to-br from-brand-surface to-brand-surface-light border border-brand-accent/30 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xl">
        <div class="max-w-2xl mx-auto space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 text-brand-accent flex items-center justify-center mx-auto">
            <WhatsAppIcon size={24} />
          </div>
          <h3 class="text-2xl font-bold text-white">Need White-Glove Onboarding Assistance?</h3>
          <p class="text-sm text-brand-muted leading-relaxed">
            Our core engineering team provides free 1-on-1 onboarding sessions over Google Meet or WhatsApp to help you configure your developer console, postback URLs, and static IP whitelisting.
          </p>
          <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold px-6 py-3 rounded-xl transition text-sm shadow-md"
            >
              <WhatsAppIcon size={16} />
              <span>Connect with Engineering on WhatsApp</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}?subject=Setup%20Assistance%20Request`}
              class="inline-flex items-center justify-center gap-2 bg-brand-surface border border-brand-border hover:border-brand-accent/40 text-white font-medium px-5 py-3 rounded-xl transition text-sm"
            >
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
