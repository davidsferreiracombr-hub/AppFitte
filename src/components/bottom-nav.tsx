
'use client';

import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, Star, Search } from 'lucide-react';
import { NavIcon } from './NavIcon';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/categories', label: 'Categorias', icon: LayoutGrid },
  { href: '/search', label: 'Busca', icon: Search },
  { href: '/favorites', label: 'Favoritos', icon: Heart },
  { href: '/reviews', label: 'Avaliações', icon: Star },
];

interface BottomNavProps {
  isVisible: boolean;
}

export function BottomNav({ isVisible }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <header className={cn(
      "fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card shadow-[0_-2px_10px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-in-out",
      !isVisible && "translate-y-full"
    )}>
      <div className="flex h-16 items-center justify-around">
        {navItems.map(item => (
          <NavIcon 
            key={item.href} 
            {...item} 
            isActive={pathname === item.href} 
          />
        ))}
      </div>
    </header>
  );
}
