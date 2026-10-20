import { SITE_CONFIG } from '../config/site'
import { WhatsAppIcon } from '../components/WhatsAppIcon'

export function RefundPage() {
  return (
    <div class="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div class="mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-accent text-xs font-semibold uppercase tracking-wider mb-3">
          Billing &amp; Subscriptions
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Refund &amp; Cancellation Policy
        </h1>
        <p class="mt-3 text-sm text-brand-muted">
          Last Updated: October 2026 &bull; Fair &amp; Transparent Billing
        </p>
      </div>

      <div class="space-y-8 text-sm leading-relaxed text-brand-muted">
        <section class="bg-brand-surface border border-brand-border rounded-xl p-6 space-y-4">
          <h2 class="text-xl font-bold text-white">1. 7-Day Free Trial Policy</h2>
          <p>
            We offer every trader an unrestricted <strong>7-Day Free Trial</strong> covering full trade replication and live dashboard analytics. No credit card or advance fee is collected during your trial period.
          </p>
          <p>
            If you decide EnvoyTrade does not fit your trading workflow, you may simply let your trial lapse with zero obligation.
          </p>
        </section>

        <section class="bg-brand-surface border border-brand-border rounded-xl p-6 space-y-4">
          <h2 class="text-xl font-bold text-white">2. Subscription Billing &amp; Static IP Allocation</h2>
          <p>
            EnvoyTrade operates on a monthly subscription model (₹399 + GST for IPv4, ₹449 + GST for IPv6 per active account slot). Because each subscription activates a dedicated static IPv4 or IPv6 cloud proxy specifically reserved for your broker accounts, infrastructure costs are incurred immediately upon slot provisioning.
          </p>
        </section>

        <section class="bg-brand-surface border border-brand-border rounded-xl p-6 space-y-4">
          <h2 class="text-xl font-bold text-white">3. Cancellation Guidelines</h2>
          <p>
            You may cancel your monthly subscription at any time:
          </p>
          <ul class="list-disc list-inside space-y-2 text-xs">
            <li>Notify us via WhatsApp at <a href={SITE_CONFIG.whatsappUrl} class="text-brand-accent underline inline-flex items-center gap-1"><WhatsAppIcon size={12} /> {SITE_CONFIG.phone}</a> or email at <a href={`mailto:${SITE_CONFIG.email}`} class="text-brand-accent underline">{SITE_CONFIG.email}</a> at least 24 hours prior to your monthly renewal date.</li>
            <li>Upon cancellation, your trade copier service remains active until the end of your current paid billing period, after which static IP proxies are de-provisioned and no further charges will occur.</li>
          </ul>
        </section>

        <section class="bg-brand-surface border border-brand-border rounded-xl p-6 space-y-4">
          <h2 class="text-xl font-bold text-white">4. Refund Eligibility</h2>
          <p>
            Because dedicated static IPs are provisioned and reserved upfront, completed monthly subscription payments are generally non-refundable once the billing cycle begins.
          </p>
          <p>
            <strong>Exceptions:</strong> In the rare event that a prolonged platform outage or technical defect directly attributable to EnvoyTrade prevents order replication for more than 48 continuous market trading hours, you may request a pro-rated refund or account credit by writing to our billing desk.
          </p>
        </section>
      </div>
    </div>
  )
}
