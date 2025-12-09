
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
      <div className={cn(
        "relative rounded-2xl overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105",
        isFeatured ? "md:aspect-[4/3.2] aspect-video" : "aspect-[4/3.2]"
      )}>
        {recipe.imageUrl && (
          <Image
            src={recipe.imageUrl}
            alt={`Imagem da receita ${recipe.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
            priority={priority}
          />
        )}
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span className="text-xs font-semibold">{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1">
                <Flame className="h-3 w-3" />
                <span className="text-xs font-semibold">{recipe.calories}</span>
            </div>
        </div>
        <Button
            onClick={handleFavoriteClick}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full text-white hover:bg-white/20"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
            aria-label={isFavorite ? 'Desfavoritar receita' : 'Favoritar receita'}
        >
            <Heart className={cn('h-5 w-5 transition-all duration-200', isFavorite ? 'fill-white' : 'fill-transparent')} />
        </Button>
      </div>
      <div className="pt-3">
        <h3 className={cn(
            "font-bold text-foreground transition-colors", 
            isFeatured ? "text-2xl" : "text-base"
          )}>
            {recipe.title}
        </h3>
        <p className={cn(
            "text-muted-foreground line-clamp-2 mt-1",
            isFeatured ? "text-base" : "text-sm"
          )}>
          {recipe.description}
        </p>
      </div>
    </Link>
  );
}
