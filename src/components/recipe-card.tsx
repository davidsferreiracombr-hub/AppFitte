
'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Clock, Flame } from 'lucide-react';
import { type Recipe } from '@/lib/recipes';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Image from 'next/image';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  className?: string;
  priority?: boolean;
  isFeatured?: boolean;
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite, className, priority = false, isFeatured = false }: RecipeCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    onToggleFavorite();
  };

  return (
    <Link 
        href={`/recipe/${recipe.slug}`} 
        className={cn("block group bg-card h-full w-full", className)} 
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
        {recipe.imageUrl && (
          <Image
            src={recipe.imageUrl}
            alt={`Imagem da receita ${recipe.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-primary/80 backdrop-blur-sm px-3 py-1 text-white">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-semibold">{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-green-500/80 backdrop-blur-sm px-3 py-1 text-white">
                <Flame className="h-4 w-4" />
                <span className="text-xs font-semibold">{recipe.calories}</span>
            </div>
        </div>
        <Button
            onClick={handleFavoriteClick}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-9 w-9 rounded-full text-white bg-black/30 backdrop-blur-sm hover:bg-primary/80 hover:text-white"
            aria-label={isFavorite ? 'Desfavoritar receita' : 'Favoritar receita'}
        >
            <Heart className={cn('h-5 w-5 transition-all duration-200', isFavorite ? 'fill-white' : 'fill-transparent')} />
        </Button>
      </div>
      <div className="pt-4">
        <h3 className={cn("font-bold text-foreground group-hover:text-primary transition-colors", isFeatured ? "text-2xl" : "text-lg")}>
            {recipe.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {recipe.description}
        </p>
      </div>
    </Link>
  );
}
