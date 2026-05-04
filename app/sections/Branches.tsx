'use client';
import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';
import { branches } from '../data/products';

export default function Branches() {
  const { language, isRTL } = useApp();
  const tr = t[language];
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(branches[0].id);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const activeBranch = branches.find(b => b.id === selected)!;

  return (
    <section id="branches" ref={ref} className="py-24 bg-gray-50 dark:bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            {tr.branches.subtitle}
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold text-navy-900 dark:text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
            {tr.branches.title}
          </h2>
          <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className={`grid lg:grid-cols-5 gap-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Branch List */}
          <div className="lg:col-span-2 space-y-4">
            {branches.map(branch => (
              <button
                key={branch.id}
                onClick={() => setSelected(branch.id)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                  selected === branch.id
                    ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-600/30'
                    : 'bg-white dark:bg-navy-800 border-gray-100 dark:border-navy-700 hover:border-blue-300 dark:hover:border-blue-600'
                } ${isRTL ? 'text-right' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    selected === branch.id ? 'bg-white/20' : 'bg-blue-50 dark:bg-navy-700'
                  }`}>
                    <MapPin size={18} className={selected === branch.id ? 'text-white' : 'text-blue-600 dark:text-blue-400'} />
                  </div>
                  <div>
                    <h3 className={`font-bold mb-1 ${selected === branch.id ? 'text-white' : 'text-navy-900 dark:text-white'} ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? branch.nameAr : branch.nameEn}
                    </h3>
                    <p className={`text-sm ${selected === branch.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'} ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? branch.addressAr : branch.addressEn}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Branch Detail */}
          <div className="lg:col-span-3 bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-navy-700 shadow-sm">
            {/* Map placeholder */}
            <div className="relative h-64 bg-linear-to-br from-navy-800 to-navy-900 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Branch location"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <MapPin size={40} className="text-blue-400 mb-3 drop-shadow-lg" />
                <p className="text-lg font-semibold text-white/90">
                  {language === 'ar' ? activeBranch.nameAr : activeBranch.nameEn}
                </p>
                <a
                  href={activeBranch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 transition-colors"
                >
                  <ExternalLink size={14} />
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div className="p-8">
              <h3 className={`text-xl font-bold text-navy-900 dark:text-white mb-6 ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
                {language === 'ar' ? activeBranch.nameAr : activeBranch.nameEn}
              </h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: tr.branches.address, value: language === 'ar' ? activeBranch.addressAr : activeBranch.addressEn },
                  { icon: Phone, label: tr.branches.phone, value: activeBranch.phone },
                  { icon: Clock, label: tr.branches.hours, value: language === 'ar' ? activeBranch.hoursAr : activeBranch.hoursEn },
                ].map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="w-10 h-10 bg-blue-50 dark:bg-navy-700 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className={`text-xs text-gray-400 dark:text-gray-500 font-medium mb-0.5 ${language === 'ar' ? 'font-arabic' : ''}`}>{label}</p>
                      <p className={`text-gray-700 dark:text-gray-200 font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
