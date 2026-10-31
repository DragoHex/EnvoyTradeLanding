import { Show } from 'solid-js'
import {
  KiteLogo,
  AngelOneLogo,
  FyersLogo,
  DhanLogo,
  UpstoxLogo,
  GrowwLogo,
  KotakNeoLogo,
} from '../components/BrokerLogo'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { SITE_CONFIG, getRelativePath } from '../config/site'

export function BrokersPage() {
  const brokers = [
    {
      name: 'Zerodha Kite',
      badge: 'Tier 1 Certified',
      status: 'Live & Active',
      statusColor: 'text-brand-accent bg-brand-accent/10 border-brand-accent/30',
      logo: () => <KiteLogo size={24} />,
      latency: '80 - 120 ms',
      authMethod: 'OAuth 2.0 / API Key + Secret + Request Token',
      postbackSupport: 'Real-time HTTP Webhook with SHA-256 Checksum',
      tickerSupport: 'WebSocket Master Ticker stream',
      segments: ['NSE Cash', 'BSE Cash', 'NFO (Futures & Options)', 'BFO', 'MCX'],
      description: 'Full dual-path ingestion: Kite postback webhooks deliver terminal order fills while WebSocket ticker acts as a fast path. Supports per-account static proxy egress.',
    },
    {
      name: 'Dhan',
      badge: 'Live',
      status: 'Production Live',
      statusColor: 'text-brand-accent bg-brand-accent/10 border-brand-accent/30',
      logo: () => <DhanLogo size={22} />,
      latency: '95 - 160 ms',
      authMethod: 'Client ID + Access Token',
      postbackSupport: 'Real-time Postback Webhooks',
      tickerSupport: 'Dhan Live Market Feed',
      segments: ['Equity Cash', 'NSE F&O', 'BSE F&O', 'MCX Commodities'],
      description: 'High-speed REST API endpoints with webhook confirmation. Perfect for both master trader signal broadcasting and child execution.',
    },
    {
      name: 'Kotak Neo',
      badge: 'Live',
      status: 'Production Live',
      statusColor: 'text-brand-accent bg-brand-accent/10 border-brand-accent/30',
      logo: () => <KotakNeoLogo size={22} />,
      latency: '100 - 175 ms',
      authMethod: 'Consumer Key + Mobile / MPIN / TOTP',
      postbackSupport: 'Real-Time WebSocket Stream & REST Recon',
      tickerSupport: 'Neo Realtime Socket',
      segments: ['NSE Cash', 'BSE Cash', 'NSE Derivatives', 'BSE Derivatives', 'MCX'],
      description: 'High-performance Kotak Neo API connectivity. Dedicated proxy egress, token session renewal, and automated multiplier lot sizing.',
    },
    {
      name: 'Angel One',
      badge: 'Integration Ready',
      status: 'Integration Ready',
      statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      logo: () => <AngelOneLogo size={24} />,
      latency: '110 - 180 ms',
      authMethod: 'Client Code + Password + TOTP Secret',
      postbackSupport: 'SmartAPI Webhook Event Stream',
      tickerSupport: 'WebSocket Order Status Channel',
      segments: ['NSE Equity', 'BSE Equity', 'NFO Derivatives', 'MCX'],
      description: 'Direct order placement using SmartAPI SDK with automated TOTP session initialization and static IP proxy binding.',
    },
    {
      name: 'FYERS',
      badge: 'Integration Ready',
      status: 'Integration Ready',
      statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      logo: () => <FyersLogo size={24} />,
      latency: '100 - 175 ms',
      authMethod: 'App ID + Secret Key + Access Token',
      postbackSupport: 'Order Webhook Callbacks',
      tickerSupport: 'FYERS Realtime Socket',
      segments: ['Capital Market', 'Futures & Options', 'Commodities'],
      description: 'Ultra-lean REST v3 order dispatch. Handles token translation and exchange lot sizing automatically between Fyers and other brokers.',
    },
    {
      name: 'Upstox',
      badge: 'Integration Ready',
      status: 'Integration Ready',
      statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      logo: () => <UpstoxLogo size={22} />,
      latency: '120 - 200 ms',
      authMethod: 'API Key + API Secret + OAuth Redirect',
      postbackSupport: 'Webhook Notifications',
      tickerSupport: 'Protobuf WebSocket Stream',
      segments: ['NSE Cash', 'NFO Futures & Options', 'BSE', 'MCX'],
      description: 'Supports Upstox v2 API with token persistence, automated lot sizing, and multi-tenant isolation.',
    },
    {
      name: 'Groww',
      badge: 'Integration Ready',
      status: 'Integration Ready',
      statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      logo: () => <GrowwLogo size={22} />,
      latency: '110 - 180 ms',
      authMethod: 'API Key + OAuth / TOTP Credentials',
      postbackSupport: 'Real-time Webhook Order Postback',
      tickerSupport: 'WebSocket Order Updates',
      segments: ['NSE Equity', 'BSE Equity', 'NSE F&O'],
      description: 'Streamlined integration for Groww trading accounts. Automated token refresh and lot-sized fan-out copying for retail and algorithmic traders.',
    },
  ]

  return (
    <div class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-accent text-xs font-semibold uppercase tracking-wider mb-4">
          Broker Compatibility Matrix
        </div>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Cross-Broker Multi-Account Replication
        </h1>
        <p class="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
          EnvoyTrade abstracts the underlying broker differences. Trade on your favorite master account (e.g. Zerodha) and automatically copy to child accounts regardless of their broker.
        </p>
      </div>

      {/* Broker Cards Grid */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {brokers.map((b) => (
          <div class="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between glass-card-hover">
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  {b.logo()}
                  <h2 class="text-xl font-bold text-white">{b.name}</h2>
                </div>
                <span class={`text-xs font-semibold px-2.5 py-1 rounded-full border ${b.statusColor}`}>
                  {b.status}
                </span>
              </div>

              <p class="text-sm text-brand-muted mb-6 leading-relaxed">
                {b.description}
              </p>

              <div class="border-t border-brand-border pt-4 space-y-2.5 text-xs">
                <div class="flex justify-between py-1 border-b border-brand-border/40">
                  <span class="text-brand-muted">Median Execution Latency</span>
                  <span class="font-mono text-brand-accent font-semibold">{b.latency}</span>
                </div>
                <div class="flex justify-between py-1 border-b border-brand-border/40">
                  <span class="text-brand-muted">Authentication</span>
                  <span class="text-brand-light font-medium">{b.authMethod}</span>
                </div>
                <div class="flex justify-between py-1 border-b border-brand-border/40">
                  <span class="text-brand-muted">Postback Ingestion</span>
                  <span class="text-brand-light font-medium">{b.postbackSupport}</span>
                </div>
                <div class="flex justify-between py-1 border-b border-brand-border/40">
                  <span class="text-brand-muted">Market / Order Ticker</span>
                  <span class="text-brand-light font-medium">{b.tickerSupport}</span>
                </div>
                <div class="py-2">
                  <span class="text-brand-muted block mb-1.5">Supported Segments</span>
                  <div class="flex flex-wrap gap-1.5">
                    {b.segments.map((seg) => (
                      <span class="bg-brand-dark px-2 py-0.5 rounded text-xs text-brand-light border border-brand-border/80">
                        {seg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-brand-border flex items-center justify-between">
              <span class="text-xs text-brand-muted">Includes Dedicated Static IP</span>
              <Show when={b.status !== 'Live & Active'}>
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-xs font-semibold text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-1.5"
                >
                  <WhatsAppIcon size={13} />
                  <span>Connect {b.name.split(' ')[0]} &rarr;</span>
                </a>
              </Show>
            </div>
          </div>
        ))}
      </div>

      {/* Static IP Whitelisting Architecture Callout */}
      <div class="bg-gradient-to-r from-brand-surface to-brand-surface-light border border-brand-border rounded-2xl p-8 sm:p-10 mb-16">
        <div class="max-w-3xl">
          <div class="inline-block text-xs font-semibold uppercase tracking-wider text-brand-accent mb-2">
            Security & Exchange Compliance
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-white mb-4">
            Why Dedicated Static IP Egress is Essential
          </h3>
          <p class="text-sm text-brand-muted leading-relaxed mb-4">
            Leading Indian brokerages mandate or strongly recommend static IP whitelisting for automated trading endpoints. Shared public IP addresses or dynamic cloud IPs frequently trigger rate limits, temporary account suspensions, or security blocks.
          </p>
          <ul class="space-y-2 text-sm text-brand-light mb-6">
            <li class="flex items-center gap-2">
              <span class="text-brand-accent font-bold">&#10003;</span>
              <strong>Per-Account IP Isolation:</strong> Every master and follower account receives a dedicated static IP address.
            </li>
            <li class="flex items-center gap-2">
              <span class="text-brand-accent font-bold">&#10003;</span>
              <strong>Zero IP Flagging:</strong> Eliminates cross-account IP contamination across broker risk engines.
            </li>
            <li class="flex items-center gap-2">
              <span class="text-brand-accent font-bold">&#10003;</span>
              <strong>High Throughput:</strong> Configured for high-frequency order dispatch (~10 orders/s per account).
            </li>
          </ul>
          <a
            href={getRelativePath('docs/', true)}
            class="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold px-6 py-2.5 rounded-xl text-sm transition"
          >
            Read API Whitelisting Setup Guide &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
