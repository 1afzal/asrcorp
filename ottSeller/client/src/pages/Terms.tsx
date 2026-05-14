import { useSeo } from '../hooks/useSeo';

export default function Terms() {
  useSeo({
    title: 'Terms of Service — Softwaresellr',
    description:
      'Softwaresellr terms of service: refund policy, warranty, device limits, VPN requirements, payment & ordering process.',
    canonical: '/terms',
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
          Terms of <span className="text-muted-foreground">service.</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: April 2026</p>
      </header>

      <article className="glass flex flex-col gap-6 rounded-lg p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
        <section>
          <h2 className="mb-2 text-base font-semibold tracking-tight text-foreground">
            1. About Softwaresellr
          </h2>
          <p>
            Softwaresellr is an independent reseller of software subscriptions. We are{' '}
            <strong className="text-foreground">not</strong> the official service provider of any
            product listed on this website. All brand names, logos, and trademarks belong to their
            respective owners.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold tracking-tight text-foreground">
            2. Refund policy
          </h2>
          <p>
            Due to the digital and activated nature of our products,{' '}
            <strong className="text-foreground">
              no refunds are offered after a subscription has been activated
            </strong>
            . If an activation fails on our side before credentials are delivered, a full refund
            will be issued to the original payment method within 7 business days.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold tracking-tight text-foreground">
            3. Warranty
          </h2>
          <p>
            Each product includes a warranty period (shown on its product page). The warranty
            covers <strong className="text-foreground">account replacement only</strong> if the
            subscription stops working through no fault of the customer. It does not cover:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5">
            <li>
              Account bans caused by abuse, spam, or policy violations on the provider's side.
            </li>
            <li>Loss of access due to changing login credentials without informing us.</li>
            <li>Issues caused by logging in from excessive devices or locations.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold tracking-tight text-foreground">
            4. Email & account restrictions
          </h2>
          <p>
            For certain products, the customer email provided at checkout is permanently bound to
            the subscription.{' '}
            <strong className="text-foreground">
              Email changes after activation are not allowed
            </strong>{' '}
            for those products. Check each product page for restrictions before ordering.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold tracking-tight text-foreground">
            5. Device limits
          </h2>
          <p>
            Some subscriptions are limited to a specific number of simultaneous logins or devices
            (e.g. Filmora 15 Pro: 1 device; CapCut Pro: 3 devices). Exceeding these limits may
            cause the account to be temporarily blocked or permanently disabled. Softwaresellr is not
            responsible for losses caused by exceeding device limits.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold tracking-tight text-foreground">
            6. VPN requirement
          </h2>
          <p>
            A VPN is required to use <strong className="text-foreground">CapCut Pro</strong> in
            India. Customers are responsible for acquiring and configuring their own VPN. Softwaresellr
            does not provide VPN services.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold tracking-tight text-foreground">
            7. Delivery time
          </h2>
          <p>
            Most orders are delivered within 15–30 minutes after successful payment. Complex
            activations (those requiring OTP or verification link exchange) may take up to 24
            hours. If your order is delayed beyond this window, contact us via WhatsApp or
            Telegram.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold tracking-tight text-foreground">
            8. Acceptable use
          </h2>
          <p>
            You agree to use the subscriptions purchased from Softwaresellr in compliance with each
            provider's official terms of service. Sharing credentials publicly, reselling, or
            automated misuse may result in loss of access and forfeiture of warranty.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold tracking-tight text-foreground">
            9. Payments & ordering
          </h2>
          <p>
            Orders are placed and confirmed over WhatsApp. When you click <strong className="text-foreground">Order on WhatsApp</strong> on
            a product page, your order details are pre-filled in a chat with us — payment is
            arranged directly during that conversation (UPI, bank transfer, or other methods we
            agree on). We never collect or store card details on this site. Pricing is shown in
            INR with USD equivalents for reference.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold tracking-tight text-foreground">
            10. Changes
          </h2>
          <p>
            These terms may be updated from time to time. Continued use of Softwaresellr after an
            update constitutes acceptance of the revised terms.
          </p>
        </section>
      </article>
    </div>
  );
}
