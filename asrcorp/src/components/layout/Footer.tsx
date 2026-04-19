import { Link } from 'react-router-dom';
import { Globe, Camera, Briefcase, MessageCircle } from 'lucide-react';

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
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Briefcase, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-warm-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-bold tracking-tight">
                <span className="text-brand-amber">ASR</span>
                <span className="text-brand-warm-white"> CORPORATION</span>
              </span>
            </Link>
            <p className="font-display text-lg italic text-brand-amber-light">
              Building Dreams, Delivering Excellence
            </p>
            <p className="text-sm leading-relaxed text-brand-stone">
              ASR Corporation is a premier construction and real estate company
              based in Mangaluru, committed to transforming visions into
              architectural masterpieces with precision, quality, and integrity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 font-display text-lg font-semibold text-brand-amber">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-brand-warm-white/70 transition-colors duration-300 hover:text-brand-amber"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 font-display text-lg font-semibold text-brand-amber">
              Services
            </h4>
            <ul className="space-y-3">
              {servicesList.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-brand-warm-white/70 transition-colors duration-300 hover:text-brand-amber"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 font-display text-lg font-semibold text-brand-amber">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="text-brand-warm-white/70">
                <span className="mb-1 block font-semibold text-brand-warm-white">Address</span>
                Kadri Hills, Mangaluru,<br />Karnataka 575002, India
              </li>
              <li className="text-brand-warm-white/70">
                <span className="mb-1 block font-semibold text-brand-warm-white">Phone</span>
                <a href="tel:+918242456789" className="transition-colors duration-300 hover:text-brand-amber">
                  +91 824 245 6789
                </a>
              </li>
              <li className="text-brand-warm-white/70">
                <span className="mb-1 block font-semibold text-brand-warm-white">Email</span>
                <a href="mailto:info@asrcorporation.com" className="transition-colors duration-300 hover:text-brand-amber">
                  info@asrcorporation.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
          <p className="text-xs text-brand-stone">
            &copy; 2024 ASR Corporation. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center justify-center w-9 h-9 border border-white/10 rounded-sm text-brand-stone transition-all duration-300 hover:text-brand-amber hover:border-brand-amber"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
