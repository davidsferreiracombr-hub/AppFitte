
'use client';

import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, Star, Search } from 'lucide-react';
import { NavIcon } from './NavIcon';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/categories', label: 'Categorias', icon: LayoutGrid },
  { href: '/search', label: 'Busca', icon: Search },
  { href: '/favorites', label: 'Favoritos', icon: Heart },
  { href: '/reviews', label: 'Avaliações', icon: Star },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <header className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t-2 border-primary">
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
