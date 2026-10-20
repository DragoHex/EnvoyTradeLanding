import { Show, For } from 'solid-js'
import { useEscapeKey } from '../utils/useEscapeKey'
import {
  KiteLogo,
  AngelOneLogo,
  FyersLogo,
  DhanLogo,
  UpstoxLogo,
  GrowwLogo,
  KotakNeoLogo,
} from './BrokerLogo'
import { WhatsAppIcon } from './WhatsAppIcon'
import { SITE_CONFIG } from '../config/site'

export interface BrokersModalProps {
  open: boolean
  onClose: () => void
}

export function BrokersModal(props: BrokersModalProps) {
  useEscapeKey({
    enabled: () => props.open,
    onEscape: props.onClose,
  })

  const brokers = [
    {
      id: 'kite',
      name: 'Zerodha Kite',
      status: 'Live & Active',
      statusClass: 'text-brand-accent bg-brand-accent/10 border-brand-accent/30',
      logo: () => <KiteLogo size={22} />,
    },
    {
      id: 'angelone',
      name: 'Angel One',
      status: 'Integration Ready',
      statusClass: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      logo: () => <AngelOneLogo size={22} />,
    },
    {
      id: 'fyers',
      name: 'FYERS',
      status: 'Integration Ready',
      statusClass: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      logo: () => <FyersLogo size={22} />,
    },
    {
      id: 'dhan',
      name: 'Dhan',
      status: 'Integration Ready',
      statusClass: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      logo: () => <DhanLogo size={22} />,
    },
    {
      id: 'upstox',
      name: 'Upstox',
      status: 'Integration Ready',
      statusClass: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      logo: () => <UpstoxLogo size={22} />,
    },
    {
      id: 'groww',
      name: 'Groww',
      status: 'Integration Ready',
      statusClass: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      logo: () => <GrowwLogo size={22} />,
    },
    {
      id: 'kotak',
      name: 'Kotak Neo',
      status: 'Integration Ready',
      statusClass: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      logo: () => <KotakNeoLogo size={22} />,
    },
  ]

  return (
    <Show when={props.open}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Supported Brokers"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in"
        onClick={(e) => {
          if (e.target === e.currentTarget) props.onClose()
        }}
      >
        <div
          class="relative w-full max-w-lg bg-brand-surface border border-brand-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div class="flex items-center justify-between p-6 border-b border-brand-border bg-brand-surface">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-bold text-white">Supported Brokers</h3>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-brand-accent font-semibold">
                  7 Brokers
                </span>
              </div>
              <p class="text-xs text-brand-muted mt-1">
                Direct broker API connectivity with dedicated static IP proxies and lot sizing.
              </p>
            </div>
            <button
              type="button"
              onClick={props.onClose}
              class="w-8 h-8 rounded-lg bg-brand-surface-light border border-brand-border hover:border-brand-accent/40 text-brand-muted hover:text-white flex items-center justify-center transition"
              title="Close (Esc)"
              aria-label="Close modal"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Broker List Body */}
          <div class="p-6 overflow-y-auto divide-y divide-brand-border/40">
            <For each={brokers}>
              {(broker) => (
                <div class="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div class="flex items-center gap-3.5">
                    <div class="shrink-0 flex items-center">{broker.logo()}</div>
                    <span class="text-sm font-semibold text-white tracking-wide">{broker.name}</span>
                  </div>
                  <span class={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${broker.statusClass}`}>
                    {broker.status}
                  </span>
                </div>
              )}
            </For>
          </div>

          {/* Footer */}
          <div class="p-4 sm:p-5 border-t border-brand-border bg-brand-surface-light/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span class="text-brand-muted text-center sm:text-left">
              Need another broker? Talk to our core engineering team.
            </span>
            <div class="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold px-3.5 py-2 rounded-lg transition whitespace-nowrap"
              >
                <WhatsAppIcon size={14} class="shrink-0" />
                <span class="whitespace-nowrap">Request Integration</span>
              </a>
              <button
                type="button"
                onClick={props.onClose}
                class="px-3.5 py-2 rounded-lg bg-brand-surface border border-brand-border hover:border-brand-muted text-white font-medium transition shrink-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  )
}
