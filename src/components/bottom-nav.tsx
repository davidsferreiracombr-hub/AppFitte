'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './app-layout';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/categories', label: 'Categorias', icon: LayoutGrid },
  { href: '/favorites', label: 'Favoritos', icon: Heart },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card/95 backdrop-blur-sm border-t lg:hidden z-40">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} passHref>
              <div className={cn(
                "flex flex-col items-center justify-center gap-1 w-20 transition-all duration-200 ease-in-out",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}>
                <div className={cn("h-8 w-16 rounded-full flex items-center justify-center transition-all", isActive ? 'bg-primary/10' : '')}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
