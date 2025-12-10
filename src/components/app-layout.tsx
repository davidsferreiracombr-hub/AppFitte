
'use client';

import React, { useState, createContext, useContext, useMemo, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, LayoutGrid, Heart, Star, Search, Menu } from 'lucide-react';
import { Input } from './ui/input';
import { FloatingBackButton } from './floating-back-button';

type SidebarContextType = {
  isMobileSheetOpen: boolean;
  setMobileSheetOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isMobileSheetOpen, setMobileSheetOpen] = useState(false);

  const toggleSidebar = () => {
      setMobileSheetOpen(prev => !prev);
  };

  const value = useMemo(() => ({ 
      isMobileSheetOpen, 
      setMobileSheetOpen,
      toggleSidebar 
    }), [isMobileSheetOpen]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export const navItems = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/categories', label: 'Categorias', icon: LayoutGrid },
    { href: '/favorites', label: 'Favoritos', icon: Heart },
    { href: '/reviews', label: 'Avaliações', icon: Star },
];

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  const isHomePage = pathname === '/';
  const isRecipePage = pathname.startsWith('/recipe/');

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const headerClasses = cn(
    "absolute top-0 left-0 right-0 z-40 py-4",
    (isHomePage || isRecipePage) ? "bg-transparent" : "sticky bg-background/80 backdrop-blur-sm border-b"
  );
  
  const textClasses = (isHomePage || isRecipePage) ? "text-white" : "text-foreground";

  return (
    <header className={headerClasses}>
      <div className="flex flex-col items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8">
          <div className='flex items-center justify-center w-full h-16 relative'>
              <div className="text-center">
                   <Link href="/" className="flex items-center gap-2">
                      <span className={cn("font-extrabold text-3xl text-primary")}>Fitte</span>
                  </Link>
              </div>
          </div>

          <nav className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-sm font-medium w-full flex-wrap">
                <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs order-last sm:order-first mt-2 sm:mt-0">
                    <Input
                        type="search"
                        placeholder="Buscar receita..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={cn(
                        "h-9 pr-10 rounded-full border-transparent text-sm w-full",
                         (isHomePage || isRecipePage) ? "bg-white/20 text-white placeholder:text-white/70 focus:bg-white/30" : "bg-secondary text-foreground"
                        )}
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Search className={cn("h-4 w-4", (isHomePage || isRecipePage) ? "text-white/70" : "text-muted-foreground")} />
                    </button>
                </form>
                <div className='flex items-center gap-4 sm:gap-6'>
                    {navItems.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                          "transition-colors text-xs sm:text-sm",
                          (isHomePage || isRecipePage) ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground",
                          pathname === href && ((isHomePage || isRecipePage) ? "font-semibold text-white" : "font-semibold text-primary")
                        )}
                    >
                        {label}
                    </Link>
                    ))}
                </div>
            </div>
          </nav>
      </div>
    </header>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isRecipePage = pathname.startsWith('/recipe/');
  
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex flex-col flex-1">
        <Header />
        <main className={cn("flex-1", !(isHomePage || isRecipePage) && "pt-32")}>
          {children}
        </main>
        {!(isHomePage) && <FloatingBackButton />}
      </div>
    </div>
  );
}
