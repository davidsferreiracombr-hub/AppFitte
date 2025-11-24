'use client';

import React, { useMemo } from 'react';
import { getRecipes, type Recipe } from '@/lib/recipes';
import { useFavorites } from '@/hooks/use-favorites';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ChefHat, Clock, Flame, Info, Heart, ArrowLeft, CakeSlice } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryIcons: { [key: string]: React.ElementType } = {
  'brownie': ChefHat,
  'cookie': ChefHat,
  'bolo': ChefHat,
  'torta': ChefHat,
  'cheesecake': ChefHat,
  'mousse': ChefHat,
  'pudim': ChefHat,
  'manjar': ChefHat,
  'creme': ChefHat,
  'vegano': ChefHat,
  'doce': ChefHat,
  'brigadeiro': ChefHat,
  'panqueca': ChefHat,
  'sem glúten': ChefHat,
  'default': ChefHat,
};

const getCategoryIcon = (tags: string[]) => {
  for (const tag of tags) {
    if (categoryIcons[tag.toLowerCase()]) {
      return categoryIcons[tag.toLowerCase()];
    }
  }
  return categoryIcons['default'];
};


export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();
  const allRecipes = useMemo(() => getRecipes(), []);

  const favoriteRecipes = useMemo(() => {
    if (!isLoaded) return [];
    return allRecipes.filter(recipe => favorites.includes(recipe.slug));
  }, [favorites, allRecipes, isLoaded]);

  return (
    <div className="min-h-screen font-body bg-background">
      <header className="bg-background/80 backdrop-blur-sm shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                    <CakeSlice className="h-9 w-9 text-primary" />
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Fitte
                    </h1>
                </div>
                 <div className="flex items-center gap-4">
                    <Link href="/" passHref>
                        <Button variant="ghost" className="text-primary hover:text-primary/90">
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
            <h2 className="text-5xl md:text-7xl font-headline font-extrabold text-foreground tracking-tight">
                Minhas Receitas Favoritas
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-3xl mx-auto">
                Aqui estão as receitas que você mais amou. Bom apetite!
            </p>
        </div>

        <main>
          {!isLoaded && (
            <div className="text-center text-muted-foreground">
              Carregando seus favoritos...
            </div>
          )}

          {isLoaded && favoriteRecipes.length === 0 && (
            <div className="text-center py-16 px-6 bg-card rounded-xl border border-dashed">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold text-foreground">Nenhuma receita favorita ainda</h3>
                <p className="mt-2 text-base text-muted-foreground">
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
              {favoriteRecipes.map(recipe => {
                const Icon = getCategoryIcon(recipe.tags);
                return (
                  <Link href={`/recipe/${recipe.slug}`} key={recipe.id} legacyBehavior>
                    <a className="block group">
                      <Card className="h-full flex flex-col rounded-xl shadow-md transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                        <CardHeader className="flex-row items-center gap-4 pb-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-base font-headline leading-tight flex-1 text-foreground">{recipe.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-between pt-0">
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{recipe.description}</p>
                          <div className="text-xs text-muted-foreground space-y-2 pt-4 border-t border-border/50 mt-auto">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4"/> <span>{recipe.prepTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Flame className="h-4 w-4"/> <span>{recipe.calories}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Info className="h-4 w-4"/> <span>Dificuldade: {recipe.difficulty}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
