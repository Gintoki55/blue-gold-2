'use client';
import { useState, useEffect, useCallback } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Products from './sections/Products';
import Branches from './sections/Branches';
import Offers from './sections/Offers';
import Contact from './sections/Contact';
import TrustBanner from './sections/TrustBanner';

const sections = ['home', 'about', 'menu', 'branches', 'offers', 'contact'];

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(section);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 transition-colors duration-300">
      <Header activeSection={activeSection} onNavigate={navigateTo} />
      <main>
        <Hero onNavigate={navigateTo} />
        <About />
        <Services />
        <Products />
        <TrustBanner />
        <Offers />
        <Branches />
        <Contact />
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
