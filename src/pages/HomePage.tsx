import { createSignal, onMount } from 'solid-js'
import { SITE_CONFIG, getRelativePath } from '../config/site'
import { PricingCard } from '../components/PricingCard'
import { KiteLogo, AngelOneLogo, FyersLogo, DhanLogo, UpstoxLogo } from '../components/BrokerLogo'
import { BrokersModal } from '../components/BrokersModal'
import { WhatsAppIcon } from '../components/WhatsAppIcon'

export function HomePage() {
  const [brokersModalOpen, setBrokersModalOpen] = createSignal(false)

  onMount(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1)
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  })

  return (
    <div>
      {/* Hero Section */}
      <section class="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background glow */}
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-accent/10 blur-[130px] rounded-full pointer-events-none" />

        <div class="max-w-5xl mx-auto text-center relative z-10">
          <div class="inline-flex items-center gap-2.5 bg-brand-surface/90 border border-brand-border rounded-full px-4 py-1.5 text-xs sm:text-sm mb-8 text-brand-light shadow-sm">
            <span class="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
            <span class="text-brand-muted">Direct API Integration:</span>
            <span class="font-semibold text-white">Zerodha · Angel One · FYERS · Dhan · Upstox</span>
          </div>

          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight sm:leading-none text-white">
            One Master Account.<br />
            <span class="gradient-text">Every Child Follows.</span>
          </h1>

          <p class="mt-6 text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
            Replicate trades across Indian brokerages with <strong class="text-white font-semibold">sub-100ms median copy latency</strong>. Multipliers, dedicated static IP egress, and deterministic lot-size rounding — zero manual intervention.
          </p>

          <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#pricing"
              class="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-bold px-8 py-4 rounded-xl text-base sm:text-lg shadow-lg shadow-brand-accent/25 hover:shadow-xl transition-all duration-150"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto bg-brand-surface hover:bg-brand-surface-light border border-brand-border hover:border-brand-accent/40 text-brand-light px-8 py-4 rounded-xl text-base sm:text-lg transition-all duration-150 flex items-center justify-center gap-2.5"
            >
              <WhatsAppIcon size={20} class="text-brand-accent" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Performance Stats Bar */}
          <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-brand-border/80 pt-12">
            <div class="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/60">
              <div class="text-3xl sm:text-4xl font-extrabold text-brand-accent">100ms</div>
              <div class="text-xs sm:text-sm text-brand-muted mt-1 font-medium">Median Copy Latency (From parent order settlement to copy order placed)</div>
            </div>
            <div class="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/60">
              <div class="text-3xl sm:text-4xl font-extrabold text-brand-accent">20</div>
              <div class="text-xs sm:text-sm text-brand-muted mt-1 font-medium">Child Accounts</div>
            </div>
            <div class="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/60">
              <div class="text-3xl sm:text-4xl font-extrabold text-brand-accent">7</div>
              <div class="text-xs sm:text-sm text-brand-muted mt-1 font-medium">Supported Brokers</div>
            </div>
            <div class="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/60">
              <div class="text-3xl sm:text-4xl font-extrabold text-brand-accent">₹25Cr+</div>
              <div class="text-xs sm:text-sm text-brand-muted mt-1 font-medium">Copied Daily Turnover</div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Brokers Ticker */}
      <section id="brokers" class="py-10 border-y border-brand-border bg-brand-surface/30 scroll-mt-[35vh]">
        <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span class="text-xs uppercase tracking-wider text-brand-muted font-semibold">
            Certified Compatible With:
          </span>
          <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div class="flex items-center gap-2" title="Zerodha Kite Connect">
              <KiteLogo size={22} />
              <span class="text-sm font-semibold text-white">Zerodha Kite</span>
            </div>
            <div class="flex items-center gap-2" title="Angel One SmartAPI">
              <AngelOneLogo size={20} />
              <span class="text-sm font-semibold text-white">Angel One</span>
            </div>
            <div class="flex items-center gap-2" title="FYERS API v3">
              <FyersLogo size={18} />
              <span class="text-sm font-semibold text-white">FYERS</span>
            </div>
            <div class="flex items-center gap-2" title="Dhan HQ">
              <DhanLogo size={20} />
              <span class="text-sm font-semibold text-white">Dhan</span>
            </div>
            <div class="flex items-center gap-2" title="Upstox API v2">
              <UpstoxLogo size={20} />
              <span class="text-sm font-semibold text-white">Upstox</span>
            </div>
            <button
              type="button"
              onClick={() => setBrokersModalOpen(true)}
              class="text-xs text-brand-accent hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
            >
              <span>View all brokers</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" class="py-24 px-4 sm:px-6 lg:px-8 bg-brand-surface/20">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <div class="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-2">Engineered for Scale</div>
            <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Built for Serious Multi-Account Traders</h2>
            <p class="mt-4 text-base sm:text-lg text-brand-muted max-w-2xl mx-auto">
              Everything required to mirror trades reliably with institutional accuracy, deterministic sizing, and complete audit trails.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-brand-surface border border-brand-border p-8 rounded-2xl glass-card-hover">
              <div class="w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Sub-100ms Copy Latency</h3>
              <p class="text-brand-muted text-sm leading-relaxed">
                Parallel worker pools dispatch orders to up to 20 child accounts with sub-100ms latency. Each follower gets its own non-blocking queue.
              </p>
            </div>

            <div class="bg-brand-surface border border-brand-border p-8 rounded-2xl glass-card-hover">
              <div class="w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Flexible Multipliers</h3>
              <p class="text-brand-muted text-sm leading-relaxed">
                Configure fractional or whole multipliers (e.g., 0.5x, 1.5x, 3x) per child account. Automatic lot-size flooring avoids invalid broker orders.
              </p>
            </div>

            <div class="bg-brand-surface border border-brand-border p-8 rounded-2xl glass-card-hover">
              <div class="w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Dedicated Static IP</h3>
              <p class="text-brand-muted text-sm leading-relaxed">
                Dedicated static IPv4/IPv6 egress proxies ensure seamless API whitelisting and compliance with Indian broker security guidelines.
              </p>
            </div>

            <div class="bg-brand-surface border border-brand-border p-8 rounded-2xl glass-card-hover">
              <div class="w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Cross-Broker Mirroring</h3>
              <p class="text-brand-muted text-sm leading-relaxed">
                Trade on Zerodha and mirror into Angel One or FYERS child accounts. Symbol tokens and product code differences map automatically.
              </p>
            </div>

            <div class="bg-brand-surface border border-brand-border p-8 rounded-2xl glass-card-hover">
              <div class="w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Live Positions & Logs</h3>
              <p class="text-brand-muted text-sm leading-relaxed">
                Real-time dashboard displays per-account positions, margin utilization, order status, and audit logs with microsecond timestamps.
              </p>
            </div>

            <div class="bg-brand-surface border border-brand-border p-8 rounded-2xl glass-card-hover">
              <div class="w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Square-Off Panic Switch</h3>
              <p class="text-brand-muted text-sm leading-relaxed">
                Emergency one-click square off cancels all open orders and liquidates positions across all connected child accounts instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" class="py-24 px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <div class="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-2">Seamless Setup</div>
            <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Get Started in 4 Simple Steps</h2>
            <p class="mt-4 text-base sm:text-lg text-brand-muted">
              Connect your broker APIs in minutes without writing a single line of code.
            </p>
          </div>

          <div class="grid md:grid-cols-4 gap-8">
            <div class="bg-brand-surface/60 border border-brand-border p-6 rounded-2xl text-center relative">
              <div class="w-12 h-12 bg-brand-accent text-brand-dark rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 class="font-bold text-white mb-2">Connect Accounts</h3>
              <p class="text-brand-muted text-xs leading-relaxed">
                Authorize master and child accounts via official Kite Connect, Angel One, or FYERS APIs.
              </p>
            </div>

            <div class="bg-brand-surface/60 border border-brand-border p-6 rounded-2xl text-center relative">
              <div class="w-12 h-12 bg-brand-accent text-brand-dark rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 class="font-bold text-white mb-2">Set Multipliers</h3>
              <p class="text-brand-muted text-xs leading-relaxed">
                Define custom quantity ratios (e.g., 0.5x, 2x) and segment filters for each child account.
              </p>
            </div>

            <div class="bg-brand-surface/60 border border-brand-border p-6 rounded-2xl text-center relative">
              <div class="w-12 h-12 bg-brand-accent text-brand-dark rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 class="font-bold text-white mb-2">Trade on Master</h3>
              <p class="text-brand-muted text-xs leading-relaxed">
                Execute trades normally on your master terminal or algo. Fills trigger instant fan-out.
              </p>
            </div>

            <div class="bg-brand-surface/60 border border-brand-border p-6 rounded-2xl text-center relative">
              <div class="w-12 h-12 bg-brand-accent text-brand-dark rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 class="font-bold text-white mb-2">Monitor Live</h3>
              <p class="text-brand-muted text-xs leading-relaxed">
                Watch replication in real time on the live dashboard with full position sync and logs.
              </p>
            </div>
          </div>

          {/* Direct Links to Setup Guide & Docs */}
          <div class="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getRelativePath('setup-guide/', false)}
              class="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm transition"
            >
              <span>Follow Complete Setup Guide</span>
              <span>&rarr;</span>
            </a>
            <a
              href={getRelativePath('docs/', false)}
              class="inline-flex items-center gap-2 bg-brand-surface border border-brand-border hover:border-brand-accent/40 text-brand-light hover:text-white font-medium px-5 py-2.5 rounded-xl text-sm transition"
            >
              <span>Explore Platform Docs</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" class="py-24 px-4 sm:px-6 lg:px-8 bg-brand-surface/20">
        <div class="max-w-5xl mx-auto text-center">
          <div class="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-2">Transparent Subscriptions</div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p class="text-brand-muted max-w-xl mx-auto mb-16 text-base sm:text-lg">
            Choose your preferred IP architecture. Master and follower accounts are billed separately. All features included.
          </p>

          <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            <PricingCard
              title="Dedicated IPv4 Plan"
              price="₹449"
              subtitle="Optimized for standard broker API compliance"
              features={[
                'Dedicated static IPv4 address',
                'Up to 20 child accounts supported',
                'Sub-100ms median copy latency',
                'All segments: Equity, F&O, Commodity, Currency',
                'Live dashboard & microsecond audit logs',
                'Multi-broker cross replication',
                '7-Day risk-free trial',
              ]}
            />

            <PricingCard
              title="Dedicated IPv6 Plan"
              price="₹399"
              subtitle="Next-generation IP routing with lowest jitter"
              popular={true}
              features={[
                'Dedicated static IPv6 address',
                'Priority execution queue & rate limits',
                'Up to 20 child accounts supported',
                'Sub-100ms median copy latency',
                'All segments: Equity, F&O, Commodity, Currency',
                'Live dashboard & microsecond audit logs',
                'Multi-broker cross replication',
                '7-Day risk-free trial',
              ]}
            />
          </div>

          <div class="mt-8 text-xs text-brand-muted max-w-lg mx-auto">
            * 18% GST applicable. Master and Child accounts are billed on individual static IP slots. Includes 24/7 technical monitoring.
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" class="py-24 px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-16">
            <div class="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-2">Got Questions?</div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div class="space-y-4">
            <details class="group bg-brand-surface border border-brand-border rounded-xl p-6 transition">
              <summary class="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                <span>Which Indian brokers are currently supported?</span>
                <span class="text-brand-accent group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-4 text-sm text-brand-muted leading-relaxed">
                EnvoyTrade currently features production-ready live integration for Zerodha Kite Connect v4, with Angel One SmartAPI, FYERS API v3, Dhan HQ, and Upstox integration ready. Cross-broker replication is architected into the core engine.
              </p>
            </details>

            <details class="group bg-brand-surface border border-brand-border rounded-xl p-6 transition">
              <summary class="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                <span>Do you store my broker password or have access to funds?</span>
                <span class="text-brand-accent group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-4 text-sm text-brand-muted leading-relaxed">
                Never. EnvoyTrade connects solely through official OAuth-based broker APIs using tokens. We never store your broker login password, PIN, or TOTP secrets, and have zero technical capability to withdraw or transfer client funds.
              </p>
            </details>

            <details class="group bg-brand-surface border border-brand-border rounded-xl p-6 transition">
              <summary class="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                <span>How does the 7-day free trial work?</span>
                <span class="text-brand-accent group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-4 text-sm text-brand-muted leading-relaxed">
                Connect with our team via WhatsApp to activate your dedicated static IP and test account. You receive full access for 7 market trading days with zero credit card required.
              </p>
            </details>

            <details class="group bg-brand-surface border border-brand-border rounded-xl p-6 transition">
              <summary class="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                <span>Does EnvoyTrade provide buy/sell calls or tips?</span>
                <span class="text-brand-accent group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p class="mt-4 text-sm text-brand-muted leading-relaxed">
                No. EnvoyTrade is strictly a technology software tool. We are not a SEBI-registered advisor and do not offer investment or trading recommendations. You are entirely in charge of what trades you execute.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section class="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-transparent to-brand-surface/40 border-t border-brand-border">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Ready to Scale Your Multi-Account Trading?
          </h2>
          <p class="text-base sm:text-lg text-brand-muted mb-10 max-w-xl mx-auto">
            Experience sub-100ms replication across your broker accounts today. Free 7-day trial with full support.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-bold px-10 py-4 rounded-xl text-lg shadow-lg shadow-brand-accent/25 transition flex items-center justify-center gap-2.5"
            >
              <WhatsAppIcon size={20} />
              <span>Start Free Trial on WhatsApp</span>
            </a>
            <a
              href={getRelativePath('contact/', false)}
              class="w-full sm:w-auto bg-brand-surface hover:bg-brand-surface-light border border-brand-border text-white px-8 py-4 rounded-xl text-lg transition"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      {/* Floating Brokers Window Modal */}
      <BrokersModal
        open={brokersModalOpen()}
        onClose={() => setBrokersModalOpen(false)}
      />
    </div>
  )
}
