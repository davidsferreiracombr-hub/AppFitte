
'use client';

import React, { useState, createContext, useContext, useMemo, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Home, LayoutGrid, Heart, Star, Search, Menu, User } from 'lucide-react';
import { BottomNav } from './bottom-nav';
import { FloatingBackButton } from './floating-back-button';
import { useAutoHideBars } from '@/hooks/use-auto-hide-bars';
import { Input } from './ui/input';

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
    { href: '/search', label: 'Busca', icon: Search },
];

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const [searchTerm, setSearchTerm] = useState('');
  const { toggleSidebar } = useSidebar();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className={cn(
      "absolute top-0 left-0 right-0 z-40 text-white py-4 bg-transparent"
    )}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 h-16">
        <Button onClick={toggleSidebar} variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir Menu</span>
        </Button>
        <Link href="/" className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-white" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>Fitte</h1>
        </Link>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <User className="h-5 w-5" />
            <span className="sr-only">Perfil</span>
        </Button>
      </div>
      
      {/* Desktop Header */}
      <div className="hidden lg:flex flex-col items-center justify-center">
          <div className='flex items-center justify-between w-full max-w-7xl mx-auto px-8'>
              <div className="w-1/3"></div>
              <div className="w-1/3 flex justify-center">
                   <Link href="/" className="flex items-center gap-2">
                      <span className="font-extrabold text-2xl text-white">Fitte</span>
                  </Link>
              </div>
              <div className="w-1/3 flex justify-end">
                  <Button variant="ghost" size="icon" className="hover:bg-white/10">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Perfil</span>
                  </Button>
              </div>
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium mt-4 max-w-lg w-full justify-center">
            {navItems.filter(item => item.href !== '/search').map(({ href, label }) => (
            <Link
                key={href}
                href={href}
                className={cn(
                  "transition-colors text-white/80 hover:text-white",
                  pathname === href && "font-semibold text-white"
                )}
            >
                {label}
            </Link>
            ))}
            <form onSubmit={handleSearchSubmit} className="relative w-48">
                <Input
                    type="search"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn(
                      "h-8 pr-8 rounded-full border-transparent text-sm bg-white/20 text-white placeholder:text-white/70 focus:bg-white/30"
                    )}
                />
                <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
            </form>
          </nav>
      </div>
    </header>
  );
}

function MobileSheet() {
    const { isMobileSheetOpen, setMobileSheetOpen } = useSidebar();
    const pathname = usePathname();

    return (
        <Sheet open={isMobileSheetOpen} onOpenChange={setMobileSheetOpen}>
        <SheetContent side="left" className="p-0 w-72 bg-card">
            <div className="flex flex-col h-full">
                <div className="flex items-center h-20 px-6 border-b">
                    <Link href="/" className="flex items-center gap-2">
                         <span className="font-bold text-xl text-primary">Fitte</span>
                    </Link>
                </div>
                <div className="flex-1 py-6 space-y-4">
                   <nav className="flex flex-col gap-2 px-4">
                     {navItems.map(({ href, label, icon: Icon }) => (
                          <Link key={href} href={href} passHref>
                            <Button
                              variant={pathname === href ? 'secondary' : 'ghost'}
                              className='w-full justify-start gap-3 text-base h-12'
                              onClick={() => setMobileSheetOpen(false)}
                            >
                              <Icon className="h-5 w-5" />
                              <span>{label}</span>
                            </Button>
                          </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </SheetContent>
        </Sheet>
    )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainNavHrefs = navItems.map(item => item.href);
  const showBackButton = !mainNavHrefs.includes(pathname);
  
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <MobileSheet />
        {showBackButton && <FloatingBackButton />}
      </div>
    </div>
  );
}
