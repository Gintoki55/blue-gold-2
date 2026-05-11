'use client';
import { useApp } from '../context/AppContext';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
}

export default function Logo({ size = 'md', variant = 'auto' }: LogoProps) {
  const { theme } = useApp();

  const isLight = variant === 'light' || (variant === 'auto' && theme === 'dark');

  const sizes = {
    sm: { w: 100, h: 40 },
    md: { w: 140, h: 56 },
    lg: { w: 180, h: 72 },
  };

  return (
    <Image
      src={isLight ? '/logo-dark.png' : '/logo-light.png'}
      alt="Blue Gold Logo"
      width={sizes[size].w}
      height={sizes[size].h}
      className="object-contain"
      priority
    />
  );
}