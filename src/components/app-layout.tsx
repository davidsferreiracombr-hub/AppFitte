
'use client';

import React, { useState, createContext, useContext, useMemo, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, LayoutGrid, Heart, Star, Search, Menu, User } from 'lucide-react';
import { Input } from './ui/input';
import { FloatingBackButton } from './floating-back-button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';

type SidebarContextType = {
  isMobileSheetOpen: boolean;
  setMobileSheetOpen: (isOpen: boolean) => void;
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
  
  const value = useMemo(() => ({ 
      isMobileSheetOpen, 
      setMobileSheetOpen,
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

function MobileSheet() {
    const { setMobileSheetOpen } = useSidebar();
    const pathname = usePathname();

    useEffect(() => {
        setMobileSheetOpen(false);
    }, [pathname, setMobileSheetOpen]);
    
    return (
        <SheetContent side="left" className="w-3/4 sm:w-1/2">
            <div className="flex flex-col h-full">
                <Link href="/" className="mb-8">
                    <h2 className="text-3xl font-extrabold text-primary">Fitte</h2>
                </Link>
                <nav className="flex flex-col gap-4">
                    {navItems.map(({ href, label, icon: Icon }) => (
                         <SheetClose asChild key={href}>
                            <Link
                                href={href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-3 text-lg font-semibold transition-all",
                                    pathname === href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {label}
                            </Link>
                        </SheetClose>
                    ))}
                </nav>
            </div>
        </SheetContent>
    );
}

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { isMobileSheetOpen, setMobileSheetOpen } = useSidebar();
  
  const isTransparentPage = pathname === '/' || pathname.startsWith('/recipe/');

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const headerClasses = cn(
    "absolute top-0 left-0 right-0 z-40 py-4",
    isTransparentPage ? "bg-transparent" : "sticky bg-background/80 backdrop-blur-sm border-b"
  );
  
  const textClasses = isTransparentPage ? "text-white" : "text-foreground";

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
            {/* Desktop and Mobile top part */}
            <div className='flex items-center justify-between lg:justify-center w-full h-16 relative'>
                {/* Mobile Menu Icon */}
                <Sheet open={isMobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className={cn("lg:hidden", textClasses)}>
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Abrir menu</span>
                        </Button>
                    </SheetTrigger>
                    <MobileSheet />
                </Sheet>

                {/* Logo */}
                <div className="text-center absolute left-1/2 -translate-x-1/2">
                     <Link href="/" className="flex items-center gap-2">
                        <span className={cn("font-extrabold text-3xl", textClasses, "lg:text-primary")}>Fitte</span>
                    </Link>
                </div>
                
                 {/* Placeholder for right side on mobile to keep logo centered */}
                <div className="lg:hidden w-10"></div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-col items-center gap-4 w-full">
              <div className="flex items-center justify-center gap-8 text-sm font-medium">
                  {navItems.filter(item => item.href !== '/search').map(({ href, label }) => (
                  <Link
                      key={href}
                      href={href}
                      className={cn(
                        "transition-colors",
                        isTransparentPage ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground",
                        pathname === href && (isTransparentPage ? "font-semibold text-white" : "font-semibold text-primary")
                      )}
                  >
                      {label}
                  </Link>
                  ))}
              </div>
              <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm mt-2">
                  <Input
                      type="search"
                      placeholder="Buscar receita..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={cn(
                      "h-9 pr-10 rounded-full border-transparent text-sm w-full",
                       isTransparentPage ? "bg-white/20 text-white placeholder:text-white/70 focus:bg-white/30" : "bg-secondary text-foreground"
                      )}
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Search className={cn("h-4 w-4", isTransparentPage ? "text-white/70" : "text-muted-foreground")} />
                  </button>
              </form>
            </nav>
        </div>
      </div>
    </header>
  );
}


export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <div className="flex flex-col flex-1">
          <Header />
          <main className={cn("flex-1", !(pathname === '/' || pathname.startsWith('/recipe/')) && "pt-32")}>
            {children}
          </main>
          {!(isHomePage) && <FloatingBackButton />}
        </div>
      </div>
    </SidebarProvider>
  );
}
