
'use client';

import { useState, useEffect, useCallback } from 'react';

export function useAutoHideBars() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const controlNavbar = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const currentScrollY = window.scrollY;

    // Oculta se o usuário rolou mais de 50px em qualquer direção
    if (Math.abs(currentScrollY - lastScrollY) > 50 && currentScrollY > 80) {
      setIsVisible(false);
    }

    setLastScrollY(currentScrollY);

    const newTimeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    setTimeoutId(newTimeoutId);

  }, [lastScrollY, timeoutId]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [controlNavbar, timeoutId]);

  return { isVisible };
}
