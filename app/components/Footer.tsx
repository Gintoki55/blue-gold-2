'use client';
import { Phone, Mail, MapPin, Aperture, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';
import Logo from './Logo';
//11
interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { language, isRTL } = useApp();
  const tr = t[language];

  const navItems = [
    { id: 'home', label: tr.nav.home },
    { id: 'about', label: tr.nav.about },
    { id: 'menu', label: tr.nav.menu },
    { id: 'branches', label: tr.nav.branches },
    { id: 'offers', label: tr.nav.offers },
    { id: 'contact', label: tr.nav.contact },
  ];

  return (
    <footer className="bg-navy-950 border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-12 ${isRTL ? 'text-right' : ''}`}>
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <Logo size="md" variant="light" />
            </div>
            <p className={`text-gray-400 text-sm leading-relaxed mb-6 max-w-xs ${language === 'ar' ? 'font-arabic' : ''}`}>
              {tr.footer.tagline}
            </p>
            <p className={`text-gray-500 text-xs ${language === 'ar' ? 'font-arabic' : ''}`}>
              {tr.footer.company}
            </p>
            {/* Social */}
            <div className={`flex gap-3 mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
              >
                <Aperture size={16} />
              </a>
              <a
                href="https://wa.me/96824000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/40 rounded-xl flex items-center justify-center text-gray-400 hover:text-green-400 transition-all duration-200"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-white font-semibold mb-5 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {tr.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`text-gray-400 hover:text-white text-sm transition-colors duration-200 ${language === 'ar' ? 'font-arabic' : ''}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-white font-semibold mb-5 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {tr.contact.info}
            </h4>
            <ul className="space-y-4">
              {[
                { icon: Phone, value: '+968 91124724', href: 'tel:+96891124724' },
                { icon: Mail, value: 'info.bluex@gmail.com', href: 'mailto:info.bluex@gmail.com' },
                { icon: MapPin, value: language === 'ar' ? 'صلالة الجديدة، عمان' : 'Salalah, Oman', href: '#' },
              ].map(({ icon: Icon, value, href }, i) => (
                <li key={i}>
                  <a
                    href={href}
                    className={`flex items-start gap-3 text-gray-400 hover:text-white text-sm transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <Icon size={14} className="mt-0.5 shrink-0 text-blue-500" />
                    <span>{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <p className={`text-gray-600 text-xs ${language === 'ar' ? 'font-arabic' : ''}`}>
              &copy; {new Date().getFullYear()} {tr.footer.company}. {tr.footer.rights}
            </p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-gray-600 text-xs">bluegoldtrading.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
