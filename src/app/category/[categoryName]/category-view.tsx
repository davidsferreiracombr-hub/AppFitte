'use client';

import React from 'react';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import type { Recipe } from '@/lib/recipes';

interface CategoryViewProps {
  recipes: Recipe[];
}

export function CategoryView({ recipes }: CategoryViewProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  return (
    <>
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recipes.map(recipe => (
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
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p>Nenhuma receita encontrada nesta categoria.</p>
        </div>
      )}
    </>
  );
}
