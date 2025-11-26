
import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { type Recipe, createSlug, getCategorizedRecipes } from '@/lib/recipes';
import { CategoryView } from './category-view';

const categoryDefinitions = [
    {
      name: 'Bolos e Tortas',
      description: 'Deliciosos bolos para o café, tortas cremosas e rocamboles para qualquer ocasião.',
    },
    {
      name: 'Doces e Sobremesas',
      description: 'Pudins, mousses, cremes, pavês, docinhos de festa, gelatinas e muito mais para adoçar o dia.',
    },
    {
      name: 'Pães e Salgados',
      description: 'Receitas de pães caseiros, salgadinhos de festa, tortas salgadas, esfihas e lanches práticos.',
    },
    {
      name: 'Biscoitos e Cookies',
      description: 'Encontre cookies, biscoitinhos amanteigados, sequilhos e rosquinhas para acompanhar seu café.',
    },
    {
      name: 'Saudáveis e Fit',
      description: 'Opções leves e nutritivas, incluindo receitas fit, low-carb, integrais e proteicas.',
    },
];

export function generateStaticParams() {
  return categoryDefinitions.map(category => ({
    categoryName: createSlug(category.name),
  }));
}

type FilteredData = {
  recipes: Recipe[];
  name: string;
  description: string;
};

function getCategoryDetails(categorySlug: string): Omit<FilteredData, 'recipes'> {
    const decodedCategoryName = decodeURIComponent(categorySlug.replace(/-/g, ' '));
    const categoryDef = categoryDefinitions.find(c => c.name.toLowerCase() === decodedCategoryName.toLowerCase());

    if (!categoryDef) {
        const capitalizedName = decodedCategoryName.charAt(0).toUpperCase() + decodedCategoryName.slice(1);
        return {
            name: capitalizedName,
            description: `Nenhuma categoria encontrada para "${capitalizedName}".`
        };
    }
    
    return {
        name: categoryDef.name,
        description: categoryDef.description
    };
}

export default function CategoryPage({ params }: { params: { categoryName: string } }) {
  const { name, description } = getCategoryDetails(params.categoryName);
  const recipes = getCategorizedRecipes(name);

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Receitas de <span className="text-primary">{name}</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
                {description}
            </p>
        </div>

        <main>
          <CategoryView recipes={recipes} />
        </main>
      </div>
    </AppLayout>
  );
}
