
'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Clock, Flame, Award } from 'lucide-react';
import { type Recipe } from '@/lib/recipes';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  className?: string;
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite, className }: RecipeCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    onToggleFavorite();
  };

  return (
    <Link 
        href={`/recipe/${recipe.slug}`} 
        className={cn("block group relative rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-card border", className)} 
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-base leading-tight line-clamp-2 mb-2 text-foreground flex-1 pr-2">
                {recipe.title}
            </h3>
            <Button
                onClick={handleFavoriteClick}
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground hover:bg-accent"
                aria-label={isFavorite ? 'Desfavoritar receita' : 'Favoritar receita'}
            >
                <Heart className={cn('h-5 w-5', isFavorite ? 'fill-primary text-primary' : 'fill-transparent')} />
            </Button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
          {recipe.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mt-4 pt-4 border-t">
            <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Flame className="h-4 w-4" />
                <span>{recipe.calories}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4" />
                <span>{recipe.difficulty}</span>
            </div>
        </div>
      </div>
    </Link>
  );
}
