'use client';

import { AppLayout } from '@/components/app-layout';
import { getRecipes } from '@/lib/recipes';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Cake, Cookie, GlassWater, IceCream, Wheat, Croissant, Milk, Soup, Salad, Shell, Apple } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';

type Category = {
  name: string;
  count: number;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  color: string;
};

const categoryStyleMap: { [key: string]: { icon: Category['icon']; color: string } } = {
  'Bolo': { icon: Cake, color: 'bg-red-50 border-red-200' },
  'Torta': { icon: Croissant, color: 'bg-yellow-50 border-yellow-200' },
  'Cookie': { icon: Cookie, color: 'bg-amber-50 border-amber-200' },
  'Vitamina': { icon: GlassWater, color: 'bg-cyan-50 border-cyan-200' },
  'Barra de Cereal': { icon: Wheat, color: 'bg-lime-50 border-lime-200' },
  'Muffin': { icon: Shell, color: 'bg-orange-50 border-orange-200' },
  'Panqueca': { icon: Milk, color: 'bg-blue-50 border-blue-200' },
  'Sorvete': { icon: IceCream, color: 'bg-pink-50 border-pink-200' },
  'Pudim': { icon: Soup, color: 'bg-indigo-50 border-indigo-200' },
  'Gelatina': { icon: Salad, color: 'bg-green-50 border-green-200' },
  'default': { icon: Apple, color: 'bg-gray-100 border-gray-200' },
};

const mainCategories = ["Bolo", "Torta", "Cookie", "Vitamina", "Barra de Cereal", "Muffin", "Panqueca", "Sorvete", "Pudim", "Gelatina", "Creme", "Paçoca", "Bombom", "Trufa", "Biscoito", "Donut", "Doce", "Salgado", "Pão", "Waffle", "Mingau", "Empada", "Quibe"];

export default function CategoriesPage() {
  const allRecipes = useMemo(() => getRecipes(), []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateCategories = () => {
        const categoryCounts: { [key: string]: number } = {};
        
        allRecipes.forEach(recipe => {
            const recipeCategories = recipe.tags.filter(tag => mainCategories.includes(tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')));
            
            if (recipeCategories.length > 0) {
              recipeCategories.forEach(cat_name => {
                const normalizedCat = cat_name.charAt(0).toUpperCase() + cat_name.slice(1).replace(/-/g, ' ');
                categoryCounts[normalizedCat] = (categoryCounts[normalizedCat] || 0) + 1;
              });
            } else {
               mainCategories.forEach(mainCat => {
                 if(recipe.title.toLowerCase().includes(mainCat.toLowerCase())) {
                    categoryCounts[mainCat] = (categoryCounts[mainCat] || 0) + 1;
                 }
               });
            }
        });
        
        const otherRecipes = allRecipes.filter(recipe => {
            const recipeMainCategories = recipe.tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')).filter(tag => mainCategories.includes(tag));
            const titleHasMainCategory = mainCategories.some(cat => recipe.title.toLowerCase().includes(cat.toLowerCase()));
            return recipeMainCategories.length === 0 && !titleHasMainCategory;
        });

        if (otherRecipes.length > 0) {
            categoryCounts['Outros'] = otherRecipes.length;
        }

        const processedCategories = Object.entries(categoryCounts)
            .map(([name, count]) => {
                const style = categoryStyleMap[name] || categoryStyleMap['default'];
                return {
                    name,
                    count,
                    icon: style.icon,
                    color: style.color
                };
            })
            .sort((a, b) => b.count - a.count);
        
        setCategories(processedCategories);
        setIsLoading(false);
    };

    setIsLoading(true);
    const timer = setTimeout(calculateCategories, 100); 

    return () => clearTimeout(timer);
  }, [allRecipes]);

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Categorias de Receitas
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
                Explore nossas receitas através de uma variedade de categorias deliciosas e saudáveis.
            </p>
        </div>

        <main>
          {isLoading ? (
            <LoadingSpinner text="Montando nosso cardápio de categorias..." />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {categories.map((category) => (
                <Link href={`/category/${encodeURIComponent(category.name)}`} key={category.name}>
                  <div className={cn(
                      "group flex flex-col items-center justify-center p-6 rounded-2xl border-2 text-center h-40 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:border-primary/50",
                      category.color
                  )}>
                    <category.icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                    <h3 className="mt-3 text-base font-bold text-foreground truncate w-full">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} receitas</p>
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
