'use client';

import React, { useMemo } from 'react';
import { getRecipes, type Recipe } from '@/lib/recipes';
import { useFavorites } from '@/hooks/use-favorites';
import { RecipeCard } from '@/components/recipe-card';
import { AppLayout } from '@/components/app-layout';

export default function FavoritesPage() {
  const { favorites, isLoaded, addFavorite, removeFavorite } = useFavorites();
  const allRecipes = useMemo(() => getRecipes(), []);

  const favoriteRecipes = useMemo(() => {
    if (!isLoaded) return [];
    return allRecipes.filter(recipe => favorites.includes(recipe.slug));
  }, [favorites, allRecipes, isLoaded]);

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="text-left mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight" style={{color: "hsl(var(--accent-cocoa))"}}>
                Minhas Receitas Favoritas
            </h2>
            <p style={{color: "hsl(var(--text-primary))"}} className="opacity-70 mt-2 text-lg max-w-3xl">
                Aqui estão as receitas que você mais amou. Bom apetite!
            </p>
        </div>

        <main>
          {!isLoaded && (
            <div className="text-center" style={{color: "hsl(var(--text-primary))"}}>
              Carregando seus favoritos...
            </div>
          )}

          {isLoaded && favoriteRecipes.length === 0 && (
            <div className="text-center py-16 px-6 bg-white/50 rounded-xl border border-dashed">
                <h3 className="mt-4 text-xl font-semibold" style={{color: "hsl(var(--accent-cocoa))"}}>Nenhuma receita favorita ainda</h3>
                <p className="mt-2 text-base opacity-70" style={{color: "hsl(var(--text-primary))"}}>
                    Explore as receitas e clique no coração para salvá-las aqui.
                </p>
            </div>
          )}

          {isLoaded && favoriteRecipes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
