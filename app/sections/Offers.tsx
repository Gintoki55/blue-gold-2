'use client';
import { useEffect, useRef, useState } from 'react';
import { Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';
import { offers } from '../data/products';

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function CountdownCard({ offer, language, tr }: { offer: typeof offers[0]; language: string; tr: typeof import('../data/translations').t.en }) {
  const time = useCountdown(offer.endsAt);
  const units = [
    { v: time.days, l: tr.offers.days },
    { v: time.hours, l: tr.offers.hours },
    { v: time.mins, l: tr.offers.mins },
    { v: time.secs, l: tr.offers.secs },
  ];

  return (
    <div className="group relative bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-navy-700 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-400">
      <div className="relative h-56 overflow-hidden">
        <img src={offer.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg tracking-wide">{offer.badge}</span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white text-2xl font-extrabold px-4 py-2 rounded-xl shadow-lg">{offer.discount}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className={`text-lg font-bold text-white ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
            {language === 'ar' ? offer.titleAr : offer.titleEn}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className={`text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
          {language === 'ar' ? offer.descAr : offer.descEn}
        </p>

        <div className={`mb-5 ${language === 'ar' ? 'text-right' : ''}`}>
          <p className={`text-xs text-gray-400 dark:text-gray-500 mb-3 font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
            {tr.offers.endsIn}
          </p>
          <div className="flex gap-2">
            {units.map(({ v, l }, i) => (
              <div key={i} className="flex-1 text-center bg-navy-50 dark:bg-navy-900 rounded-xl py-2">
                <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
                  {String(v).padStart(2, '0')}
                </div>
                <div className={`text-xs text-gray-400 mt-0.5 ${language === 'ar' ? 'font-arabic' : ''}`}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <button className={`w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-md shadow-blue-600/20 hover:shadow-blue-500/30 ${language === 'ar' ? 'font-arabic' : ''}`}>
          {tr.offers.claimOffer}
        </button>
      </div>
    </div>
  );
}

export default function Offers() {
  const { language } = useApp();
  const tr = t[language];
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="offers" ref={ref} className="py-24 bg-white dark:bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 text-red-500 text-sm font-semibold tracking-widest uppercase mb-3">
            <Tag size={14} />
            {tr.offers.subtitle}
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-navy-900 dark:text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
            {tr.offers.title}
          </h2>
          <div className="mt-4 w-16 h-1 bg-red-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <div
              key={offer.id}
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              <CountdownCard offer={offer} language={language} tr={tr} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
