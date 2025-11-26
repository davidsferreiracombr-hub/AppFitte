
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
    animationEnded: true, 
  });

  useEffect(() => {
    try {
      const hasBeenShown = sessionStorage.getItem(WELCOME_SCREEN_KEY);
      
      if (!hasBeenShown) {
        setState({ showWelcome: true, isFadingOut: false, animationEnded: false });
        sessionStorage.setItem(WELCOME_SCREEN_KEY, 'true');

        setTimeout(() => {
          setState(s => ({ ...s, isFadingOut: true }));
        }, FADE_OUT_START);

        setTimeout(() => {
          setState(s => ({ ...s, showWelcome: false, animationEnded: true }));
        }, ANIMATION_DURATION);

      } else {
        setState({ showWelcome: false, isFadingOut: false, animationEnded: true });
      }
    } catch (error) {
      console.warn("Could not access sessionStorage. Welcome screen will not be shown.");
      setState({ showWelcome: false, isFadingOut: false, animationEnded: true });
    }
  }, []);
  
  return (
    <WelcomeScreenContext.Provider value={state}>
      {children}
    </WelcomeScreenContext.Provider>
  );
};
