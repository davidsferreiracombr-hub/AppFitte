
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, LayoutGrid, Heart, Star, Search } from 'lucide-react';
import { NavIcon } from './NavIcon';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/categories', label: 'Categorias', icon: LayoutGrid },
  { href: '/favorites', label: 'Favoritos', icon: Heart },
  { href: '/reviews', label: 'Avaliações', icon: Star },
];

export function BottomNav() {
  const pathname = usePathname();

  // Divide os itens para colocar o botão de pesquisa no meio
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  return (
    <header className="fixed bottom-0 left-0 z-50 w-full h-16 lg:hidden">
        <div className="relative h-full w-full">
             {/* Fundo da barra com recorte */}
            <div className="absolute bottom-0 h-14 w-full border-t bg-card">
                <svg
                    height="100%"
                    width="100%"
                    className="absolute top-[-20px] left-0 right-0"
                    viewBox="0 0 375 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 20L0 19.5C102.083 19.5 130.417 0.5 187.5 0.5C244.583 0.5 272.917 19.5 375 19.5V20H0Z"
                        className="fill-card"
                    />
                </svg>
            </div>
            
            {/* Ícones de Navegação */}
            <div className="absolute bottom-0 grid h-14 w-full grid-cols-5 items-center">
                <div className="col-span-2 flex justify-around">
                    {leftItems.map(item => (
                        <NavIcon key={item.href} {...item} isActive={pathname === item.href} />
                    ))}
                </div>

                <div className="col-span-1">
                    {/* Espaço para o botão flutuante */}
                </div>

                <div className="col-span-2 flex justify-around">
                     {rightItems.map(item => (
                        <NavIcon key={item.href} {...item} isActive={pathname === item.href} />
                    ))}
                </div>
            </div>

             {/* Botão de Pesquisa Flutuante */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform justify-center">
                <Button 
                    asChild
                    size="icon" 
                    className="h-14 w-14 rounded-full bg-primary shadow-lg ring-4 ring-background"
                    aria-label="Pesquisar Receitas"
                    >
                    <Link href="/search">
                      <Search className="h-6 w-6" />
                    </Link>
                </Button>
            </div>
        </div>
    </header>
  );
}


