
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
      <div className={cn(
        "relative flex flex-col items-center justify-center gap-1 text-muted-foreground transition-all duration-300 hover:text-primary group",
        isActive && "text-primary"
      )}>
        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-active:scale-125" />
        <span className="text-xs font-bold">
          {label}
        </span>
        {isActive && (
          <div className="absolute -bottom-2 h-[3px] w-8 rounded-full bg-primary"></div>
        )}
      </div>
    </Link>
  );
}
