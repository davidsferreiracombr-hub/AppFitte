
'use client';

import { useState, useEffect, useCallback } from 'react';

export function useAutoHideBars() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Mostra a barra se estiver no topo
    if (currentScrollY <= 80) {
      setIsVisible(true);
    } 
    // Esconde a barra ao rolar para baixo
    else if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } 
    // Mostra a barra ao rolar para cima
    else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar, { passive: true });

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [controlNavbar]);

  return { isVisible };
}

