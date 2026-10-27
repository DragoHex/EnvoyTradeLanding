import { createSignal, Show, For } from 'solid-js'
import { SITE_CONFIG } from '../config/site'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import {
  KiteLogo,
  DhanLogo,
  AngelOneLogo,
  FyersLogo,
  UpstoxLogo,
  GrowwLogo,
  KotakNeoLogo,
} from '../components/BrokerLogo'

interface BrokerConfig {
  id: string
  name: string
  status: 'live' | 'upcoming'
  statusLabel: string
  logo: (size?: number) => any
}

export function SetupGuidePage() {
  const [selectedBroker, setSelectedBroker] = createSignal<string>('kite')
  const [copiedUrl, setCopiedUrl] = createSignal<string | null>(null)

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const BROKERS: BrokerConfig[] = [
    {
      id: 'kite',
      name: 'Zerodha Kite',
      status: 'live',
      statusLabel: 'Live',
      logo: (size) => <KiteLogo size={size ?? 20} />,
    },
    {
      id: 'dhan',
      name: 'Dhan',
      status: 'live',
      statusLabel: 'Live',
      logo: (size) => <DhanLogo size={size ?? 20} />,
    },
    {
      id: 'angelone',
      name: 'Angel One',
      status: 'upcoming',
      statusLabel: 'Coming Soon',
      logo: (size) => <AngelOneLogo size={size ?? 20} />,
    },
    {
      id: 'fyers',
      name: 'FYERS',
      status: 'upcoming',
      statusLabel: 'Coming Soon',
      logo: (size) => <FyersLogo size={size ?? 18} />,
    },
    {
      id: 'upstox',
      name: 'Upstox',
      status: 'upcoming',
      statusLabel: 'Coming Soon',
      logo: (size) => <UpstoxLogo size={size ?? 20} />,
    },
    {
      id: 'groww',
      name: 'Groww',
      status: 'upcoming',
      statusLabel: 'Coming Soon',
      logo: (size) => <GrowwLogo size={size ?? 20} />,
    },
    {
      id: 'kotak',
      name: 'Kotak Neo',
      status: 'upcoming',
      statusLabel: 'Coming Soon',
      logo: (size) => <KotakNeoLogo size={size ?? 20} />,
    },
  ]

  const kiteSteps = [
    {
      step: '01',
      title: 'Create Developer App in Broker Console',
      badge: 'Prerequisite',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Each trading account (master trader and child follower) connects through its own dedicated broker application credentials.
          </p>
          <div class="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-3">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-white text-sm">Zerodha Kite Connect</span>
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/25">Live</span>
            </div>
            <p class="text-xs">
              Log in to <a href="https://developers.kite.trade" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">developers.kite.trade</a> and click <strong>Create New App</strong>.
            </p>
            <ul class="list-disc list-inside space-y-1.5 text-xs text-brand-light">
              <li>App Name: <code class="text-brand-accent">EnvoyTrade Copier</code></li>
              <li class="flex flex-wrap items-center gap-2">
                <span>Redirect / Callback URL:</span>
                <code class="text-brand-accent font-mono bg-brand-surface px-2 py-0.5 rounded border border-brand-border">https://mime.envoytrade.in/broker-callback</code>
                <button
                  type="button"
                  onClick={() => handleCopy('https://mime.envoytrade.in/broker-callback')}
                  class="text-[11px] text-brand-muted hover:text-white bg-brand-surface px-2 py-0.5 rounded border border-brand-border transition"
                >
                  {copiedUrl() === 'https://mime.envoytrade.in/broker-callback' ? 'Copied!' : 'Copy'}
                </button>
              </li>
              <li>Save your <code class="text-brand-accent">api_key</code> and <code class="text-brand-accent">api_secret</code></li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      step: '02',
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
      step: '03',
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
      step: '04',
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
      step: '05',
      title: 'Execute a Test Trade & Live Verification',
      badge: 'Go-Live Verification',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Verify the pipeline before trading live capital:
          </p>
          <div class="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-2 text-xs">
            <p>1. Place a 1-share or 1-lot order on the master Kite account.</p>
            <p>2. Watch the EnvoyTrade real-time dashboard activity feed: observe master fill &rarr; fan-out dispatched &rarr; child order confirmed.</p>
            <p>3. Check the follower trading terminal to confirm order execution with tag <code class="text-brand-accent">ET-[hash]</code>.</p>
            <p>4. Verify the recorded latency timestamp in the dashboard audit log (&lt; 100ms).</p>
          </div>
        </div>
      ),
    },
    {
      step: '06',
      title: 'Daily Automated Session Renewal',
      badge: 'Hands-Free Operation',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Indian broker API access tokens are mandated by SEBI to expire within 24 hours (resetting daily at 6:00 AM IST). EnvoyTrade eliminates manual morning logins with automated daily session renewal.
          </p>
        </div>
      ),
    },
  ]

  const dhanSteps = [
    {
      step: '01',
      title: 'Enable DhanHQ Trading APIs & Generate Access Token/API Key',
      badge: 'Prerequisite',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Dhan provides direct developer access through the DhanHQ API portal. Configure your API key to connect your Dhan account:
          </p>
          <div class="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-3 text-xs">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-white text-sm">DhanHQ Trading APIs</span>
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/25">Live</span>
            </div>
            <ol class="list-decimal list-inside space-y-2 text-brand-light">
              <li>
                Log in to <a href="https://web.dhan.co" target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline font-mono">web.dhan.co</a> and open your account profile.
              </li>
              <li>
                Navigate to <strong>Profile &rarr; DhanHQ Trading APIs</strong>.
              </li>
              <li>
                Enable <strong>"Free Tier: Trading APIs"</strong> if not already enabled.
              </li>
              <li>
                On the same page, click on <strong>"Generate Access Token/API Key"</strong>.
              </li>
              <li>
                Set Application Name to <code class="text-brand-accent">EnvoyTrade Copier</code>.
              </li>
              <li class="flex flex-wrap items-center gap-2">
                <span>Set Postback URL:</span>
                <code class="text-brand-accent font-mono bg-brand-surface px-2 py-0.5 rounded border border-brand-border">https://mime.envoytrade.in/broker-callback</code>
                <button
                  type="button"
                  onClick={() => handleCopy('https://mime.envoytrade.in/broker-callback')}
                  class="text-[11px] text-brand-muted hover:text-white bg-brand-surface px-2 py-0.5 rounded border border-brand-border transition"
                >
                  {copiedUrl() === 'https://mime.envoytrade.in/broker-callback' ? 'Copied!' : 'Copy'}
                </button>
              </li>
              <li>
                Once generated, securely copy and save your Access Token / API Key.
              </li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      step: '02',
      title: 'Whitelist Dedicated Static Egress IP',
      badge: 'Broker Compliance',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            EnvoyTrade routes all order requests through a <strong>dedicated static proxy IP</strong> allocated to your account, ensuring compliance with institutional security and broker API safeguards.
          </p>
          <div class="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-2 text-xs">
            <ol class="list-decimal list-inside space-y-1.5 text-brand-light">
              <li>Open your <strong>EnvoyTrade Dashboard &rarr; Accounts</strong> page.</li>
              <li>Select your Dhan account to view the allocated <code class="text-brand-accent">Dedicated Static Proxy IP</code>.</li>
              <li>In your DhanHQ API settings, enter this IP under the allowed egress/whitelist settings if prompted.</li>
              <li>All copy-trade signals egress exclusively through this verified static IP address.</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      step: '03',
      title: 'Add Dhan Accounts to EnvoyTrade Dashboard',
      badge: 'Account Management',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Log in to the dashboard at <a href={SITE_CONFIG.loginUrl} target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline">mime.envoytrade.in</a> to register your Dhan accounts:
          </p>
          <div class="grid sm:grid-cols-2 gap-4 text-xs">
            <div class="p-4 rounded-xl bg-brand-dark border border-brand-border">
              <h4 class="font-bold text-white text-sm mb-2">Master Dhan Account</h4>
              <p class="text-brand-muted mb-2">Primary account executing master strategy orders.</p>
              <ul class="space-y-1 text-brand-light">
                <li>&bull; Broker: <strong class="text-brand-accent">Dhan</strong></li>
                <li>&bull; Role: <strong class="text-brand-accent">Master</strong></li>
                <li>&bull; Dhan Client ID (e.g. <code class="text-brand-light">1000000001</code>)</li>
                <li>&bull; Generated Access Token / API Key</li>
              </ul>
            </div>
            <div class="p-4 rounded-xl bg-brand-dark border border-brand-border">
              <h4 class="font-bold text-white text-sm mb-2">Follower Dhan Accounts</h4>
              <p class="text-brand-muted mb-2">Accounts that automatically replicate trades in real time.</p>
              <ul class="space-y-1 text-brand-light">
                <li>&bull; Role: <strong class="text-sky-400">Follower</strong></li>
                <li>&bull; Generated Access Token / API Key</li>
                <li>&bull; Assigned dedicated Proxy IP (IPv4 / IPv6)</li>
                <li>&bull; Assigned Copy Group & Sizing Multiplier (e.g. 1.0x, 2.0x)</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '04',
      title: 'Configure Copy Groups & Sizing Multipliers',
      badge: 'Risk & Allocation',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Organize Dhan follower accounts into groups and calibrate sizing multipliers:
          </p>
          <div class="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-3 text-xs">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-brand-accent mt-1.5 shrink-0" />
              <div>
                <strong class="text-white block">Lot Size Flooring Rule:</strong>
                <span class="text-brand-muted">
                  Dhan derivative contracts (Nifty, Bank Nifty, FinNifty, Stock F&O, MCX) are strictly floored to whole contract lot multiples. Fractional multiplier outcomes never submit invalid quantity sizes.
                </span>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-brand-accent mt-1.5 shrink-0" />
              <div>
                <strong class="text-white block">Per-Order Quantity Cap:</strong>
                <span class="text-brand-muted">
                  Set safety caps per child account to avoid unexpected exposure during high-frequency trading.
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '05',
      title: 'Execute a Test Trade & Live Verification',
      badge: 'Go-Live Verification',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Validate order replication on your connected accounts:
          </p>
          <div class="p-4 rounded-xl bg-brand-dark border border-brand-border space-y-2 text-xs">
            <p>1. Place a 1-share or 1-lot order on the master Dhan account.</p>
            <p>2. Watch the EnvoyTrade real-time dashboard activity feed: observe master fill &rarr; fan-out dispatched &rarr; child order confirmed.</p>
            <p>3. Check the follower trading terminal to confirm order execution with tag <code class="text-brand-accent">ET-[hash]</code>.</p>
            <p>4. Verify the recorded latency timestamp in the dashboard audit log (&lt; 100ms).</p>
          </div>
        </div>
      ),
    },
    {
      step: '06',
      title: 'Daily Automated Session Renewal',
      badge: 'Hands-Free Operation',
      content: (
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <p>
            Indian broker API access tokens are mandated by SEBI to expire within 24 hours (resetting daily at 6:00 AM IST). EnvoyTrade eliminates manual morning logins with automated daily session renewal.
          </p>
        </div>
      ),
    },
  ]

  const activeBroker = () => BROKERS.find((b) => b.id === selectedBroker()) ?? BROKERS[0]

  return (
    <div class="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div class="mb-12 text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
          Onboarding & Configuration
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Platform Setup Guide
        </h1>
        <p class="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
          Follow this step-by-step guide to configure broker developer apps, dedicated static IP whitelisting, and copy groups for automated execution.
        </p>
      </div>

      {/* Broker Selector Tabs */}
      <div class="mb-10">
        <div class="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-3 text-center sm:text-left">
          Select Broker to View Guide:
        </div>
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
          <For each={BROKERS}>
            {(broker) => {
              const isSelected = () => selectedBroker() === broker.id
              return (
                <button
                  type="button"
                  onClick={() => setSelectedBroker(broker.id)}
                  class={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition cursor-pointer ${
                    isSelected()
                      ? 'bg-brand-surface border-brand-accent text-white shadow-md shadow-brand-accent/5 ring-1 ring-brand-accent/40'
                      : 'bg-brand-surface/60 border-brand-border text-brand-muted hover:text-white hover:border-brand-border/80 hover:bg-brand-surface'
                  }`}
                >
                  {broker.logo(20)}
                  <span>{broker.name}</span>
                  {broker.status === 'live' ? (
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/25">
                      {broker.statusLabel}
                    </span>
                  ) : (
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/25">
                      {broker.statusLabel}
                    </span>
                  )}
                </button>
              )
            }}
          </For>
        </div>
      </div>

      {/* Dynamic Broker Content */}
      <Show when={selectedBroker() === 'kite'}>
        <div class="space-y-8">
          <For each={kiteSteps}>
            {(s) => (
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
            )}
          </For>
        </div>
      </Show>

      <Show when={selectedBroker() === 'dhan'}>
        <div class="space-y-8">
          <For each={dhanSteps}>
            {(s) => (
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
            )}
          </For>
        </div>
      </Show>

      {/* Theme-Matched Coming Soon Card for Other Brokers */}
      <Show when={selectedBroker() !== 'kite' && selectedBroker() !== 'dhan'}>
        <div class="bg-brand-surface border border-brand-border rounded-2xl p-8 sm:p-12 relative overflow-hidden glass-card text-center">
          <div class="max-w-2xl mx-auto space-y-6">
            <div class="w-16 h-16 rounded-2xl bg-brand-dark/50 border border-brand-border flex items-center justify-center mx-auto shadow-md">
              {activeBroker().logo(34)}
            </div>
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Integration in Progress &bull; Coming Soon
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeBroker().name} Setup Guide
              </h2>
            </div>
            <p class="text-sm sm:text-base text-brand-muted leading-relaxed">
              The dedicated step-by-step onboarding walkthrough for <strong>{activeBroker().name}</strong> is currently being finalized. Our low-latency copy-trade engine is architected to support {activeBroker().name}'s official trading API endpoints.
            </p>

            <div class="grid sm:grid-cols-3 gap-3 text-left pt-2">
              <div class="p-3.5 rounded-xl bg-brand-dark/60 border border-brand-border text-xs">
                <strong class="text-white block mb-1">Sub-100ms Latency</strong>
                <span class="text-brand-muted">Native REST & WebSocket order replication.</span>
              </div>
              <div class="p-3.5 rounded-xl bg-brand-dark/60 border border-brand-border text-xs">
                <strong class="text-white block mb-1">Static Proxy Egress</strong>
                <span class="text-brand-muted">Dedicated single-tenant IP for API compliance.</span>
              </div>
              <div class="p-3.5 rounded-xl bg-brand-dark/60 border border-brand-border text-xs">
                <strong class="text-white block mb-1">Automated Flooring</strong>
                <span class="text-brand-muted">Live exchange master contract lot multiples.</span>
              </div>
            </div>

            <div class="pt-4 flex justify-center">
              <a
                href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(`Hi, I would like to register interest for ${activeBroker().name} on EnvoyTrade.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold px-6 py-3 rounded-xl transition text-sm shadow-md"
              >
                <WhatsAppIcon size={16} />
                <span>Register Interest</span>
              </a>
            </div>
          </div>
        </div>
      </Show>

      {/* White-Glove Support Box */}
      <div class="mt-16 bg-gradient-to-br from-brand-surface to-brand-surface-light border border-brand-accent/30 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xl">
        <div class="max-w-2xl mx-auto space-y-4">
          <div class="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 text-brand-accent flex items-center justify-center mx-auto">
            <WhatsAppIcon size={24} />
          </div>
          <h3 class="text-2xl font-bold text-white">Need White-Glove Onboarding Assistance?</h3>
          <p class="text-sm text-brand-muted leading-relaxed">
            Our core engineering team provides free 1-on-1 onboarding sessions over Google Meet or WhatsApp to help you configure your developer console and static IP whitelisting.
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
