import { Link } from 'react-router-dom';
import { whatsappUrl } from '../../utils/format';

const WHATSAPP_URL = whatsappUrl();
const TELEGRAM_URL = 'https://t.me/YOURUSERNAME';

export function Footer() {
  return (
    <footer className="mt-24 px-4 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Big display wordmark */}
        <div className="pointer-events-none select-none py-12 text-center">
          <div className="text-[22vw] font-semibold leading-none tracking-[-0.05em] text-overlay/5 sm:text-[180px]">
            Softwaresellr
          </div>
        </div>

        <div className="glass rounded-xl p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <Link to="/" className="flex items-center gap-2 text-[15px] font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-pill bg-foreground text-background text-xs font-semibold shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_2px_4px_rgba(0,0,0,0.4)]">
                  O
                </span>
                <span className="text-foreground">Softwaresellr</span>
              </Link>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Premium software. Honest prices. Genuine subscriptions, activated and delivered
                fast.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm tracking-tight">
              <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
                Home
              </Link>
              <Link
                to="/products"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Products
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </Link>
              <Link
                to="/terms"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                WhatsApp
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Telegram
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-overlay/5 pt-6 text-xs text-muted-foreground">
            © 2026 Softwaresellr. All rights reserved. We are an independent reseller and not
            affiliated with any of the listed software brands.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
