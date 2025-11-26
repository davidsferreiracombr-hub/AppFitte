
'use client';

import { AppLayout } from '@/components/app-layout';
import { getCategorizedRecipes, createSlug, categoryDefinitions } from '@/lib/recipes';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LoadingSpinner } from '@/components/loading-spinner';
import type { CategoryInfo } from '@/lib/recipes';

const categoryImages: { [key: string]: string } = {
  'Saudáveis e Fit': 'https://i.imgur.com/iXZhuMZ.jpg',
  'Bolos e Tortas': 'https://i.imgur.com/IrHe2VD.jpg',
  'Pães e Salgados': 'https://i.imgur.com/cnteplY.jpg',
  'Doces e Sobremesas': 'https://i.imgur.com/GsBgymO.jpg'
};

const titleHighlights: { [key: string]: { before: string; highlight: string; after: string } } = {
    'Saudáveis e Fit': { before: 'Saudáveis e ', highlight: 'Fit', after: '' },
    'Bolos e Tortas': { before: '', highlight: 'Bolos', after: ' e Tortas' },
    'Pães e Salgados': { before: '', highlight: 'Pães', after: ' e Salgados' },
    'Doces e Sobremesas': { before: '', highlight: 'Doces', after: ' e Sobremesas' },
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processedCategories = categoryDefinitions.map(catDef => ({
      ...catDef,
      count: getCategorizedRecipes(catDef.name).length,
    })).filter(cat => (cat.count ?? 0) > 0);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {categories.map((category, index) => (
                <Link href={`/category/${createSlug(category.name)}`} key={category.name} passHref>
                  <div className="group relative block rounded-2xl overflow-hidden shadow-lg h-64 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl group-hover:ring-4 group-hover:ring-primary/50 group-hover:ring-offset-4 group-hover:ring-offset-background">
                    <Image
                      src={categoryImages[category.name]}
                      alt={`Imagem da categoria ${category.name}`}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                      priority={index < 2} // Prioriza as duas primeiras imagens (acima da dobra no desktop)
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                       <h3 className="text-2xl font-bold tracking-tight" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
                        {titleHighlights[category.name]
                          ? (
                            <>
                              {titleHighlights[category.name].before}
                              <span className="text-primary">{titleHighlights[category.name].highlight}</span>
                              {titleHighlights[category.name].after}
                            </>
                          )
                          : category.name}
                      </h3>
                       <p className="mt-1 text-sm font-medium opacity-90 max-w-xs">{category.description}</p>
                      <p className="mt-2 text-xs font-bold uppercase tracking-wider opacity-80">{category.count} receitas</p>
                    </div>
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
