
'use client';

import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, Star, Search } from 'lucide-react';
import { NavIcon } from './NavIcon';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/categories', label: 'Categorias', icon: LayoutGrid },
  { href: '/search', label: 'Busca', icon: Search },
  { href: '/favorites', label: 'Favoritos', icon: Heart },
  { href: '/reviews', label: 'Avaliações', icon: Star },
];

interface BottomNavProps {
  isVisible: boolean;
}

export function BottomNav({ isVisible }: BottomNavProps) {
  const pathname = usePathname();

  // This component is no longer rendered, but we keep the file to avoid breaking imports.
  // The logic was moved to the MobileSheet in app-layout.tsx.
  // Returning null makes it render nothing.
  return null;
}
