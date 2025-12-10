
'use client';

import React, { useState, createContext, useContext, useMemo, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
    { href: '/search', label: 'Busca', icon: Search },
];

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { toggleSidebar } = useSidebar();
  const isHomePage = pathname === '/';

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  // Classes base do header
  const headerBaseClasses = "left-0 right-0 z-40 py-4";
  // Classes condicionais
  const headerConditionalClasses = isHomePage 
    ? "absolute top-0 bg-transparent"
    : "sticky top-0 bg-background/80 backdrop-blur-sm border-b";

  return (
    <header className={cn(headerBaseClasses, headerConditionalClasses)}>
      <div className="flex flex-col items-center justify-center">
          {/* Mobile and Universal Header Part */}
          <div className='flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16'>
              <div className="w-1/3 flex justify-start">
                  <Button onClick={toggleSidebar} variant="ghost" size="icon" className={cn(isHomePage ? 'text-white hover:bg-white/10' : 'text-foreground')}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir Menu</span>
                  </Button>
              </div>
              <div className="w-1/3 flex justify-center">
                   <Link href="/" className="flex items-center gap-2">
                      <span className={cn("font-extrabold text-3xl", isHomePage && "text-white")}>Fitte</span>
                  </Link>
              </div>
              <div className="w-1/3 flex justify-end">
                  <Button asChild variant="ghost" size="icon" className={cn(isHomePage ? 'text-white hover:bg-white/10' : 'text-foreground')}>
                      <Link href="/favorites">
                        <Heart className="h-5 w-5" />
                        <span className="sr-only">Favoritos</span>
                      </Link>
                  </Button>
              </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-col items-center gap-4 mt-4 w-full">
            <div className="flex items-center gap-8 text-sm font-medium w-full max-w-2xl">
                <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs">
                    <Input
                        type="search"
                        placeholder="Buscar receita..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={cn(
                        "h-9 pr-10 rounded-full border-transparent text-sm",
                         isHomePage ? "bg-white/20 text-white placeholder:text-white/70 focus:bg-white/30" : "bg-secondary text-foreground"
                        )}
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Search className={cn("h-4 w-4", isHomePage ? "text-white/70" : "text-muted-foreground")} />
                    </button>
                </form>
                <div className='flex items-center gap-6'>
                    {navItems.filter(item => item.href !== '/search').map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                          "transition-colors",
                          isHomePage ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground",
                          pathname === href && (isHomePage ? "font-semibold text-white" : "font-semibold text-primary")
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
  const isHomePage = pathname === '/';
  
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex flex-col flex-1">
        <Header />
        <main className={cn("flex-1", !isHomePage && "pt-8")}>
          {children}
        </main>
        <MobileSheet />
        {!isHomePage && <FloatingBackButton />}
      </div>
    </div>
  );
}
