
'use client';

import React, { useState, createContext, useContext, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Home, Heart, Search, PanelLeft, Menu } from 'lucide-react';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';

type SidebarContextType = {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
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
  const [isSidebarOpen, setSidebarOpenState] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.cookie.includes(`${SIDEBAR_COOKIE_NAME}=expanded`);
    }
    return true;
  });
  const [isMobileSheetOpen, setMobileSheetOpen] = useState(false);

  const setSidebarOpen = (isOpen: boolean) => {
    setSidebarOpenState(isOpen);
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${isOpen ? 'expanded' : 'collapsed'}; path=/; max-age=31536000`;
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileSheetOpen(prev => !prev);
    } else {
      setSidebarOpen(!isSidebarOpen);
    }
  };

  const value = useMemo(() => ({ 
      isSidebarOpen, 
      setSidebarOpen, 
      isMobileSheetOpen, 
      setMobileSheetOpen,
      toggleSidebar 
    }), [isSidebarOpen, isMobileSheetOpen]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

function SidebarNav() {
    const pathname = usePathname();
    const { isSidebarOpen } = useSidebar();
  
    const navItems = [
      { href: '/', label: 'Início', icon: Home },
      { href: '/favorites', label: 'Favoritos', icon: Heart },
    ];
  
    return (
      <nav className="flex flex-col gap-2 px-4">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} passHref>
            <Button
              variant={pathname === href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3',
                !isSidebarOpen && 'justify-center'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className={cn(isSidebarOpen ? 'inline' : 'hidden')}>{label}</span>
            </Button>
          </Link>
        ))}
      </nav>
    );
  }

function Sidebar() {
  const { isSidebarOpen } = useSidebar();

  return (
    <aside className={cn(
        "hidden lg:flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
        isSidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex items-center h-16 px-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className={cn("font-headline font-bold text-xl", isSidebarOpen ? 'inline' : 'hidden')} style={{color: "hsl(var(--accent-cocoa))"}}>Fitte</span>
        </Link>
      </div>
      <div className="flex-1 py-6 space-y-6">
        <div className={cn("px-4", !isSidebarOpen && "px-2")}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar..." className={cn("pl-9", !isSidebarOpen && "w-full")}/>
            </div>
        </div>
        <SidebarNav />
      </div>
    </aside>
  );
}

function MobileSheet() {
    const { isMobileSheetOpen, setMobileSheetOpen } = useSidebar();

    return (
        <Sheet open={isMobileSheetOpen} onOpenChange={setMobileSheetOpen}>
        <SheetContent side="left" className="p-0 w-72">
            <div className="flex flex-col h-full">
                <div className="flex items-center h-16 px-6 border-b">
                    <Link href="/" className="flex items-center gap-2">
                        <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                         <span className="font-headline font-bold text-xl" style={{color: "hsl(var(--accent-cocoa))"}}>Fitte</span>
                    </Link>
                </div>
                <div className="flex-1 py-6 space-y-4">
                   <div className="px-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar receitas..." className="pl-9"/>
                    </div>
                   </div>
                   <nav className="flex flex-col gap-2 px-4">
                        <Link href="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted">
                            <Home className="h-5 w-5" />
                            Início
                        </Link>
                        <Link href="/favorites" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted">
                            <Heart className="h-5 w-5" />
                            Favoritos
                        </Link>
                    </nav>
                </div>
            </div>
        </SheetContent>
        </Sheet>
    )
}

function Header() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:hidden">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <h1 className="text-lg font-headline font-bold" style={{color: "hsl(var(--accent-cocoa))"}}>Fitte</h1>
    </header>
  );
}

function BottomNav() {
    const pathname = usePathname();
    const navItems = [
      { href: '/', label: 'Início', icon: Home },
      { href: '#', label: 'Buscar', icon: Search },
      { href: '/favorites', label: 'Favoritos', icon: Heart },
    ];
  
    return (
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden h-16 bg-background/95 backdrop-blur-sm border-t z-50">
        <div className="flex justify-around items-center h-full max-w-md mx-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full",
                pathname === href ? 'text-primary' : 'text-muted-foreground'
            )}>
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        <MobileSheet />
        <BottomNav />
      </div>
    </div>
  );
}
