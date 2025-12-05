
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/categories', label: 'Categorias', icon: LayoutGrid },
  { href: '/favorites', label: 'Favoritos', icon: Heart },
  { href: '/profile', label: 'Perfil', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-card border-t lg:hidden z-40">
        <div className="flex justify-around items-center h-20 max-w-md mx-auto">
            {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
                <Link key={href} href={href} passHref>
                <div className={cn(
                    "flex flex-col items-center justify-center gap-1 w-20 transition-all duration-200 ease-in-out",
                    isActive ? "text-primary" : "text-muted-foreground/80 hover:text-primary"
                )}>
                    <Icon className="h-7 w-7" fill={isActive ? "currentColor" : "none"}/>
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
