'use client';
import { useEffect, useRef, useState } from 'react';
import { Award, Shield, Leaf, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';

export default function TrustBanner() {
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

  const items = [
    { icon: Award, labelEn: 'ISO Certified', labelAr: 'معتمد ISO' },
    { icon: Shield, labelEn: 'HACCP Compliant', labelAr: 'متوافق HACCP' },
    { icon: Leaf, labelEn: 'Sustainable Sourcing', labelAr: 'مصادر مستدامة' },
    { icon: Clock, labelEn: '24/7 Cold Chain', labelAr: 'سلسلة باردة 24/7' },
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-blue-600 to-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,30 Q360,80 720,30 T1440,30 L1440,100 L0,100 Z" fill="white" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className={`text-2xl md:text-3xl font-bold text-white mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {tr.trust.title}
          </h2>
          <p className={`text-blue-200 ${language === 'ar' ? 'font-arabic' : ''}`}>{tr.trust.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, labelEn, labelAr }, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-3 p-5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl transition-all duration-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon size={22} className="text-white" />
              </div>
              <span className={`text-white font-semibold text-sm text-center ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? labelAr : labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
