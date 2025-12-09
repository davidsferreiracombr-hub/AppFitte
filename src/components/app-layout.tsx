'use client';

import React, { useState, createContext, useContext, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Home, LayoutGrid, Heart, Star, Search } from 'lucide-react';
import { BottomNav } from './bottom-nav';
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
    { href: '/search', label: 'Busca', icon: Search },
];

function SidebarNav() {
    const pathname = usePathname();
  
    return (
      <nav className="flex flex-col gap-2 px-4 h-full">
        <div className="flex-1">
            {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} passHref>
                <Button
                variant={pathname === href ? 'secondary' : 'ghost'}
                className='w-full justify-start gap-3 text-base h-12'
                >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
                </Button>
            </Link>
            ))}
        </div>
      </nav>
    );
  }

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col border-r bg-card transition-all duration-300 ease-in-out w-64">
      <div className="flex items-center justify-start h-24 px-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-extrabold text-2xl text-primary">Fitte</span>
        </Link>
      </div>
      <div className="flex-1 py-6 space-y-6 flex flex-col">
        <SidebarNav />
      </div>
    </aside>
  );
}

function MobileHeader() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-center bg-card/95 backdrop-blur-sm px-4 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-primary">Fitte</h1>
            </Link>
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


  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <MobileHeader />
        <main className="flex-1">
          {children}
        </main>
        <MobileSheet />
        {showBackButton && <FloatingBackButton />}
        <BottomNav />
      </div>
    </div>
  );
}
