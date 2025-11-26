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
  animationEnded: false, // Default to false to prevent flash
});

export const useWelcomeScreen = () => useContext(WelcomeScreenContext);

export function WelcomeScreenProvider({ children }: { children: ReactNode }) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  // Start with animationEnded as false to prevent content flash
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    try {
      const hasBeenShown = localStorage.getItem(WELCOME_SCREEN_KEY);
      
      if (!hasBeenShown) {
        // If it hasn't been shown, we run the animation.
        // animationEnded is already false, which is correct.
        setShowWelcome(true);
        localStorage.setItem(WELCOME_SCREEN_KEY, 'true');

        setTimeout(() => {
          setIsFadingOut(true);
        }, FADE_OUT_START);

        setTimeout(() => {
          setShowWelcome(false);
          setAnimationEnded(true); // Mark as ended only after animation completes
        }, ANIMATION_DURATION);

      } else {
        // If it has been shown, we don't need the animation.
        // Mark animation as ended immediately so content can show.
        setAnimationEnded(true);
      }
    } catch (error) {
      console.warn("Could not access localStorage. Welcome screen will not be shown.");
      // In case of error, just end the "animation" to show content.
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
