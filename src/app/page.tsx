
'use client';

import React, { useMemo } from 'react';
import { getRecipes, type Recipe } from '@/lib/recipes';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import { AppLayout } from '@/components/app-layout';
import { MoreRecipesNotice } from '@/components/more-recipes-notice';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clock, Flame, Heart } from 'lucide-react';
import { Home as HomeIcon, LayoutGrid, Star, Search } from 'lucide-react';


export default function HomePage() {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const allRecipes = useMemo(() => getRecipes(), []);

  const featuredRecipe = allRecipes.find(r => r.id === 124) || allRecipes[0];
  const otherRecipes = allRecipes.filter(r => r.id !== featuredRecipe.id);

  return (
    <AppLayout>
      <div className="flex-1">

        {featuredRecipe && (
          <div className="relative">
            <div className="relative overflow-hidden h-[500px] lg:h-[400px] w-full">
              {featuredRecipe.imageUrl && (
                  <Image
                    src={featuredRecipe.imageUrl}
                    alt={`Imagem da receita ${featuredRecipe.title}`}
                    fill
                    className="object-cover"
                    priority
                  />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6 pt-24">
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                      O que vamos <span className="text-primary">cozinhar</span> hoje?
                  </h2>
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-2" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                    {featuredRecipe.title}
                  </h3>
                  <p className="max-w-xl text-md md:text-lg line-clamp-1 opacity-90" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.6)' }}>
                    {featuredRecipe.description}
                  </p>
                  <div className="flex items-center gap-6 text-white mt-4">
                      <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          <span className="text-sm font-semibold">{featuredRecipe.prepTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Flame className="h-5 w-5" />
                          <span className="text-sm font-semibold">{featuredRecipe.calories}</span>
                      </div>
                  </div>
              </div>
               <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/20 backdrop-blur-sm">
                  <h3 className="text-sm md:text-xl font-bold tracking-tight text-white text-center">
                      Pronta(o) para se aventurar em um universo de sabores saudáveis e deliciosos?
                  </h3>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-4 sm:p-6 lg:p-8">
          <main className="space-y-10 container mx-auto">
            {otherRecipes.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-6 text-center">
                  Receitas do dia
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-6">
                  {otherRecipes.map((recipe, index) => (
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
                        priority={index < 4}
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
