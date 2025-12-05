
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, LayoutGrid, Heart, Bot, Search } from 'lucide-react';
import { NavIcon } from './NavIcon';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/categories', label: 'Categorias', icon: LayoutGrid },
  { href: '/favorites', label: 'Favoritos', icon: Heart },
  { href: '/ai-suggestion', label: 'Sugestão IA', icon: Bot },
];

export function BottomNav() {
  const pathname = usePathname();

  // Divide os itens para colocar o botão de pesquisa no meio
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  return (
    <header className="fixed bottom-0 left-0 z-50 w-full h-20 lg:hidden">
        <div className="relative h-full w-full">
             {/* Fundo da barra com recorte */}
            <div className="absolute bottom-0 h-16 w-full border-t bg-card/95 backdrop-blur-sm">
                <svg
                    height="100%"
                    width="100%"
                    className="absolute top-[-30px] left-0 right-0"
                    viewBox="0 0 375 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 30L0 29.5C102.083 29.5 124.965 2.5 187.5 2.5C250.035 2.5 272.917 29.5 375 29.5V30H0Z"
                        className="fill-current text-card/95"
                    />
                </svg>
            </div>
            
            {/* Ícones de Navegação */}
            <div className="absolute bottom-0 grid h-16 w-full grid-cols-5 items-center">
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
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform justify-center">
                <Button 
                    size="icon" 
                    className="h-16 w-16 rounded-full bg-primary shadow-lg ring-4 ring-background"
                    aria-label="Pesquisar Receitas"
                    >
                    <Search className="h-7 w-7" />
                </Button>
            </div>
        </div>
    </header>
  );
}
