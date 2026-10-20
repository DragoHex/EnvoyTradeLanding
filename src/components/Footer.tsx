import { EnvoyLogo } from './EnvoyLogo'
import { WhatsAppIcon } from './WhatsAppIcon'
import { SITE_CONFIG, getRelativePath, isCurrentPage } from '../config/site'

export interface FooterProps {
  isSubpage?: boolean
}

export function Footer(props: FooterProps) {
  const isSub = () => props.isSubpage ?? false

  const handleLinkClick = (e: MouseEvent, target: string) => {
    const isHome = !isSub()

    // 1. Logo / Home link
    if (target === '') {
      if (isHome) {
        // Already on home page: smooth scroll to top, zero reload
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        try {
          history.replaceState(null, '', window.location.pathname)
        } catch {}
        return
      }
      // On a subpage: navigate cleanly back to home page
      e.preventDefault()
      window.location.href = getRelativePath('', true)
      return
    }

    // 2. Anchor targets on home page
    if (target.startsWith('#')) {
      if (isHome) {
        e.preventDefault()
        const id = target.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          try {
            history.replaceState(null, '', target)
          } catch {}
        }
        return
      }
      // On another page: navigate cleanly to the home page URL with anchor
      e.preventDefault()
      window.location.href = getRelativePath(target, true)
      return
    }

    // 3. Subpage links (e.g. docs/, brokers/, setup-guide/)
    if (isCurrentPage(target)) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
  }

  return (
    <footer id="footer" class="border-t border-brand-border bg-brand-surface/40 pt-16 pb-12 text-sm text-brand-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div class="md:col-span-1 space-y-4">
            <a
              href={getRelativePath('', isSub())}
              onClick={(e) => handleLinkClick(e, '')}
              class="flex items-center gap-2.5 cursor-pointer"
            >
              <EnvoyLogo size={26} />
              <span class="text-lg font-bold text-white tracking-tight">{SITE_CONFIG.name}</span>
            </a>
            <p class="text-xs text-brand-muted leading-relaxed">
              Ultra-low latency trade replication platform for multi-account traders across premier Indian brokerages.
            </p>
            <div class="flex items-center gap-3 pt-2">
              {/* X / Twitter Link */}
              <a
                href={SITE_CONFIG.twitter}
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-light hover:text-brand-accent hover:border-brand-accent/40 transition"
                title="Follow on X (Twitter)"
                aria-label="X Twitter"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* WhatsApp Link */}
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-light hover:text-brand-accent hover:border-brand-accent/40 transition"
                title="Chat on WhatsApp"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={16} />
              </a>
              {/* Mail Link */}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                class="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-light hover:text-brand-accent hover:border-brand-accent/40 transition"
                title="Send Email"
                aria-label="Email"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-white mb-4">Platform</h4>
            <ul class="space-y-2.5">
              <li><a href={getRelativePath('#features', isSub())} onClick={(e) => handleLinkClick(e, '#features')} class="hover:text-brand-accent transition cursor-pointer">Features</a></li>
              <li><a href={getRelativePath('#brokers', isSub())} onClick={(e) => handleLinkClick(e, '#brokers')} class="hover:text-brand-accent transition cursor-pointer">Broker Matrix</a></li>
              <li><a href={getRelativePath('#how', isSub())} onClick={(e) => handleLinkClick(e, '#how')} class="hover:text-brand-accent transition cursor-pointer">How it Works</a></li>
              <li><a href={getRelativePath('setup-guide/', isSub())} onClick={(e) => handleLinkClick(e, 'setup-guide/')} class="hover:text-brand-accent transition cursor-pointer">Setup Guide</a></li>
              <li><a href={getRelativePath('docs/', isSub())} onClick={(e) => handleLinkClick(e, 'docs/')} class="hover:text-brand-accent transition cursor-pointer">Documentation</a></li>
              <li><a href={getRelativePath('#pricing', isSub())} onClick={(e) => handleLinkClick(e, '#pricing')} class="hover:text-brand-accent transition cursor-pointer">Pricing Plans</a></li>
              <li><a href={getRelativePath('#faq', isSub())} onClick={(e) => handleLinkClick(e, '#faq')} class="hover:text-brand-accent transition cursor-pointer">FAQ</a></li>
            </ul>
          </div>

          {/* Direct Support */}
          <div id="contact-support" class="scroll-mt-20">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-white mb-4">Support & Contact</h4>
            <ul class="space-y-2.5">
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} class="hover:text-brand-accent transition flex items-center gap-2">
                  <svg class="w-3.5 h-3.5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" class="hover:text-brand-accent transition flex items-center gap-2">
                  <WhatsAppIcon size={14} class="text-brand-accent" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.twitter} target="_blank" rel="noopener noreferrer" class="hover:text-brand-accent transition flex items-center gap-2">
                  <svg class="w-3.5 h-3.5 text-brand-accent fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>{SITE_CONFIG.twitterHandle}</span>
                </a>
              </li>
              <li>
                <a href={getRelativePath('contact/', isSub())} class="hover:text-brand-accent transition text-brand-accent font-medium mt-1 inline-block">
                  Support Helpdesk & Form &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-white mb-4">Legal & Regulatory</h4>
            <ul class="space-y-2.5">
              {SITE_CONFIG.legalLinks.map((item) => (
                <li>
                  <a href={getRelativePath(item.target, isSub())} class="hover:text-brand-accent transition">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulatory SEBI Risk Disclaimer */}
        <div class="border-t border-brand-border pt-8 text-xs leading-relaxed text-brand-muted/80 space-y-3">
          <p>
            <strong class="text-brand-light">Mandatory Regulatory Disclaimer:</strong> EnvoyTrade is a pure technology service provider and software automation tool. EnvoyTrade is NOT registered with SEBI as an Investment Adviser (IA), Research Analyst (RA), or Portfolio Manager (PMS). We do not provide trading recommendations, buy/sell tips, or financial planning advice.
          </p>
          <p>
            <strong>SEBI Risk Disclosure on Derivatives:</strong> 9 out of 10 individual traders in equity Futures and Options (F&O) segment incur net financial losses. Over and above net losses, active traders incur substantial brokerage and transaction costs. All trading carries inherent market, execution, slippage, and connectivity risks. Past simulated or actual performance is no guarantee of future returns. You remain 100% responsible for your trading strategies, position sizing, and legal compliance.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-brand-border/60 text-xs">
            <p>&copy; {new Date().getFullYear()} EnvoyTrade. All rights reserved.</p>
            <p class="mt-2 sm:mt-0 text-brand-muted/70">Engineered for Indian Derivative Markets</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
