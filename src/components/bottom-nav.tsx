
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
    <header className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg lg:hidden">
      <div className="grid grid-cols-5 items-center justify-around rounded-full bg-[hsl(224,71%,4%)] p-2 shadow-2xl">
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
