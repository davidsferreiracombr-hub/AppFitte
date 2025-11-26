
'use client';

import React, { useMemo } from 'react';
import { getRecipes, type Recipe, createSlug } from '@/lib/recipes';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import { AppLayout } from '@/components/app-layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';

const categoryDefinitions = [
  {
    name: 'Bolos e Tortas',
    keywords: ['bolo', 'torta', 'cuca', 'rocambole', 'cheesecake', 'floresta negra', 'pudim', 'empadão'],
  },
  {
    name: 'Doces e Sobremesas',
    keywords: ['doce', 'sobremesa', 'pudim', 'mousse', 'creme', 'pave', 'sorvete', 'gelatina', 'manjar', 'bombom', 'trufa', 'paçoca', 'brigadeiro', 'quindim', 'cocada', 'ambrosia', 'suspiro', 'sagu', 'compota', 'goiabada', 'canjica', 'queijadinha', 'sonho', 'maria-mole', 'olho de sogra', 'clafoutis', 'panna cotta', 'crème brûlée'],
  },
  {
    name: 'Pães e Salgados',
    keywords: ['pão', 'salgado', 'empada', 'quibe', 'waffle', 'panqueca', 'esfiha', 'coxinha', 'petisco', 'pastel', 'croquete', 'nhoque', 'risoto', 'sopa', 'caldo', 'dadinho de tapioca', 'cuscuz', 'vatapá', 'acarajé', 'pão de queijo', 'empadão'],
  },
  {
    name: 'Biscoitos e Cookies',
    keywords: ['cookie', 'biscoito', 'sequilho', 'donut', 'rosquinha', 'alfajor', 'goiabinha', 'casadinho', 'bem-casado', 'churros'],
  },
  {
    name: 'Saudáveis e Fit',
    keywords: ['fit', 'low carb', 'integral', 'proteico', 'vegano', 'sem glúten', 'detox', 'saudavel', 'funcional', 'barra de cereal', 'vitamina', 'mingau', 'crepioca'],
  },
];

type CategorizedRecipes = {
  [categoryName: string]: Recipe[];
};

export default function Home() {
  const allRecipes = useMemo(() => getRecipes(), []);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const recipesByCat = useMemo(() => {
    const categorized: CategorizedRecipes = {};

    categoryDefinitions.forEach(catDef => {
      const categoryRecipes = allRecipes.filter(recipe => {
        if (recipe.tags && recipe.tags.some(tag => catDef.keywords.includes(tag.toLowerCase()))) {
            return true;
        }
        if (catDef.keywords.some(keyword => recipe.title.toLowerCase().includes(keyword.toLowerCase()))) {
            return true;
        }
        return false;
      });
      
      if (categoryRecipes.length > 0) {
        categorized[catDef.name] = categoryRecipes;
      }
    });

    return categorized;
  }, [allRecipes]);

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="mb-12 text-left">
            <p className="text-muted-foreground text-lg">Olá,</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
              O que vamos <span className="text-primary">cozinhar</span> hoje?
            </h2>
        </div>
        
        <main className="space-y-12">
            {Object.entries(recipesByCat).map(([categoryName, recipes]) => (
                <section key={categoryName}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-2xl text-foreground">{categoryName}</h3>
                        <Button variant="ghost" asChild>
                            <Link href={`/category/${createSlug(categoryName)}`} className="text-primary hover:text-primary">
                                Ver mais
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <Carousel
                        opts={{
                            align: "start",
                            dragFree: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {recipes.slice(0, 10).map((recipe) => (
                                <CarouselItem key={recipe.id} className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4">
                                     <RecipeCard 
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
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden lg:flex" />
                        <CarouselNext className="hidden lg:flex" />
                    </Carousel>
                </section>
            ))}
        </main>
      </div>
    </AppLayout>
  );
}
