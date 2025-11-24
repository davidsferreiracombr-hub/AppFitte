'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useWelcomeScreen } from '@/hooks/use-welcome-screen';

export function WelcomeScreen() {
  const { showWelcome, isFadingOut, animationEnded } = useWelcomeScreen();

  if (animationEnded) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-primary transition-opacity duration-700 ease-in-out',
        {
          'opacity-100': showWelcome && !isFadingOut,
          'opacity-0': isFadingOut,
        }
      )}
    >
      <div className="flex flex-col items-center gap-4 animate-fade-in-out">
        <svg
          className="h-20 w-20 text-primary-foreground animate-pulse-subtle"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-bold text-4xl text-primary-foreground">
          Fitte
        </span>
      </div>
    </div>
  );
}
