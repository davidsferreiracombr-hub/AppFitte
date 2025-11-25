
'use client';

import { AppLayout } from '@/components/app-layout';
import { getRecipes } from '@/lib/recipes';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Cake, Cookie, Croissant, Wheat, IceCream } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';

type CategoryInfo = {
  name: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  color: string;
  keywords: string[];
  count: number;
};

const categoryDefinitions: Omit<CategoryInfo, 'count'>[] = [
  {
    name: 'Bolos e Tortas',
    description: 'Deliciosos bolos para o café, tortas cremosas e rocamboles para qualquer ocasião.',
    icon: Cake,
    color: 'bg-red-50 border-red-200',
    keywords: ['bolo', 'torta', 'cuca', 'rocambole', 'cheesecake', 'floresta negra'],
  },
  {
    name: 'Doces e Sobremesas',
    description: 'Pudins, mousses, cremes, pavês, docinhos de festa, gelatinas e muito mais para adoçar o dia.',
    icon: IceCream,
    color: 'bg-pink-50 border-pink-200',
    keywords: ['doce', 'sobremesa', 'pudim', 'mousse', 'creme', 'pave', 'sorvete', 'gelatina', 'manjar', 'bombom', 'trufa', 'paçoca', 'brigadeiro', 'quindim', 'cocada', 'ambrosia', 'suspiro', 'sagu'],
  },
  {
    name: 'Pães e Salgados',
    description: 'Receitas de pães caseiros, salgadinhos de festa, tortas salgadas, esfihas e lanches práticos.',
    icon: Croissant,
    color: 'bg-yellow-50 border-yellow-200',
    keywords: ['pão', 'salgado', 'empada', 'quibe', 'waffle', 'panqueca', 'esfiha', 'coxinha', 'petisco', 'pastel', 'croquete', 'nhoque', 'risoto', 'sopa', 'caldo', 'dadinho de tapioca', 'cuscuz'],
  },
  {
    name: 'Biscoitos e Cookies',
    description: 'Encontre cookies, biscoitinhos amanteigados, sequilhos e rosquinhas para acompanhar seu café.',
    icon: Cookie,
    color: 'bg-amber-50 border-amber-200',
    keywords: ['cookie', 'biscoito', 'sequilho', 'donut', 'rosquinha', 'alfajor', 'goiabinha', 'casadinho'],
  },
  {
    name: 'Saudáveis e Fit',
    description: 'Opções leves e nutritivas, incluindo receitas fit, low-carb, integrais e proteicas.',
    icon: Wheat,
    color: 'bg-lime-50 border-lime-200',
    keywords: ['fit', 'low carb', 'integral', 'proteico', 'vegano', 'sem glúten', 'detox', 'saudavel', 'funcional', 'barra de cereal', 'vitamina', 'mingau', 'crepioca'],
  },
];

export default function CategoriesPage() {
  const allRecipes = useMemo(() => getRecipes(), []);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateCategories = () => {
      const categorizedRecipeIds = new Set<number>();
      
      const processedCategories = categoryDefinitions.map(catDef => {
        let count = 0;
        allRecipes.forEach(recipe => {
          if (categorizedRecipeIds.has(recipe.id)) return;

          let match = false;
          // Prioritize tags for more accurate categorization
          if (recipe.tags && Array.isArray(recipe.tags)) {
            if (catDef.keywords.some(keyword => recipe.tags.includes(keyword))) {
              match = true;
            }
          }
          
          // Fallback to title search if no tag matches
          if (!match) {
            match = catDef.keywords.some(keyword => recipe.title.toLowerCase().includes(keyword));
          }
          
          if (match) {
            count++;
            categorizedRecipeIds.add(recipe.id);
          }
        });
        return { ...catDef, count };
      }).filter(cat => cat.count > 0);

      setCategories(processedCategories);
      setIsLoading(false);
    };

    setIsLoading(true);
    // Simulate a small delay for better UX, can be removed if not needed
    const timer = setTimeout(calculateCategories, 100);

    return () => clearTimeout(timer);
  }, [allRecipes]);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {categories.map((category) => (
                <Link href={`/category/${encodeURIComponent(category.name)}`} key={category.name}>
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
