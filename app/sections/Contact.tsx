'use client';
import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';

export default function Contact() {
  const { language, isRTL } = useApp();
  const tr = t[language];
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: Phone, label: tr.contact.phoneLabel, value: '+968 91124724', href: 'tel:+96891124724' },
    { icon: Mail, label: tr.contact.emailLabel, value: 'info.bluex@gmail.com', href: 'mailto:info.bluex@gmail.com' },
    { icon: MapPin, label: tr.contact.address, value: language === 'ar' ? 'بالقرب من جامع السلطان قابوس، صلالة، عمان' : 'Near Sultan Qaboos Mosque, Salalah, Oman', href: '#' },
  ];

  return (
    <section id="contact" ref={ref} className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            {tr.contact.subtitle}
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
            {tr.contact.title}
          </h2>
          <div className="mt-4 w-16 h-1 bg-blue-500 mx-auto rounded-full" />
        </div>

        <div className={`grid lg:grid-cols-5 gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Contact Info */}
          <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8'}`}>
            <h3 className={`text-xl font-bold text-white mb-8 ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
              {tr.contact.info}
            </h3>

            <div className="space-y-6 mb-10">
              {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className={`flex items-start gap-4 group ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                >
                  <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600/30 transition-colors duration-200">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className={`text-xs text-gray-500 font-medium mb-1 ${language === 'ar' ? 'font-arabic' : ''}`}>{label}</p>
                    <p className={`text-white font-medium group-hover:text-blue-300 transition-colors ${language === 'ar' ? 'font-arabic' : ''}`}>{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/96824000000"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 w-full justify-center px-6 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-green-600/20 hover:-translate-y-0.5 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}
            >
              <MessageCircle size={20} />
              {tr.contact.whatsapp}
            </a>

            {/* Social links */}
            <div className={`flex gap-3 mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {[
                { label: 'Instagram', href: 'https://instagram.com', icon: 'IG' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 rounded-xl flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : isRTL ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              {submitted && (
                <div className="mb-6 flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400">
                  <CheckCircle size={18} />
                  <span className={language === 'ar' ? 'font-arabic' : ''}>{tr.contact.success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { key: 'name', label: tr.contact.name, type: 'text' },
                  { key: 'email', label: tr.contact.email, type: 'email' },
                  { key: 'phone', label: tr.contact.phone, type: 'tel' },
                ].map(field => (
                  <div key={field.key}>
                    <label className={`block text-sm font-medium text-gray-300 mb-2 ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required={field.key !== 'phone'}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      className={`w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-500 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm ${language === 'ar' ? 'font-arabic text-right' : ''}`}
                    />
                  </div>
                ))}

                <div>
                  <label className={`block text-sm font-medium text-gray-300 mb-2 ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
                    {tr.contact.message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-blue-500 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm resize-none ${language === 'ar' ? 'font-arabic text-right' : ''}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-xl font-semibold transition-all duration-200 shadow-md shadow-blue-600/20 hover:-translate-y-0.5 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}
                >
                  {sending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {tr.contact.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
