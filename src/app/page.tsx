
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
import { Clock, Flame, Heart, Home as HomeIcon, LayoutGrid, Star } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function Home() {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const allRecipes = useMemo(() => getRecipes(), []);

  const featuredRecipe = allRecipes.find(r => r.id === 124) || allRecipes[0];
  const otherRecipes = allRecipes.filter(r => r.id !== featuredRecipe.id);
  const isFeaturedFavorite = favorites.includes(featuredRecipe.slug);

  const handleToggleFavorite = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorites.includes(slug)) {
      removeFavorite(slug);
    } else {
      addFavorite(slug);
    }
  };

  return (
    <AppLayout>
      <div className="flex-1 pb-24 lg:pb-8">

        {/* Featured Recipe Hero Section for Desktop */}
        {featuredRecipe && (
          <div className="hidden lg:block relative">
            <Link href={`/recipe/${featuredRecipe.slug}`} className="group block">
              <div className="relative overflow-hidden shadow-lg h-[500px] w-full">
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
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8">
                    <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                        O que vamos <span className="text-primary">cozinhar</span> hoje?
                    </h2>
                    <h3 className="text-4xl font-bold tracking-tight mb-2" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                      {featuredRecipe.title}
                    </h3>
                    <p className="max-w-xl text-lg line-clamp-2 opacity-90" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.6)' }}>
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
                    <h3 className="text-xl font-bold tracking-tight text-white text-center">
                        Pronta(o) para se aventurar em um universo de sabores saudáveis e deliciosos?
                    </h3>
                </div>
                <Button
                    onClick={(e) => handleToggleFavorite(e, featuredRecipe.slug)}
                    variant="ghost"
                    size="icon"
                    className="absolute top-28 right-8 h-12 w-12 rounded-full text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    aria-label={isFeaturedFavorite ? 'Desfavoritar receita' : 'Favoritar receita'}
                >
                    <Heart className={cn('h-6 w-6 transition-all duration-200 group-hover:text-red-400', isFeaturedFavorite ? 'fill-red-500 text-red-500' : 'fill-white/50 text-white')} />
                </Button>
              </div>
            </Link>
          </div>
        )}
        
        <div className="p-4 sm:p-6 lg:p-0">
          {/* Mobile Header Title */}
          <div className="mb-6 lg:mb-8 lg:hidden">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                O que vamos <span className="text-primary">cozinhar</span> hoje?
              </h2>
          </div>
          
          <main className="space-y-10 lg:max-w-7xl lg:mx-auto lg:px-8 lg:mt-12">
            {/* Featured Recipe Card for Mobile */}
            {featuredRecipe && (
              <div className="lg:hidden">
                 <RecipeCard 
                  key={featuredRecipe.id}
                  recipe={featuredRecipe} 
                  isFavorite={isFeaturedFavorite}
                  onToggleFavorite={() => {
                    if (favorites.includes(featuredRecipe.slug)) {
                      removeFavorite(featuredRecipe.slug);
                    } else {
                      addFavorite(featuredRecipe.slug);
                    }
                  }}
                  priority
                  isFeatured
                />
              </div>
            )}

            {/* Seção "Receitas do dia" / "Mais Receitas" */}
            {otherRecipes.length > 0 && (
              <div className="lg:mt-8">
                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-6 lg:text-center">
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
