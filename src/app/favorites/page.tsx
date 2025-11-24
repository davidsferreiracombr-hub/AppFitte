'use client';

import React, { useMemo } from 'react';
import { getRecipes, type Recipe } from '@/lib/recipes';
import { useFavorites } from '@/hooks/use-favorites';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecipeCard } from '@/components/recipe-card';

export default function FavoritesPage() {
  const { favorites, isLoaded, addFavorite, removeFavorite } = useFavorites();
  const allRecipes = useMemo(() => getRecipes(), []);

  const favoriteRecipes = useMemo(() => {
    if (!isLoaded) return [];
    return allRecipes.filter(recipe => favorites.includes(recipe.slug));
  }, [favorites, allRecipes, isLoaded]);

  return (
    <div className="min-h-screen font-body">
      <header className="bg-background/80 backdrop-blur-sm shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold" style={{color: "hsl(var(--accent-cocoa))"}}>
                        Fitte
                    </h1>
                </div>
                 <div className="flex items-center gap-4">
                    <Link href="/" passHref>
                        <Button variant="ghost" className="hover:text-accent-cocoa/90" style={{color: "hsl(var(--accent-cocoa))"}}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Todas as Receitas
                        </Button>
                     </Link>
                </div>
            </div>
        </div>
      </header>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight" style={{color: "hsl(var(--accent-cocoa))"}}>
                Minhas Receitas Favoritas
            </h2>
            <p style={{color: "hsl(var(--text-primary))"}} className="opacity-70 mt-4 text-lg max-w-3xl mx-auto">
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
                <div className="mt-6">
                    <Link href="/" passHref>
                        <Button>
                           Explorar Receitas
                        </Button>
                    </Link>
                </div>
            </div>
          )}

          {isLoaded && favoriteRecipes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );
}
