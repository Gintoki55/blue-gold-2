'use client';
import { useEffect, useRef, useState } from 'react';
import { Package, ShoppingBag, Truck, Scissors } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';

const icons = [Package, ShoppingBag, Truck, Scissors];

export default function Services() {
  const { language } = useApp();
  const tr = t[language];
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-navy-950 dark:bg-navy-950 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            {tr.services.subtitle}
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
            {tr.services.title}
          </h2>
          <div className="mt-4 w-16 h-1 bg-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tr.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className={`group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 rounded-2xl p-8 transition-all duration-500 cursor-default ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-blue-600/20 group-hover:bg-blue-600/30 border border-blue-500/30 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Icon size={24} className="text-blue-400" />
                  </div>
                </div>
                <h3 className={`text-lg font-bold text-white mb-3 ${language === 'ar' ? 'font-arabic' : ''}`}>{item.title}</h3>
                <p className={`text-gray-400 text-sm leading-relaxed ${language === 'ar' ? 'font-arabic text-right' : ''}`}>{item.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-ocean-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
