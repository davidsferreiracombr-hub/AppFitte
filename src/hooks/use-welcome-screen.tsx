'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

const WELCOME_SCREEN_KEY = 'fitte_welcome_screen_shown';
const ANIMATION_DURATION = 2500; 
const FADE_OUT_START = 2000; 

type WelcomeScreenContextType = {
  showWelcome: boolean;
  isFadingOut: boolean;
  animationEnded: boolean;
};

const WelcomeScreenContext = createContext<WelcomeScreenContextType>({
  showWelcome: false,
  isFadingOut: false,
  animationEnded: true,
});

export const useWelcomeScreen = () => useContext(WelcomeScreenContext);

export function WelcomeScreenProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WelcomeScreenContextType>({
    showWelcome: false,
    isFadingOut: false,
    animationEnded: true, // Começa como true por padrão
  });

  useEffect(() => {
    try {
      const hasBeenShown = sessionStorage.getItem(WELCOME_SCREEN_KEY);
      
      if (!hasBeenShown) {
        // Se não foi mostrado, inicia a animação
        setState({ showWelcome: true, isFadingOut: false, animationEnded: false });
        sessionStorage.setItem(WELCOME_SCREEN_KEY, 'true');

        // Gatilho para o fade-out
        setTimeout(() => {
          setState(s => ({ ...s, isFadingOut: true }));
        }, FADE_OUT_START);

        // Gatilho para o fim completo da animação
        setTimeout(() => {
          setState(s => ({ ...s, showWelcome: false, animationEnded: true }));
        }, ANIMATION_DURATION);

      } else {
        // Se já foi mostrado nesta sessão, a animação já "terminou" instantaneamente.
        setState({ showWelcome: false, isFadingOut: false, animationEnded: true });
      }
    } catch (error) {
      console.warn("Could not access sessionStorage. Welcome screen will not be shown.");
      // Se houver erro, considera a animação como terminada.
      setState({ showWelcome: false, isFadingOut: false, animationEnded: true });
    }
  }, []);
  
  return (
    <WelcomeScreenContext.Provider value={state}>
      {children}
    </WelcomeScreenContext.Provider>
  );
};
