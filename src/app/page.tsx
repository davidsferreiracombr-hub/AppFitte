
'use client';

import React, { useMemo } from 'react';
import { getRecipes, type Recipe } from '@/lib/recipes';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import { AppLayout } from '@/components/app-layout';

export default function Home() {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const allRecipes = useMemo(() => getRecipes(), []);

  // Separa a primeira receita das demais
  const [firstRecipe, ...otherRecipes] = allRecipes;

  const handleToggleFavorite = (slug: string) => {
    if (favorites.includes(slug)) {
      removeFavorite(slug);
    } else {
      addFavorite(slug);
    }
  };

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="mb-8 text-left">
            <p className="text-muted-foreground text-lg">Olá,</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              O que vamos <span className="text-primary">cozinhar</span> hoje?
            </h2>
        </div>
        
        <main className="space-y-12">
          {/* Destaque para a primeira receita na versão mobile */}
          {firstRecipe && (
            <div className="lg:hidden">
               <RecipeCard 
                key={firstRecipe.id}
                recipe={firstRecipe} 
                isFavorite={favorites.includes(firstRecipe.slug)}
                onToggleFavorite={() => handleToggleFavorite(firstRecipe.slug)}
                priority
              />
            </div>
          )}

          {/* Grade para desktop, exibindo todas as receitas */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allRecipes.map((recipe, index) => (
                <RecipeCard 
                  key={recipe.id}
                  recipe={recipe} 
                  isFavorite={favorites.includes(recipe.slug)}
                  onToggleFavorite={() => handleToggleFavorite(recipe.slug)}
                  priority={index < 5}
                />
            ))}
          </div>

          {/* Seção "Mais Receitas" para mobile, exibindo o restante */}
          {otherRecipes.length > 0 && (
            <div className="lg:hidden">
              <h3 className="text-2xl font-bold tracking-tight text-foreground mb-6">Mais Receitas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherRecipes.map((recipe) => (
                    <RecipeCard 
                      key={recipe.id}
                      recipe={recipe} 
                      isFavorite={favorites.includes(recipe.slug)}
                      onToggleFavorite={() => handleToggleFavorite(recipe.slug)}
                    />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </AppLayout>
  );
}
