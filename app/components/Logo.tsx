'use client';
import { useApp } from '../context/AppContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
}

export default function Logo({ size = 'md', variant = 'auto' }: LogoProps) {
  const { theme } = useApp();

  const sizes = {
    sm: { container: 'h-8', text: 'text-xl', sub: 'text-[8px]' },
    md: { container: 'h-12', text: 'text-2xl', sub: 'text-[9px]' },
    lg: { container: 'h-16', text: 'text-4xl', sub: 'text-xs' },
  };

  const isLight = variant === 'light' || (variant === 'auto' && theme === 'dark');
  const textColor = isLight ? 'text-white' : 'text-navy-900';
  const accentColor = '#1e88e5';

  return (
    <div className={`flex items-center gap-2 ${sizes[size].container}`}>
      <div className="relative flex items-center justify-center">
        <svg width={size === 'sm' ? 32 : size === 'md' ? 42 : 56} height={size === 'sm' ? 32 : size === 'md' ? 42 : 56} viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="28" fill="#0a2875" />
          <path d="M8 30 Q16 20 24 28 Q32 36 40 26 Q46 18 50 22" stroke="#60a5fa" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M8 34 Q16 24 24 32 Q32 40 40 30 Q46 22 50 26" stroke="#93c5fd" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
          <ellipse cx="22" cy="24" rx="9" ry="6" fill="#1e88e5" opacity="0.9" transform="rotate(-15 22 24)" />
          <circle cx="26" cy="22" r="1.5" fill="white" opacity="0.9" />
          <path d="M31 24 L37 20 M31 24 L37 27 M31 24 L38 24" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <div className={`font-bold tracking-wide ${sizes[size].text} ${textColor}`} style={{ fontFamily: 'Inter, sans-serif' }}>
          Blue<span style={{ color: accentColor }}>X</span>
        </div>
        <div className={`${sizes[size].sub} font-medium tracking-widest uppercase ${isLight ? 'text-blue-200' : 'text-navy-600'} mt-0.5`}>
          Blue Gold Trading
        </div>
      </div>
    </div>
  );
}
