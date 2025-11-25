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
    <nav className="fixed bottom-4 inset-x-0 mx-auto w-fit lg:hidden z-40">
        <div className="flex items-center h-16 max-w-md mx-auto px-6 bg-primary rounded-full shadow-lg border border-primary-foreground/20">
            <div className="flex justify-around items-center h-full gap-4">
                {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                    <Link key={href} href={href} passHref>
                    <div className={cn(
                        "flex flex-col items-center justify-center gap-1 w-16 transition-all duration-200 ease-in-out",
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
        </div>
    </nav>
  );
}
