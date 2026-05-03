'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';
import Logo from './Logo';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const { language, theme, toggleLanguage, toggleTheme, isRTL } = useApp();
  const tr = t[language];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: tr.nav.home },
    { id: 'about', label: tr.nav.about },
    { id: 'menu', label: tr.nav.menu },
    { id: 'branches', label: tr.nav.branches },
    { id: 'offers', label: tr.nav.offers },
    { id: 'contact', label: tr.nav.contact },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 dark:bg-navy-950/95 backdrop-blur-md shadow-lg shadow-navy-900/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => handleNav('home')} className="flex-shrink-0">
            <Logo size="sm" variant={scrolled ? 'auto' : 'light'} />
          </button>

          {/* Desktop Nav */}
          <nav className={`hidden lg:flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : scrolled
                    ? 'text-navy-700 dark:text-blue-100 hover:bg-navy-50 dark:hover:bg-navy-800'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                scrolled
                  ? 'text-navy-700 dark:text-blue-100 hover:bg-navy-50 dark:hover:bg-navy-800 border border-navy-200 dark:border-navy-700'
                  : 'text-white/90 hover:bg-white/10 border border-white/30'
              }`}
            >
              <Globe size={14} />
              {language === 'en' ? 'عربي' : 'EN'}
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                scrolled
                  ? 'text-navy-700 dark:text-blue-100 hover:bg-navy-50 dark:hover:bg-navy-800'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className="lg:hidden p-2 rounded-lg transition-all duration-200 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-white/98 dark:bg-navy-950/98 backdrop-blur-md border-t border-navy-100 dark:border-navy-800`}
      >
        <div className="px-4 py-3 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isRTL ? 'text-right' : 'text-left'
              } ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-navy-700 dark:text-blue-100 hover:bg-navy-50 dark:hover:bg-navy-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
