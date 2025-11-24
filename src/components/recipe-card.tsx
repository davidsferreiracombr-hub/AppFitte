
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    e.preventDefault(); // Prevent link navigation
    onToggleFavorite();
  };

  return (
    <Link href={`/recipe/${recipe.slug}`} passHref>
      <a className={cn("block group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300", className)} style={{ borderRadius: 'var(--radius)'}}>
        <div className="aspect-w-4 aspect-h-3 w-full">
          <Image
            src={`https://picsum.photos/seed/${recipe.id}/400/300`}
            alt={recipe.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        <Button
          onClick={handleFavoriteClick}
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          <Heart className={cn('h-5 w-5', isFavorite ? 'fill-white' : 'fill-transparent')} />
        </Button>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-headline font-bold text-lg leading-tight line-clamp-2 mb-2">
            {recipe.title}
          </h3>
          <div className="flex items-center gap-4 text-xs opacity-90">
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
      </a>
    </Link>
  );
}
