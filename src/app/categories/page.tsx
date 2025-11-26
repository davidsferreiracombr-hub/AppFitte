
'use client';

import { AppLayout } from '@/components/app-layout';
import { getCategorizedRecipes, createSlug, categoryDefinitions } from '@/lib/recipes';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/loading-spinner';
import type { CategoryInfo } from '@/lib/recipes';


export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This logic now correctly uses the centralized function
    const processedCategories = categoryDefinitions.map(catDef => {
      const recipes = getCategorizedRecipes(catDef.name);
      return {
        ...catDef,
        count: recipes.length,
      };
    }).filter(cat => cat.count > 0); // Only show categories with recipes

    setCategories(processedCategories);
    setIsLoading(false);
  }, []);

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Categorias de <span className="text-primary">Receitas</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Explore nossas receitas através de uma variedade de categorias deliciosas e saudáveis.
          </p>
        </div>

        <main>
          {isLoading ? (
            <LoadingSpinner text="Organizando nosso cardápio..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {categories.map((category) => (
                <Link href={`/category/${createSlug(category.name)}`} key={category.name}>
                  <div className={cn(
                      "group flex flex-col items-center justify-center p-6 rounded-2xl border-2 text-center h-52 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:border-primary/50",
                      category.color
                  )}>
                    <category.icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                    <h3 className="mt-3 text-xl font-bold text-foreground truncate w-full">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{category.count} receitas</p>
                    <p className="text-base text-muted-foreground/80 line-clamp-2">{category.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </AppLayout>
  );
}
