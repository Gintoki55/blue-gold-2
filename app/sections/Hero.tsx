'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Fish, ShoppingCart, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { language, isRTL } = useApp();
  const tr = t[language];
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Ocean"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-navy-950/90 via-navy-900/80 to-blue-900/70" />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-transparent to-transparent" />
      </div>

      {/* Animated wave overlays */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 200" className="w-full animate-wave" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C240,160 480,0 720,80 C960,160 1200,0 1440,80 L1440,200 L0,200 Z" fill="rgba(10,40,117,0.4)" />
        </svg>
        <svg viewBox="0 0 1440 200" className="absolute bottom-0 w-full animate-wave2" fill="none">
          <path d="M0,100 C360,40 720,160 1080,80 C1260,40 1380,120 1440,100 L1440,200 L0,200 Z" fill="rgba(6,24,80,0.6)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Logo mark */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-white/80 text-sm font-medium tracking-widest uppercase">
              {language === 'en' ? 'Blue Gold Trading & Investment' : 'شركة الذهب الأزرق للتجارة والاستثمار'}
            </span>
          </div>
        </div>

        {/* Main heading */}
        <div className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'en' ? (
              <>
                <span className="block">Blue</span>
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-ocean-300">
                  Gold
                </span>
              </>
            ) : (
              <>
                <span className="block">الذهب</span>
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-ocean-300">
                  الأزرق
                </span>
              </>
            )}
          </h1>
        </div>

        {/* Tagline */}
        <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-blue-400" />
            <p className={`text-blue-200 text-xl md:text-2xl font-semibold tracking-wide ${language === 'ar' ? 'font-arabic' : ''}`}>
              {tr.hero.tagline}
            </p>
            <div className="h-px w-16 bg-linear-to-l from-transparent to-blue-400" />
          </div>
          <p className={`text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {tr.hero.sub}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <button
            onClick={() => onNavigate('menu')}
            className={`group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-base transition-all duration-300 shadow-lg shadow-blue-600/40 hover:shadow-blue-500/50 hover:-translate-y-0.5 ${language === 'ar' ? 'font-arabic' : ''}`}
          >
            {tr.hero.cta1}
            <span className="inline-block ms-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-base transition-all duration-300 border border-white/30 hover:border-white/50 hover:-translate-y-0.5 ${language === 'ar' ? 'font-arabic' : ''}`}
          >
            {tr.hero.cta2}
          </button>
        </div>

        {/* Badges */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: <Fish size={16} />, label: tr.hero.badge1 },
            { icon: <ShoppingCart size={16} />, label: tr.hero.badge2 },
            { icon: <Globe size={16} />, label: tr.hero.badge3 },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-5 py-2.5">
              <span className="text-blue-300">{badge.icon}</span>
              <span className={`text-white/80 text-sm font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => onNavigate('about')}
          className="flex flex-col items-center text-white/40 hover:text-white/70 transition-all duration-200 animate-bounce mx-auto"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
}
