
'use client';

import React, { useState, createContext, useContext, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Home, Heart, Search, Menu, LayoutGrid, LogOut } from 'lucide-react';
import { BottomNav } from './bottom-nav';
import { useAuth } from '@/hooks/use-auth';

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

const navItems = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/categories', label: 'Categorias', icon: LayoutGrid },
    { href: '/favorites', label: 'Favoritos', icon: Heart },
];

function SidebarNav() {
    const pathname = usePathname();
    const { logout } = useAuth();
  
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
        <div className="mt-auto">
             <Button
              variant='ghost'
              className='w-full justify-start gap-3 text-base h-12'
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </Button>
        </div>
      </nav>
    );
  }

function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col border-r bg-card transition-all duration-300 ease-in-out w-64">
      <div className="flex items-center justify-start h-24 px-6 border-b">
        <Link href="/" className="flex items-center gap-3">
          <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="font-bold text-xl text-foreground">Fitte</span>
        </Link>
      </div>
      <div className="flex-1 py-6 space-y-6 flex flex-col">
        <div className="px-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar..." className="pl-9 bg-background h-11"/>
            </div>
        </div>
        <SidebarNav />
      </div>
    </aside>
  );
}

function MobileHeader() {
    const { toggleSidebar } = useSidebar();
    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-card/95 backdrop-blur-sm px-4 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
                <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <h1 className="text-lg font-bold text-foreground">Fitte</h1>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-6 w-6"/>
            </Button>
        </header>
    )
}

function MobileSheet() {
    const { isMobileSheetOpen, setMobileSheetOpen } = useSidebar();
    const { logout } = useAuth();
    const pathname = usePathname();

    return (
        <Sheet open={isMobileSheetOpen} onOpenChange={setMobileSheetOpen}>
        <SheetContent side="left" className="p-0 w-72 bg-card">
            <div className="flex flex-col h-full">
                <div className="flex items-center h-20 px-6 border-b">
                    <Link href="/" className="flex items-center gap-2">
                        <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                         <span className="font-bold text-xl text-foreground">Fitte</span>
                    </Link>
                </div>
                <div className="flex-1 py-6 space-y-4">
                   <div className="px-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar receitas..." className="pl-9 bg-background h-11"/>
                    </div>
                   </div>
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
                 <div className="px-4 py-6">
                    <Button
                        variant='ghost'
                        className='w-full justify-start gap-3 text-base h-12'
                        onClick={() => { logout(); setMobileSheetOpen(false); }}
                        >
                        <LogOut className="h-5 w-5" />
                        <span>Sair</span>
                    </Button>
                </div>
            </div>
        </SheetContent>
        </Sheet>
    )
}

export function AppLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <MobileHeader />
        <main className="flex-1">
          {children}
        </main>
        <MobileSheet />
        <BottomNav />
      </div>
    </div>
  );
}
