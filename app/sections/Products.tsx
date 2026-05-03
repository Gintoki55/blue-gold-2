'use client';
import { useEffect, useRef, useState } from 'react';
import { Search, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';
import { products } from '../data/products';

type Category = 'all' | 'fish' | 'shrimp' | 'shellfish' | 'premium';

export default function Products() {
  const { language } = useApp();
  const tr = t[language];
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: tr.products.categories.all },
    { key: 'fish', label: tr.products.categories.fish },
    { key: 'shrimp', label: tr.products.categories.shrimp },
    { key: 'shellfish', label: tr.products.categories.shellfish },
    { key: 'premium', label: tr.products.categories.premium },
  ];

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const name = language === 'ar' ? p.nameAr : p.nameEn;
    const desc = language === 'ar' ? p.descAr : p.descEn;
    const matchSearch = search === '' || name.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="menu" ref={ref} className="py-24 bg-gray-50 dark:bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            {tr.products.subtitle}
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold text-navy-900 dark:text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
            {tr.products.title}
          </h2>
          <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Search + Filter */}
        <div className={`flex flex-col md:flex-row items-center gap-4 mb-10 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={tr.products.search}
              className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-xl text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${language === 'ar' ? 'font-arabic text-right pr-10 pl-4' : ''}`}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.key
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white dark:bg-navy-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-navy-700 border border-gray-200 dark:border-navy-700'
                } ${language === 'ar' ? 'font-arabic' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className={`group bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-navy-700 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-400 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(i % 8) * 60 + 300}ms` }}
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={product.image}
                  alt={language === 'ar' ? product.nameAr : product.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg capitalize">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className={`p-5 ${language === 'ar' ? 'text-right' : ''}`}>
                <h3 className={`font-bold text-navy-900 dark:text-white mb-1.5 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? product.nameAr : product.nameEn}
                </h3>
                <p className={`text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? product.descAr : product.descEn}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold text-blue-600 dark:text-blue-400 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {product.price ?? tr.products.contactPrice}
                  </span>
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Phone size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <Search size={40} className="mx-auto mb-4 opacity-50" />
            <p className={language === 'ar' ? 'font-arabic' : ''}>No products found</p>
          </div>
        )}
      </div>
    </section>
  );
}
