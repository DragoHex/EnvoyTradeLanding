import { createSignal } from 'solid-js'
import { SITE_CONFIG } from '../config/site'
import { WhatsAppIcon } from '../components/WhatsAppIcon'

export function ContactPage() {
  const [submitted, setSubmitted] = createSignal(false)
  const [formData, setFormData] = createSignal({
    name: '',
    email: '',
    phone: '',
    broker: 'Zerodha',
    accountsCount: '2-5 Accounts',
    message: '',
  })

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div class="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div class="text-center max-w-2xl mx-auto mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-accent text-xs font-semibold uppercase tracking-wider mb-3">
          Support & Communications
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get in Touch With Us
        </h1>
        <p class="mt-4 text-base sm:text-lg text-brand-muted">
          Have questions about broker integration, static IP setup, or multi-account pricing? We are active during all market trading hours.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Methods Cards */}
        <div class="space-y-6">
          {/* WhatsApp Card */}
          <div class="bg-brand-surface border border-brand-border rounded-2xl p-6 glass-card-hover">
            <div class="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-4">
              <WhatsAppIcon size={22} class="text-brand-accent" />
            </div>
            <h3 class="text-lg font-bold text-white mb-1">WhatsApp Hotline</h3>
            <p class="text-xs text-brand-muted mb-4">Direct technical chat for onboarding & immediate live support.</p>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm font-semibold text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-1.5"
            >
              <span>{SITE_CONFIG.phone}</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* Email Card */}
          <div class="bg-brand-surface border border-brand-border rounded-2xl p-6 glass-card-hover">
            <div class="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-4">
              <svg class="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-1">Email Inquiries</h3>
            <p class="text-xs text-brand-muted mb-4">For corporate accounts, enterprise setups, and billing support.</p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              class="text-sm font-semibold text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-1.5"
            >
              <span>{SITE_CONFIG.email}</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* X / Twitter Card */}
          <div class="bg-brand-surface border border-brand-border rounded-2xl p-6 glass-card-hover">
            <div class="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-4">
              <svg class="w-4 h-4 text-brand-accent fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-1">Connect on X</h3>
            <p class="text-xs text-brand-muted mb-4">Follow system status updates, latency telemetry, and feature announcements.</p>
            <a
              href={SITE_CONFIG.twitter}
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm font-semibold text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-1.5"
            >
              <span>{SITE_CONFIG.twitterHandle}</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* Operating Hours */}
          <div class="p-5 rounded-2xl bg-brand-surface/40 border border-brand-border text-xs text-brand-muted space-y-1.5">
            <div class="text-brand-light font-semibold mb-1">Trading Hours Support SLA:</div>
            <div>Monday – Friday: <strong>8:30 AM – 4:00 PM IST</strong></div>
            <div>Response Time: <strong>&lt;15 Minutes</strong> on <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" class="text-brand-accent hover:underline font-semibold inline-flex items-center gap-1"><WhatsAppIcon size={13} /> WhatsApp</a> during market hours</div>
            <div>Technical Core: 24/7 Automated Infrastructure Uptime</div>
          </div>
        </div>

        {/* Contact Form */}
        <div class="lg:col-span-2 bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-10">
          <h2 class="text-2xl font-bold text-white mb-2">Send us a Message</h2>
          <p class="text-sm text-brand-muted mb-8">
            Tell us about your multi-account requirements, and we'll configure a tailored trial for you.
          </p>

          {submitted() ? (
            <div class="bg-brand-accent/10 border border-brand-accent/30 rounded-xl p-8 text-center space-y-4">
              <div class="w-12 h-12 bg-brand-accent text-brand-dark rounded-full flex items-center justify-center font-bold text-xl mx-auto">
                &#10003;
              </div>
              <h3 class="text-xl font-bold text-white">Thank You for Reaching Out!</h3>
              <p class="text-sm text-brand-muted max-w-md mx-auto">
                Our team has received your inquiry. We typically respond within 15 minutes during active market hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                class="mt-4 px-6 py-2 rounded-lg bg-brand-surface border border-brand-border text-xs font-semibold text-brand-light hover:text-white"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} class="space-y-6 text-sm">
              <div class="grid sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-semibold text-brand-light uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Trader Name"
                    value={formData().name}
                    onInput={(e) => setFormData({ ...formData(), name: e.currentTarget.value })}
                    class="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-brand-light uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData().email}
                    onInput={(e) => setFormData({ ...formData(), email: e.currentTarget.value })}
                    class="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition"
                  />
                </div>
              </div>

              <div class="grid sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-semibold text-brand-light uppercase tracking-wider mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData().phone}
                    onInput={(e) => setFormData({ ...formData(), phone: e.currentTarget.value })}
                    class="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-brand-light uppercase tracking-wider mb-2">
                    Primary Master Broker
                  </label>
                  <select
                    value={formData().broker}
                    onChange={(e) => setFormData({ ...formData(), broker: e.currentTarget.value })}
                    class="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition"
                  >
                    <option value="Zerodha">Zerodha (Kite Connect)</option>
                    <option value="Angel One">Angel One (SmartAPI)</option>
                    <option value="FYERS">FYERS (API v3)</option>
                    <option value="Dhan">Dhan HQ</option>
                    <option value="Upstox">Upstox</option>
                    <option value="Other">Other Broker</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-brand-light uppercase tracking-wider mb-2">
                  Message / Requirements
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell us about the number of child accounts you want to replicate, trading segments, or custom needs..."
                  value={formData().message}
                  onInput={(e) => setFormData({ ...formData(), message: e.currentTarget.value })}
                  class="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition resize-none"
                />
              </div>

              <button
                type="submit"
                class="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-brand-dark font-bold px-8 py-3.5 rounded-xl shadow-md transition"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
