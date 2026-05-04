'use client';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Eye, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';

export default function About() {
  const { language, isRTL } = useApp();
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

  const stats = [
    { value: '15+', label: tr.about.stats.years },
    { value: '500+', label: tr.about.stats.clients },
    { value: '30+', label: tr.about.stats.countries },
    { value: '10K+', label: tr.about.stats.tons },
  ];

  return (
    <section id="about" ref={ref} className="py-24 bg-white dark:bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            {tr.about.subtitle}
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold text-navy-900 dark:text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
            {tr.about.title}
          </h2>
          <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className={`grid lg:grid-cols-2 gap-16 items-center mb-20 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Left: Images */}
          <div className={`relative transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fishing vessel"
                className="rounded-2xl w-full h-80 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-36 rounded-xl overflow-hidden shadow-xl border-4 border-white dark:border-navy-900">
                <img
                  src="https://images.pexels.com/photos/3296279/pexels-photo-3296279.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Fresh seafood"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-28 h-28 rounded-xl overflow-hidden shadow-xl border-4 border-white dark:border-navy-900">
                <img
                  src="https://images.pexels.com/photos/566344/pexels-photo-566344.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Shrimp"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'} ${isRTL ? 'text-right' : ''}`}>
            <p className={`text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {tr.about.body}
            </p>
            <p className={`text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {tr.about.body2}
            </p>

            {/* Why choose us */}
            <h3 className={`text-xl font-bold text-navy-900 dark:text-white mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {tr.about.why}
            </h3>
            <ul className="space-y-3">
              {tr.about.reasons.map((reason, i) => (
                <li key={i} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span className={`text-gray-600 dark:text-gray-300 ${language === 'ar' ? 'font-arabic' : ''}`}>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className={`grid md:grid-cols-2 gap-8 mb-20 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-navy-50 dark:bg-navy-900 rounded-2xl p-8 border border-navy-100 dark:border-navy-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Eye size={20} className="text-white" />
              </div>
              <h3 className={`text-xl font-bold text-navy-900 dark:text-white ${language === 'ar' ? 'font-arabic' : ''}`}>{tr.about.vision}</h3>
            </div>
            <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${language === 'ar' ? 'font-arabic text-right' : ''}`}>{tr.about.visionText}</p>
          </div>
          <div className="bg-blue-600 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Target size={20} className="text-white" />
              </div>
              <h3 className={`text-xl font-bold text-white ${language === 'ar' ? 'font-arabic' : ''}`}>{tr.about.mission}</h3>
            </div>
            <p className={`text-blue-100 leading-relaxed ${language === 'ar' ? 'font-arabic text-right' : ''}`}>{tr.about.missionText}</p>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 bg-linear-to-br from-navy-50 to-blue-50 dark:from-navy-900 dark:to-navy-800 rounded-2xl border border-navy-100 dark:border-navy-700">
              <div className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
              <div className={`text-sm font-medium text-gray-600 dark:text-gray-400 ${language === 'ar' ? 'font-arabic' : ''}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
