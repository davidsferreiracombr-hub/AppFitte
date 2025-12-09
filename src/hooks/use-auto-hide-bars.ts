'use client';

import { useState, useEffect, useCallback } from 'react';

export function useAutoHideBars() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const controlNavbar = useCallback(() => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (window.scrollY > lastScrollY && window.scrollY > 80) { // If scrolling down
      setIsVisible(false);
    } else { // If scrolling up
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);

    // Set a new timeout to show the navbar after 2 seconds of no scrolling
    const newTimeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    setTimeoutId(newTimeoutId);

  }, [lastScrollY, timeoutId]);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar);
      // Clear the timeout when the component unmounts
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [controlNavbar, timeoutId]);

  return { isVisible };
}
