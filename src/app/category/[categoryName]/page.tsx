
import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { type Recipe, createSlug, getCategorizedRecipes, categoryDefinitions } from '@/lib/recipes';
import { CategoryView } from './category-view';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MoreRecipesNotice } from '@/components/more-recipes-notice';

export function generateStaticParams() {
  return categoryDefinitions.map(category => ({
    categoryName: createSlug(category.name),
  }));
}

function getCategoryDetails(categorySlug: string) {
    const categoryDef = categoryDefinitions.find(c => createSlug(c.name) === categorySlug);
    if (!categoryDef) {
        return null;
    }
    return categoryDef;
}

const categoryBanners: { [key: string]: string } = {
  'saudaveis-e-fit': 'https://i.imgur.com/iXZhuMZ.jpg',
  'bolos-e-tortas': 'https://i.imgur.com/IrHe2VD.jpg',
  'paes-e-salgados': 'https://i.imgur.com/cnteplY.jpg',
  'doces-e-sobremesas': 'https://i.imgur.com/GsBgymO.jpg'
};

export default function CategoryPage({ params }: { params: { categoryName: string } }) {
  const categoryInfo = getCategoryDetails(params.categoryName);

  if (!categoryInfo) {
    // If the category slug doesn't match any known category, show a 404 page
    return notFound();
  }
  
  const recipes = getCategorizedRecipes(categoryInfo.name);
  const bannerImage = categoryBanners[params.categoryName];

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 lg:max-w-7xl lg:mx-auto">
        
        {bannerImage ? (
            <div className="relative rounded-2xl overflow-hidden mb-12 h-48 md:h-64 flex items-center p-6 md:p-10 text-left shadow-lg">
                <Image
                    src={bannerImage}
                    alt={`Categoria ${categoryInfo.name}`}
                    fill
                    className="object-cover"
                    objectPosition="center"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                        {categoryInfo.name}
                    </h2>
                    <p className="mt-4 text-lg max-w-2xl">
                        {categoryInfo.description}
                    </p>
                </div>
            </div>
        ) : (
            <div className="text-center mb-12 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    Receitas de <span className="text-primary">{categoryInfo.name}</span>
                </h2>
                <p className="text-muted-foreground mt-4 text-lg">
                    {categoryInfo.description}
                </p>
            </div>
        )}

        <main className="space-y-10">
          <CategoryView recipes={recipes} />
          <MoreRecipesNotice />
        </main>
      </div>
    </AppLayout>
  );
}
