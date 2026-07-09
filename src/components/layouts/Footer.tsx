import { Link } from 'react-router';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '@/components/ui/SocialIcons';
import {
  COMPANY_NAME,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_HOURS,
  FOOTER_LINKS,
  SOCIAL_LINKS,
} from '@/constants/navigation';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-light border-t border-gold/10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center">
                <img
                  src="/logo.png"
                  alt={COMPANY_NAME}
                  className="h-18 w-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
                />
              </div>
            </Link>
            <p className="text-ivory/60 text-sm leading-relaxed mb-6">
              Building dreams into reality with 20+ years of excellence. Premium construction,
              renovation, and project management services across Tamil Nadu.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FacebookIcon, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                { icon: InstagramIcon, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
                { icon: LinkedinIcon, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
                { icon: YoutubeIcon, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-ivory/60 hover:text-gold hover:border-gold/30 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-ivory font-semibold mb-4 font-display">Company</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-ivory/60 hover:text-gold hover:translate-x-1 block transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-ivory font-semibold mb-4 font-display">Services</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-ivory/60 hover:text-gold hover:translate-x-1 block transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-ivory font-semibold mt-6 mb-4 font-display">Legal</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-ivory/60 hover:text-gold hover:translate-x-1 block transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-ivory font-semibold mb-4 font-display">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${COMPANY_PHONE}`}
                  className="flex items-start gap-3 text-ivory/60 hover:text-gold transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  {COMPANY_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="flex items-start gap-3 text-ivory/60 hover:text-gold transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  {COMPANY_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ivory/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                {COMPANY_ADDRESS}
              </li>
              <li className="flex items-start gap-3 text-ivory/60 text-sm">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                {COMPANY_HOURS}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Highlighted Black Copyright Bar */}
      <div className="bg-black border-t border-gold/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-300 text-sm">
          <p>Copyright &copy; {currentYear}. {COMPANY_NAME}. All rights reserved.</p>
          <p className="text-stone-300">Crafted with excellence in South India</p>
        </div>
      </div>
    </footer>
  );
}
