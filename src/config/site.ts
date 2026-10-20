export const SITE_CONFIG = {
  name: 'EnvoyTrade',
  tagline: 'Fast Trade Copier for Indian Brokers',
  description: 'Copy trades from one master account to child accounts across Zerodha, Angel One, FYERS, Dhan, and Upstox with sub-300ms latency, flexible lot multipliers, and dedicated static IP.',
  loginUrl: 'https://app.envoytrade.in/login',
  whatsappUrl: 'https://wa.me/919549156751',
  phone: '+91-9549156751',
  email: 'myenvoytrade@gmail.com',
  twitter: 'https://x.com/myenvoytrade',
  twitterHandle: 'myenvoytrade',
  navLinks: [
    { label: 'Features', target: '#features' },
    { label: 'Brokers', target: 'brokers/' },
    { label: 'How it Works', target: '#how' },
    { label: 'Docs', target: 'docs/' },
    { label: 'Pricing', target: '#pricing' },
    { label: 'FAQ', target: '#faq' },
    { label: 'Contact', target: '#contact-support' },
  ],
  legalLinks: [
    { label: 'Risk Disclosure', target: 'risk-disclosure/' },
    { label: 'Terms of Service', target: 'terms/' },
    { label: 'Privacy Policy', target: 'privacy/' },
    { label: 'Refund Policy', target: 'refund/' },
  ],
}

/**
 * Checks whether the user is currently on the home page.
 */
export function isHomePage(): boolean {
  if (typeof window === 'undefined') return true
  const path = window.location.pathname.replace(/\/+$/, '')
  if (window.location.hostname.endsWith('github.io')) {
    const parts = path.split('/').filter(Boolean)
    return parts.length <= 1 // root or /EnvoyTradeLanding
  }
  return path === '' || path === '/index.html'
}

/**
 * Checks whether the current page already matches the target link.
 */
export function isCurrentPage(target: string): boolean {
  if (typeof window === 'undefined') return false
  const path = window.location.pathname.replace(/\/+$/, '')
  const clean = target.replace(/^\/+/, '').replace(/\/+$/, '')

  // Target is home
  if (clean === '') {
    return isHomePage()
  }

  // Target is anchor on home page
  if (clean.startsWith('#')) {
    return isHomePage()
  }

  // Target is a subpage (e.g. 'docs', 'brokers', 'setup-guide')
  return path.endsWith('/' + clean) || path === '/' + clean
}

/**
 * Returns a bulletproof URL that works seamlessly whether
 * hosted at domain root, on a GitHub Pages repo subpath, viewed locally,
 * or served through static file servers.
 */
export function getRelativePath(target: string, isSubpage?: boolean): string {
  if (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('mailto:')) {
    return target
  }

  const sub = isSubpage !== undefined ? isSubpage : !isHomePage()

  let basePrefix = ''
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
    const parts = window.location.pathname.split('/').filter(Boolean)
    if (parts.length > 0) {
      basePrefix = '/' + parts[0]
    }
  }

  const clean = target.replace(/^\/+/, '')

  // Empty target returns to site home
  if (clean === '') {
    return basePrefix ? `${basePrefix}/` : '/'
  }

  // Anchor target on same page or across pages
  if (clean.startsWith('#')) {
    if (!sub) {
      return clean
    } else {
      return basePrefix ? `${basePrefix}/${clean}` : `/${clean}`
    }
  }

  // Page targets (e.g. docs/, setup-guide/, brokers/, contact/)
  const cleanTarget = clean.endsWith('/') ? clean : `${clean}/`
  return basePrefix ? `${basePrefix}/${cleanTarget}` : `/${cleanTarget}`
}
