
'use client';

import { useState, useEffect, useCallback } from 'react';

export function useAutoHideBars() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const controlNavbar = useCallback(() => {
    // Esconde a barra assim que o scroll começa
    if (window.scrollY > lastScrollY && window.scrollY > 80) { // descendo
        setIsVisible(false);
    } else if (window.scrollY < lastScrollY) { // subindo
        setIsVisible(false);
    }

    // Limpa o timeout anterior para reiniciar a contagem
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Define um novo timeout para mostrar a barra depois que o scroll parar
    const newTimeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 200); // 200ms de inatividade para mostrar a barra
    setTimeoutId(newTimeoutId);

    setLastScrollY(window.scrollY);

  }, [lastScrollY, timeoutId]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar, { passive: true });

    return () => {
      window.removeEventListener('scroll', controlNavbar);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [controlNavbar, timeoutId]);

  return { isVisible };
}
