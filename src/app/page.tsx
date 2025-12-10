'use client';

import React, { useMemo } from 'react';
import { getRecipes, type Recipe } from '@/lib/recipes';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import { AppLayout } from '@/components/app-layout';
import { MoreRecipesNotice } from '@/components/more-recipes-notice';

export default function Home() {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const allRecipes = useMemo(() => getRecipes(), []);

  // Separa a primeira receita das demais
  const featuredRecipe = allRecipes.find(r => r.id === 124) || allRecipes[0];
  const otherRecipes = allRecipes.filter(r => r.id !== featuredRecipe.id);

  const handleToggleFavorite = (slug: string) => {
    if (favorites.includes(slug)) {
      removeFavorite(slug);
    } else {
      addFavorite(slug);
    }
  };

  return (
    <AppLayout>
      <div className="flex-1 pb-24 lg:pb-8">
        <div className="p-4 sm:p-6 lg:p-8 lg:max-w-7xl lg:mx-auto">
          <div className="mb-6 lg:mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                O que vamos <span className="text-primary">cozinhar</span> hoje?
              </h2>
          </div>
          
          <main className="space-y-10">
            {/* Destaque para a primeira receita */}
            {featuredRecipe && (
              <div>
                 <RecipeCard 
                  key={featuredRecipe.id}
                  recipe={featuredRecipe} 
                  isFavorite={favorites.includes(featuredRecipe.slug)}
                  onToggleFavorite={() => handleToggleFavorite(featuredRecipe.slug)}
                  priority
                  isFeatured
                />
              </div>
            )}

            {/* Seção "Receitas do dia" / "Mais Receitas" */}
            {otherRecipes.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-6">
                  Receitas do dia
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-6">
                  {otherRecipes.map((recipe, index) => (
                      <RecipeCard 
                        key={recipe.id}
                        recipe={recipe} 
                        isFavorite={favorites.includes(recipe.slug)}
                        onToggleFavorite={() => handleToggleFavorite(recipe.slug)}
                        priority={index < 4} // Prioriza algumas imagens na versão desktop
                      />
                  ))}
                </div>
              </div>
            )}
            <MoreRecipesNotice />
          </main>
        </div>
      </div>
    </AppLayout>
  );
}