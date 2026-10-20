import { SITE_CONFIG } from '../config/site'
import { WhatsAppIcon } from './WhatsAppIcon'

interface PricingCardProps {
  title: string
  price: string
  subtitle: string
  popular?: boolean
  features: string[]
  ctaText?: string
  ctaHref?: string
}

export function PricingCard(props: PricingCardProps) {
  const ctaLink = () => props.ctaHref ?? `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(`Hi EnvoyTrade team, I want to start a 7-day free trial for ${props.title}`)}`

  return (
    <div
      class={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 ${
        props.popular
          ? 'bg-brand-surface border-2 border-brand-accent shadow-xl shadow-brand-accent/10'
          : 'bg-brand-surface/70 border border-brand-border hover:border-brand-accent/40'
      }`}
    >
      {props.popular && (
        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
          Most Popular
        </div>
      )}

      <div>
        <div class="text-brand-accent font-semibold text-lg mb-2">{props.title}</div>
        <div class="flex items-baseline gap-1 mb-1">
          <span class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{props.price}</span>
          <span class="text-sm text-brand-muted">+ GST / month</span>
        </div>
        <div class="text-xs text-brand-muted/80 mb-6">{props.subtitle}</div>

        <div class="border-t border-brand-border/80 pt-6 mb-8">
          <p class="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-4">Included with plan:</p>
          <ul class="space-y-3.5 text-sm text-brand-light">
            {props.features.map((feat) => (
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-brand-accent shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <a
          href={ctaLink()}
          target="_blank"
          rel="noopener noreferrer"
          class={`w-full flex items-center justify-center gap-2 text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all shadow-sm ${
            props.popular
              ? 'bg-brand-accent hover:bg-brand-accent-hover text-brand-dark shadow-brand-accent/25 hover:shadow-lg'
              : 'bg-brand-surface-light hover:bg-brand-accent hover:text-brand-dark text-white border border-brand-border hover:border-transparent'
          }`}
        >
          <WhatsAppIcon size={16} />
          <span>{props.ctaText ?? 'Start 7-Day Free Trial'}</span>
        </a>
      </div>
    </div>
  )
}
