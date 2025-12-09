
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
        "relative flex flex-col items-center justify-center gap-1 text-white/70 transition-all duration-300 hover:text-white",
        isActive && "text-white"
      )}>
        <Icon className="h-5 w-5" />
        <span className="text-xs font-bold">
          {label}
        </span>
        {isActive && (
          <div className="absolute -bottom-2 h-[3px] w-8 rounded-full bg-white"></div>
        )}
      </div>
    </Link>
  );
}
