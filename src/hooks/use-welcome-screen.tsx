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
  const [showWelcome, setShowWelcome] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(true);

  useEffect(() => {
    try {
      const hasBeenShown = sessionStorage.getItem(WELCOME_SCREEN_KEY);
      if (!hasBeenShown) {
        setAnimationEnded(false);
        setShowWelcome(true);
        sessionStorage.setItem(WELCOME_SCREEN_KEY, 'true');

        setTimeout(() => {
          setIsFadingOut(true);
        }, FADE_OUT_START);

        setTimeout(() => {
          setShowWelcome(false);
          setAnimationEnded(true);
        }, ANIMATION_DURATION);
      }
    } catch (error) {
      console.warn("Could not access sessionStorage. Welcome screen will not be shown.");
      setAnimationEnded(true);
    }
  }, []);
  
  const value = { showWelcome, isFadingOut, animationEnded };

  return (
    <WelcomeScreenContext.Provider value={value}>
      {children}
    </WelcomeScreenContext.Provider>
  );
};
