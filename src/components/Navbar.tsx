import { createSignal } from 'solid-js'
import { EnvoyLogo } from './EnvoyLogo'
import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '../context/theme'
import { SITE_CONFIG, getRelativePath, isHomePage, isCurrentPage } from '../config/site'

export interface NavbarProps {
  isSubpage?: boolean
}

export function Navbar(props: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false)
  const isSub = () => props.isSubpage ?? false
  const { isDark, toggleTheme } = useTheme()

  const handleLinkClick = (e: MouseEvent, target: string) => {
    const isHome = isHomePage()

    // 1. Anchor targets (e.g. #features, #how, #pricing, #faq, #contact-support)
    if (target.startsWith('#')) {
      if (isHome) {
        // Already on home page: smooth scroll to element without page reload
        e.preventDefault()
        const id = target.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          try {
            history.replaceState(null, '', target)
          } catch {}
        }
        setMobileMenuOpen(false)
        return
      }
      // On another page: let the browser navigate normally to the home page URL with anchor
      setMobileMenuOpen(false)
      return
    }

    // 2. Logo / Home link
    if (target === '') {
      if (isHome) {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        try {
          history.replaceState(null, '', window.location.pathname)
        } catch {}
        setMobileMenuOpen(false)
        return
      }
    }

    // 3. Subpage links (e.g. docs/, brokers/)
    if (isCurrentPage(target)) {
      // Already on this page: smooth scroll to top, prevent reload & flicker
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setMobileMenuOpen(false)
      return
    }

    setMobileMenuOpen(false)
  }

  return (
    <header class="fixed top-0 left-0 right-0 w-full bg-brand-dark/85 backdrop-blur-md border-b border-brand-border/80 z-50 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo & text link back to Home */}
        <a
          href={getRelativePath('', isSub())}
          onClick={(e) => handleLinkClick(e, '')}
          class="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg p-1"
          title="EnvoyTrade - Return to Home"
        >
          <EnvoyLogo size={30} class="transition-transform group-hover:scale-105 duration-200" />
          <span class="text-xl font-bold tracking-tight text-white group-hover:text-brand-accent-hover transition-colors">
            {SITE_CONFIG.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-brand-muted">
          {SITE_CONFIG.navLinks.map((link) => (
            <a
              href={getRelativePath(link.target, isSub())}
              onClick={(e) => handleLinkClick(e, link.target)}
              class="hover:text-brand-accent-hover hover:scale-105 transition duration-150 ease-out cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Theme Toggle + Sign In */}
        <div class="hidden md:flex items-center gap-4">
          <ThemeToggle dark={isDark()} onToggle={toggleTheme} />
          <a
            href={SITE_CONFIG.loginUrl}
            class="inline-flex items-center justify-center bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold px-4 py-2 rounded-lg text-sm shadow-sm hover:shadow-brand-accent/20 hover:shadow-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            Sign In
          </a>
        </div>

        {/* Mobile Header Bar: Theme Toggle + Sign In + Menu Button */}
        <div class="flex md:hidden items-center gap-2.5">
          <ThemeToggle dark={isDark()} onToggle={toggleTheme} />
          <a
            href={SITE_CONFIG.loginUrl}
            class="bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold px-3 py-1.5 rounded-md text-xs transition"
          >
            Sign In
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen())}
            class="text-brand-muted hover:text-brand-light p-2 rounded-md focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen() ? (
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        class={`md:hidden bg-brand-surface border-b border-brand-border px-4 pt-3 pb-6 space-y-2 ${
          mobileMenuOpen() ? 'block' : 'hidden'
        }`}
      >
        {SITE_CONFIG.navLinks.map((link) => (
          <a
            href={getRelativePath(link.target, isSub())}
            onClick={(e) => handleLinkClick(e, link.target)}
            class="block px-3 py-2 rounded-md text-base font-medium text-brand-light hover:text-brand-accent hover:bg-brand-dark/50 cursor-pointer"
          >
            {link.label}
          </a>
        ))}
        <div class="pt-4 border-t border-brand-border">
          <a
            href={SITE_CONFIG.loginUrl}
            class="w-full flex items-center justify-center bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-semibold px-4 py-2.5 rounded-lg text-sm"
          >
            Sign In to Dashboard
          </a>
        </div>
      </div>
    </header>
  )
}
