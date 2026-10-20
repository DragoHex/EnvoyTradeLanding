import { createSignal, onMount, onCleanup, For, Show } from 'solid-js'
import { SITE_CONFIG, getRelativePath } from '../config/site'
import { WhatsAppIcon } from '../components/WhatsAppIcon'

interface DocSection {
  id: string
  title: string
  category: string
}

export function DocsPage() {
  const sections: DocSection[] = [
    { id: 'overview', title: 'Platform Overview', category: 'Getting Started' },
    { id: 'account-management', title: 'Accounts & Follower Groups', category: 'Getting Started' },
    { id: 'lot-sizing', title: 'Multipliers & Lot Sizing', category: 'Trading Rules' },
    { id: 'static-ip', title: 'Dedicated Static IP & Compliance', category: 'Security' },
    { id: 'risk-controls', title: 'Risk Controls & Square-Off', category: 'Risk Protection' },
    { id: 'monitoring', title: 'Live Tracking & Position Sync', category: 'Operations' },
    { id: 'supported-brokers', title: 'Supported Brokers & Segments', category: 'Coverage' },
    { id: 'faqs', title: 'Frequently Asked Questions', category: 'Support' },
  ]

  const [activeSection, setActiveSection] = createSignal('overview')
  const [mobileIndexOpen, setMobileIndexOpen] = createSignal(false)

  const currentTitle = () => {
    const s = sections.find((item) => item.id === activeSection())
    return s ? s.title : 'Overview'
  }

  const scrollTo = (id: string) => {
    setActiveSection(id)
    setMobileIndexOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -60% 0px' }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    onCleanup(() => observer.disconnect())
  })

  return (
    <div class="min-h-screen">
      {/* Mobile Smart Floating Index */}
      <div class="lg:hidden sticky top-16 z-30 bg-brand-surface/95 backdrop-blur-md border-b border-brand-border px-4 py-2.5 shadow-md">
        <button
          type="button"
          onClick={() => setMobileIndexOpen(!mobileIndexOpen())}
          class="w-full flex items-center justify-between py-2 px-3.5 rounded-xl bg-brand-surface border border-brand-border text-xs font-medium text-brand-light hover:border-brand-accent/40 transition"
          aria-expanded={mobileIndexOpen()}
        >
          <span class="flex items-center gap-2 truncate">
            <span class="text-brand-accent font-mono font-bold">#</span>
            <span class="text-brand-muted">Section:</span>
            <span class="text-brand-light font-semibold truncate">{currentTitle()}</span>
          </span>
          <svg
            class={`w-4 h-4 text-brand-accent shrink-0 transition-transform duration-200 ${mobileIndexOpen() ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Collapsible Mobile Dropdown Panel */}
        <Show when={mobileIndexOpen()}>
          <div class="mt-2 py-2 max-h-72 overflow-y-auto bg-brand-surface border border-brand-border rounded-xl shadow-2xl divide-y divide-brand-border/40 animate-fade-in">
            <For each={sections}>
              {(section) => (
                <button
                  type="button"
                  onClick={() => scrollTo(section.id)}
                  class={`w-full text-left px-4 py-2.5 text-xs flex items-center justify-between transition ${
                    activeSection() === section.id
                      ? 'bg-brand-accent/10 text-brand-accent font-semibold'
                      : 'text-brand-muted hover:bg-brand-surface hover:text-brand-light'
                  }`}
                >
                  <span>{section.title}</span>
                  <span class="text-[10px] text-brand-muted uppercase font-mono">{section.category}</span>
                </button>
              )}
            </For>
          </div>
        </Show>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div class="flex gap-12 items-start">
          {/* Desktop Left Sidebar Index */}
          <aside class="hidden lg:block w-72 shrink-0 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-4 scrollbar-thin">
            <div class="pb-4 mb-4 border-b border-brand-border">
              <span class="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                Platform Documentation
              </span>
              <p class="text-xs text-brand-muted mt-1">
                EnvoyTrade User Guide & Platform Reference
              </p>
            </div>

            <nav class="space-y-1">
              <For each={sections}>
                {(section) => (
                  <button
                    type="button"
                    onClick={() => scrollTo(section.id)}
                    class={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between group ${
                      activeSection() === section.id
                        ? 'bg-brand-accent/10 text-brand-accent border-l-2 border-brand-accent font-semibold'
                        : 'text-brand-muted hover:text-brand-light hover:bg-brand-surface'
                    }`}
                  >
                    <span class="truncate">{section.title}</span>
                    <span class="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-dark/50 border border-brand-border/50 text-brand-muted group-hover:text-brand-light">
                      {section.category}
                    </span>
                  </button>
                )}
              </For>
            </nav>

            <div class="mt-8 p-4 rounded-xl bg-brand-surface border border-brand-border text-xs space-y-2">
              <span class="font-bold text-white block">Interactive Setup Guide</span>
              <p class="text-brand-muted">
                Step-by-step instructions for creating broker API keys and whitelisting your static IP.
              </p>
              <a
                href={getRelativePath('setup-guide/', true)}
                class="inline-block text-brand-accent hover:underline font-semibold"
              >
                Open Setup Guide &rarr;
              </a>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <main class="flex-1 min-w-0 space-y-16">
            {/* Header intro */}
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
                User Guide & Platform Reference
              </div>
              <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                EnvoyTrade Documentation
              </h1>
              <p class="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed max-w-3xl">
                Everything you need to know about setting up your master account, configuring follower multipliers, managing risk, and replicating trades across Indian brokers.
              </p>
            </div>

            {/* Section 1: Overview */}
            <section id="overview" class="scroll-mt-24 space-y-4 pt-6 border-t border-brand-border">
              <h2 class="text-2xl font-bold text-white tracking-tight">1. Platform Overview & How It Works</h2>
              <p class="text-sm text-brand-muted leading-relaxed">
                EnvoyTrade is a high-speed automated trade copier designed specifically for Indian stock and derivative markets. Whenever you execute a trade on your primary <strong>Master Account</strong>—whether manually in your broker's app, through TradingView, or using an algorithm—EnvoyTrade instantly replicates the identical trade across all your connected <strong>Child (Follower) Accounts</strong> with sub-100ms speed.
              </p>
              <div class="grid sm:grid-cols-3 gap-4 text-xs pt-2">
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">Sub-100ms Speed</h4>
                  <p class="text-brand-muted">Trades replicate virtually instantaneously, ensuring your follower accounts receive the same entry and exit prices with minimal slippage.</p>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">100% Cloud Hosted</h4>
                  <p class="text-brand-muted">Runs 24/7 on high-speed cloud infrastructure. You never need to keep your laptop or home computer on during trading hours.</p>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">Zero Double-Buys</h4>
                  <p class="text-brand-muted">Built-in safeguards guarantee that no order is ever placed twice, even during market volatility, network reconnects, or internet spikes.</p>
                </div>
              </div>
            </section>

            {/* Section 2: Account Management */}
            <section id="account-management" class="scroll-mt-24 space-y-4 pt-6 border-t border-brand-border">
              <h2 class="text-2xl font-bold text-white tracking-tight">2. Accounts & Follower Groups</h2>
              <p class="text-sm text-brand-muted leading-relaxed">
                EnvoyTrade organizes trading accounts using a clean, flexible hierarchy designed for individual traders, family portfolios, and prop desks:
              </p>
              <div class="space-y-3 text-xs text-brand-muted">
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <strong class="text-white block mb-1">Master Account</strong>
                  <span>The primary trading account where signals originate. You can place trades manually from your broker's web/mobile platform (like Zerodha Kite, Dhan App, Angel One) or connect your existing automated strategies.</span>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <strong class="text-white block mb-1">Child (Follower) Accounts</strong>
                  <span>Investor, client, or personal sub-accounts that mirror the master's positions. Each child account can be configured with its own unique multiplier based on available capital.</span>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <strong class="text-white block mb-1">Follower Groups</strong>
                  <span>Group multiple child accounts together (e.g., "Family Accounts", "Aggressive Options", "Hedge Group"). You can pause, enable, or configure settings for an entire group with a single click.</span>
                </div>
              </div>
            </section>

            {/* Section 3: Multipliers & Lot Sizing */}
            <section id="lot-sizing" class="scroll-mt-24 space-y-4 pt-6 border-t border-brand-border">
              <h2 class="text-2xl font-bold text-white tracking-tight">3. Multipliers & Precision Lot Sizing</h2>
              <p class="text-sm text-brand-muted leading-relaxed">
                Every follower account has different capital and risk preferences. EnvoyTrade makes position sizing intuitive and completely flexible:
              </p>
              <div class="p-5 rounded-xl bg-brand-surface border border-brand-border space-y-3 text-xs">
                <h4 class="font-bold text-white">How Lot Multipliers Work</h4>
                <div class="space-y-2 text-brand-muted">
                  <p><strong class="text-white">&bull; 1.0x Multiplier (Exact Match):</strong> If the Master buys 2 lots of NIFTY (50 qty), the Follower buys 2 lots (50 qty).</p>
                  <p><strong class="text-white">&bull; 2.0x Multiplier (Scaled Up):</strong> If the Master buys 2 lots of NIFTY, the Follower buys 4 lots (100 qty).</p>
                  <p><strong class="text-white">&bull; 0.5x Multiplier (Scaled Down):</strong> If the Master buys 2 lots of NIFTY, the Follower buys 1 lot (25 qty).</p>
                </div>
              </div>

              <div class="grid sm:grid-cols-2 gap-4 text-xs pt-2">
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">Automatic Whole-Lot Rounding</h4>
                  <p class="text-brand-muted">
                    Indian derivative exchanges (NFO, BFO, MCX) require full lots. If a multiplier calculates a fractional lot (such as 0.5x on a 1-lot order), EnvoyTrade safely rounds down to the nearest whole lot so the broker never rejects your trade.
                  </p>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">Maximum Order Cap Protection</h4>
                  <p class="text-brand-muted">
                    Set a maximum quantity ceiling per order for any account. If an incoming trade exceeds this safety limit, EnvoyTrade automatically caps the quantity at your threshold to preserve account capital.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Dedicated Static IP */}
            <section id="static-ip" class="scroll-mt-24 space-y-4 pt-6 border-t border-brand-border">
              <h2 class="text-2xl font-bold text-white tracking-tight">4. Dedicated Static IP & Broker Compliance</h2>
              <p class="text-sm text-brand-muted leading-relaxed">
                Indian brokerages (including Zerodha, Angel One, and Upstox) require trading API applications to connect exclusively from verified, whitelisted IP addresses.
              </p>
              <div class="space-y-3 text-xs text-brand-muted">
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <strong class="text-white block mb-1">Dedicated Clean IP Addresses</strong>
                  <span>EnvoyTrade provisions dedicated static IPv4 or IPv6 addresses for your accounts. Your trades always route through your assigned IP, maintaining full compliance with broker API regulations.</span>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <strong class="text-white block mb-1">No Shared IP Risk</strong>
                  <span>Unlike low-cost copy tools that route hundreds of traders through shared public IPs—which frequently causes broker API bans and IP blacklisting—your EnvoyTrade accounts run on private, dedicated connections.</span>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <strong class="text-white block mb-1">Intelligent Rate-Limiting</strong>
                  <span>EnvoyTrade automatically manages outbound order pacing (~10 orders/sec per account) to strictly respect broker token limits, eliminating accidental rate-limit errors during high-volume market openings.</span>
                </div>
              </div>
            </section>

            {/* Section 5: Risk Controls */}
            <section id="risk-controls" class="scroll-mt-24 space-y-4 pt-6 border-t border-brand-border">
              <h2 class="text-2xl font-bold text-white tracking-tight">5. Risk Controls & Emergency Safeguards</h2>
              <p class="text-sm text-brand-muted leading-relaxed">
                Automated trading requires rock-solid risk management. EnvoyTrade provides immediate, one-click controls to protect your capital:
              </p>
              <div class="grid sm:grid-cols-3 gap-4 text-xs pt-2">
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">Master Copy Switch</h4>
                  <p class="text-brand-muted">Temporarily pause copying for any account or follower group with a single toggle. In-flight trades finish cleanly, and new orders are safely held.</p>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">Emergency Panic Square-Off</h4>
                  <p class="text-brand-muted">Instantly close all open positions across all linked accounts with market exit orders during high-impact news or volatile market spikes.</p>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">Margin Shortage Protection</h4>
                  <p class="text-brand-muted">If a child account lacks sufficient margin, only that specific account's trade is skipped. Your other adequately funded accounts execute normally.</p>
                </div>
              </div>
            </section>

            {/* Section 6: Live Tracking & Reconciliation */}
            <section id="monitoring" class="scroll-mt-24 space-y-4 pt-6 border-t border-brand-border">
              <h2 class="text-2xl font-bold text-white tracking-tight">6. Live Tracking & Position Sync</h2>
              <p class="text-sm text-brand-muted leading-relaxed">
                Maintain total transparency and complete peace of mind while trading:
              </p>
              <div class="space-y-3 text-xs text-brand-muted">
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <strong class="text-white block mb-1">Real-Time Activity Dashboard</strong>
                  <span>Watch trades replicate in real time. View execution timestamps, fill quantities, average prices, and broker order IDs instantly.</span>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <strong class="text-white block mb-1">Continuous Position Sync (Drift Detection)</strong>
                  <span>EnvoyTrade continuously cross-checks net open positions between your master account and follower accounts. If any discrepancy occurs (for example, if a position was manually exited in a broker mobile app), the dashboard highlights the difference immediately.</span>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <strong class="text-white block mb-1">Comprehensive Audit Logs</strong>
                  <span>Every single order placed, skipped, or modified is permanently logged with timestamps, giving you a complete, audit-ready record of every trade.</span>
                </div>
              </div>
            </section>

            {/* Section 7: Supported Brokers & Segments */}
            <section id="supported-brokers" class="scroll-mt-24 space-y-4 pt-6 border-t border-brand-border">
              <h2 class="text-2xl font-bold text-white tracking-tight">7. Supported Brokers & Market Segments</h2>
              <p class="text-sm text-brand-muted leading-relaxed">
                EnvoyTrade supports cross-broker replication, meaning your master account and child accounts do not need to be on the same brokerage!
              </p>
              <div class="grid sm:grid-cols-2 gap-4 text-xs pt-2">
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-2">Supported Indian Brokers</h4>
                  <ul class="space-y-1.5 text-brand-muted">
                    <li>&bull; <strong class="text-white">Zerodha Kite Connect</strong> (Live Integration)</li>
                    <li>&bull; <strong class="text-white">Angel One SmartAPI</strong> (Integration Ready)</li>
                    <li>&bull; <strong class="text-white">FYERS API v3</strong> (Integration Ready)</li>
                    <li>&bull; <strong class="text-white">Dhan HQ</strong> (Integration Ready)</li>
                    <li>&bull; <strong class="text-white">Upstox Developer API</strong> (Integration Ready)</li>
                    <li>&bull; <strong class="text-white">Kotak Neo & Groww</strong> (Integration Ready)</li>
                  </ul>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-2">Supported Segments</h4>
                  <ul class="space-y-1.5 text-brand-muted">
                    <li>&bull; <strong class="text-white">Equity Cash:</strong> NSE & BSE Equities (CNC, MIS)</li>
                    <li>&bull; <strong class="text-white">Index & Stock Options:</strong> NIFTY, BANKNIFTY, FINNIFTY, SENSEX (NRML, MIS)</li>
                    <li>&bull; <strong class="text-white">Futures:</strong> Index & Stock Futures contracts</li>
                    <li>&bull; <strong class="text-white">Commodities:</strong> MCX Gold, Silver, Crude Oil, Natural Gas</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 8: FAQ */}
            <section id="faqs" class="scroll-mt-24 space-y-4 pt-6 border-t border-brand-border">
              <h2 class="text-2xl font-bold text-white tracking-tight">8. Frequently Asked Questions</h2>
              <div class="space-y-3 text-xs text-brand-muted">
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">Do I need to keep my laptop or computer running?</h4>
                  <p>No. EnvoyTrade is 100% cloud-hosted on high-speed servers in Mumbai. Once your accounts are linked, trades replicate automatically 24/7 without requiring any local software.</p>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">Can I copy trades across different brokers?</h4>
                  <p>Yes. Your master account can be on Zerodha Kite, while your follower accounts can be on Angel One, Dhan, or Upstox. Cross-broker replication is supported natively.</p>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">What happens if a follower account has insufficient funds?</h4>
                  <p>If a child account lacks adequate margin, the broker rejects only that specific child order. EnvoyTrade alerts you on the dashboard, while all other adequately funded accounts continue executing smoothly.</p>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">Can I manually exit trades directly from my broker's app?</h4>
                  <p>Yes. You always maintain full custody and control of your trading accounts. If you exit a trade manually in your broker's app, EnvoyTrade's position sync will detect the change and reflect it on your dashboard.</p>
                </div>
                <div class="p-4 rounded-xl bg-brand-surface border border-brand-border">
                  <h4 class="font-bold text-white mb-1">How fast is trade execution?</h4>
                  <p>In live production environments, median copy latency from master execution to follower placement is between 80ms and 120ms.</p>
                </div>
              </div>
            </section>

            {/* Customer Support Callout */}
            <div class="p-6 rounded-2xl bg-brand-surface border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 class="text-base font-bold text-white">Need help getting started or connecting your broker?</h3>
                <p class="text-xs text-brand-muted mt-1">Our support team is ready to guide you through account linking and setup.</p>
              </div>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold px-4 py-2.5 rounded-xl text-xs whitespace-nowrap transition shrink-0"
              >
                <WhatsAppIcon size={14} />
                <span>Chat with Support</span>
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
