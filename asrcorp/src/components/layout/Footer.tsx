import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

const servicesList = [
  'Renovation',
  'Waterproofing',
  'Roofing',
  'Interior Design',
  'Construction',
  'Painting',
  'Real Estate',
];

const socialLinks = [
  { icon: Camera, href: 'https://www.instagram.com/asr.corporation/', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-dark relative overflow-hidden">
      {/* ── Massive decorative text ── */}
      <div className="pt-24 px-6 text-center leading-none select-none pointer-events-none">
        <span className="font-heading text-6xl md:text-8xl lg:text-[10rem] font-extrabold text-white/5">
          LET'S BUILD
        </span>
      </div>

      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-0 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-heading text-xl font-extrabold tracking-tight">
                <span className="text-coral">A</span>
                <span className="text-white">SR</span>
              </span>
            </Link>
            <p className="text-muted text-sm italic">
              Building Dreams, Delivering Excellence
            </p>
            <p className="text-muted text-sm leading-relaxed">
              ASR Corporation is a premier construction and real estate company
              based in Mangaluru, committed to transforming visions into
              architectural masterpieces with precision, quality, and integrity.
            </p>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <h4 className="text-coral text-xs tracking-[0.2em] uppercase font-body font-semibold mb-6">
              NAVIGATE
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="group flex items-center gap-2 text-white/60 text-sm transition-colors duration-200 hover:text-white"
                  >
                    <span>{label}</span>
                    <span className="opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-coral">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="text-coral text-xs tracking-[0.2em] uppercase font-body font-semibold mb-6">
              SERVICES
            </h4>
            <ul className="space-y-3">
              {servicesList.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="group flex items-center gap-2 text-white/60 text-sm transition-colors duration-200 hover:text-white"
                  >
                    <span>{service}</span>
                    <span className="opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-coral">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-coral text-xs tracking-[0.2em] uppercase font-body font-semibold mb-6">
              CONTACT
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="text-white/60 leading-relaxed">
                Kadri Hills, Mangaluru,
                <br />
                Karnataka 575002
              </li>
              <li>
                <a
                  href="tel:+918667150022"
                  className="text-white/60 transition-colors duration-200 hover:text-coral"
                >
                  +91 8667 150 022
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@asrcorporation.com"
                  className="text-white/60 transition-colors duration-200 hover:text-coral"
                >
                  info@asrcorporation.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-t border-border-dark my-12" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} ASR Corporation. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-muted transition-colors duration-200 hover:text-coral"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
