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
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm border-t lg:hidden z-40">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} passHref>
              <div className={cn(
                "flex flex-col items-center justify-center gap-1 text-muted-foreground w-20 transition-colors",
                isActive ? "text-primary" : "hover:text-foreground"
              )}>
                <Icon className={cn("h-6 w-6 transition-all", isActive ? "h-7 w-7" : "")} />
                <span className={cn(
                  "text-xs font-medium",
                   isActive ? "font-bold" : ""
                )}>
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
