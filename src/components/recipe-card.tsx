
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
        className={cn("block group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-card border", className)} 
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 text-foreground flex-1 pr-2 group-hover:text-primary transition-colors">
                {recipe.title}
            </h3>
            <Button
                onClick={handleFavoriteClick}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:bg-primary/10 -mt-1 -mr-1"
                aria-label={isFavorite ? 'Desfavoritar receita' : 'Favoritar receita'}
            >
                <Heart className={cn('h-5 w-5 transition-all duration-200', isFavorite ? 'fill-primary text-primary' : 'fill-transparent')} />
            </Button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {recipe.description}
        </p>
        <div className="flex items-center gap-x-4 text-muted-foreground mt-4 pt-4 border-t">
            <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Flame className="h-4 w-4" />
                <span className="text-sm">{recipe.calories}</span>
            </div>
        </div>
      </div>
    </Link>
  );
}
