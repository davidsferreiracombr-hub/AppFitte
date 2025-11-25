'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/categories', label: 'Categorias', icon: LayoutGrid },
  { href: '/favorites', label: 'Favoritos', icon: Heart },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-primary border-t border-primary/50 lg:hidden z-40">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} passHref>
              <div className={cn(
                "flex flex-col items-center justify-center gap-1 w-20 transition-all duration-200 ease-in-out",
                isActive ? "text-primary-foreground" : "text-primary-foreground/60 hover:text-primary-foreground"
              )}>
                <Icon className="h-6 w-6" />
                <span className="text-xs font-bold">
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
