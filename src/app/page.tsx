
'use client';

import React, { useMemo } from 'react';
import { getRecipes, type Recipe } from '@/lib/recipes';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import { AppLayout } from '@/components/app-layout';

export default function Home() {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const allRecipes = useMemo(() => {
    // Apenas busca todas as receitas, sem agrupar
    return getRecipes();
  }, []);

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="mb-12 text-left">
            <p className="text-muted-foreground text-lg">Olá,</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
              O que vamos <span className="text-primary">cozinhar</span> hoje?
            </h2>
        </div>
        
        <main>
          {/* Nova grade de receitas que substitui os carrosséis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allRecipes.map((recipe) => (
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
        </main>
      </div>
    </AppLayout>
  );
}
