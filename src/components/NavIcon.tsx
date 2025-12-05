
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavIconProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
}

export function NavIcon({ href, label, icon: Icon, isActive }: NavIconProps) {
  return (
    <Link href={href} passHref>
      <div className="flex h-16 w-full flex-col items-center justify-center gap-1">
        <div
          className={cn(
            'flex h-8 w-12 items-center justify-center rounded-lg text-muted-foreground transition-all duration-300',
            isActive ? 'bg-primary/10 text-primary' : ''
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <span className={cn(
          'text-xs font-bold transition-all duration-300',
          isActive ? 'text-primary' : 'text-muted-foreground'
        )}>
          {label}
        </span>
      </div>
    </Link>
  );
}
