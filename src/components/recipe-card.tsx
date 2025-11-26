
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Clock, Flame } from 'lucide-react';
import { type Recipe, getRecipeImage } from '@/lib/recipes';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  className?: string;
  priority?: boolean;
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite, className, priority = false }: RecipeCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    onToggleFavorite();
  };

  const recipeImage = getRecipeImage(recipe.category);

  return (
    <Link 
        href={`/recipe/${recipe.slug}`} 
        className={cn("block group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-card border", className)} 
    >
      <div className="relative w-full h-32">
        {recipeImage ? (
             <Image
                src={recipeImage}
                alt={recipe.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                priority={priority}
            />
        ) : (
            <div className="w-full h-full bg-muted"></div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-base leading-tight line-clamp-2 text-foreground flex-1 pr-2 group-hover:text-primary transition-colors">
                {recipe.title}
            </h3>
            <Button
                onClick={handleFavoriteClick}
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground hover:bg-primary/10 -mt-1 -mr-1 shrink-0"
                aria-label={isFavorite ? 'Desfavoritar receita' : 'Favoritar receita'}
            >
                <Heart className={cn('h-5 w-5 transition-all duration-200', isFavorite ? 'fill-primary text-primary' : 'fill-transparent')} />
            </Button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
          {recipe.description}
        </p>
        <div className="flex items-center gap-x-4 text-muted-foreground mt-auto pt-3 border-t">
            <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Flame className="h-4 w-4" />
                <span className="text-xs font-medium">{recipe.calories}</span>
            </div>
        </div>
      </div>
    </Link>
  );
}
