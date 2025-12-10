
'use client';

import React, { useState, createContext, useContext, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Home, LayoutGrid, Heart, Star, Search, Menu, User } from 'lucide-react';
import { BottomNav } from './bottom-nav';
import { FloatingBackButton } from './floating-back-button';
import { useAutoHideBars } from '@/hooks/use-auto-hide-bars';

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

function DesktopHeader() {
  const pathname = usePathname();
  return (
    <header className="hidden lg:block absolute top-0 left-0 right-0 z-40 h-20 bg-transparent text-white">
        <div className="grid grid-cols-3 items-center h-full max-w-7xl mx-auto px-8">
            <nav className="flex items-center gap-6 text-sm font-medium">
                {navItems.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                    "transition-colors hover:text-white/80",
                    pathname === href ? "text-white font-semibold" : "text-white/70"
                    )}
                >
                    {label}
                </Link>
                ))}
            </nav>
            <div className="flex justify-center">
                <Link href="/" className="flex items-center gap-2">
                <span className="font-extrabold text-2xl">Fitte</span>
                </Link>
            </div>
            <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <User className="h-5 w-5" />
                <span className="sr-only">Perfil</span>
                </Button>
            </div>
        </div>
    </header>
  );
}

function MobileHeader({ isVisible }: { isVisible: boolean }) {
    const { toggleSidebar } = useSidebar();
    return (
      <header className={cn(
        "sticky top-0 z-40 flex h-16 items-center justify-between bg-card px-4 transition-transform duration-300 ease-in-out lg:hidden",
        !isVisible && "-translate-y-full"
      )}>
        <Button onClick={toggleSidebar} variant="ghost" size="icon" className="h-10 w-10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir Menu</span>
        </Button>
        <Link href="/" className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-primary">Fitte</h1>
        </Link>
        <div className="w-10" />
      </header>
    )
}

function MobileSheet() {
    const { isMobileSheetOpen, setMobileSheetOpen } = useSidebar();
    const pathname = usePathname();
    const mainNavItems = navItems.filter(item => item.label !== 'Busca');

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
                     {mainNavItems.map(({ href, label, icon: Icon }) => (
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
  const { isVisible } = useAutoHideBars();
  
  const isHomePage = pathname === '/';

  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex flex-col flex-1">
        <MobileHeader isVisible={isVisible} />
        {isHomePage ? null : <DesktopHeader /> }
        <main className={cn("flex-1", isHomePage ? "lg:pt-0" : "lg:pt-20")}>
          {children}
        </main>
        <MobileSheet />
        {showBackButton && <FloatingBackButton />}
        <BottomNav isVisible={isVisible} />
      </div>
    </div>
  );
}
