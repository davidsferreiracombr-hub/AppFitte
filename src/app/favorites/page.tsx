
'use client';

import React, { useMemo } from 'react';
import { getRecipes } from '@/lib/recipes';
import { useFavorites } from '@/hooks/use-favorites';
import { RecipeCard } from '@/components/recipe-card';
import { AppLayout } from '@/components/app-layout';
import { Heart } from 'lucide-react';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function FavoritesPage() {
  const { favorites, isLoaded, addFavorite, removeFavorite } = useFavorites();
  const allRecipes = useMemo(() => getRecipes(), []);

  const favoriteRecipes = useMemo(() => {
    if (!isLoaded) return [];
    return allRecipes.filter(recipe => favorites.includes(recipe.slug));
  }, [favorites, allRecipes, isLoaded]);

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Minhas Receitas <span className="text-primary">Favoritas</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
                Aqui estão as receitas que você mais amou. Bom apetite!
            </p>
        </div>

        <main>
          {!isLoaded && (
            <LoadingSpinner text="Procurando suas delícias preferidas..." />
          )}

          {isLoaded && favoriteRecipes.length === 0 && (
            <div className="text-center py-16 px-6 bg-background rounded-xl border border-dashed max-w-lg mx-auto">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold text-foreground">Nenhuma receita favorita ainda</h3>
                <p className="mt-2 text-base text-muted-foreground">
                    Explore as receitas e clique no coração para salvá-las aqui.
                </p>
            </div>
          )}

          {isLoaded && favoriteRecipes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favoriteRecipes.map(recipe => (
                 <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    isFavorite={favorites.includes(recipe.slug)}
                    onToggleFavorite={() => {
                      if (favorites.includes(recipe.slug)) {
                        removeFavorite(recipe.slug);
                      } else {
                        addFavorite(recipe.slug);
                      }
                    }}
                  />
              ))}
            </div>
          )}
        </main>
      </div>
    </AppLayout>
  );
}
