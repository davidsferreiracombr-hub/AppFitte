"use client";

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'fitte_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
        console.warn("Could not access localStorage. Favorites feature will be limited.");
    }
    setIsLoaded(true);
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    } catch (error) {
        console.warn("Could not save to localStorage. Favorites won't be persisted.");
        setFavorites(newFavorites);
    }
  };

  const addFavorite = useCallback((slug: string) => {
    if (favorites.includes(slug)) return;
    const newFavorites = [...favorites, slug];
    saveFavorites(newFavorites);
  }, [favorites]);

  const removeFavorite = useCallback((slug: string) => {
    const newFavorites = favorites.filter((fav) => fav !== slug);
    saveFavorites(newFavorites);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isLoaded };
}

    