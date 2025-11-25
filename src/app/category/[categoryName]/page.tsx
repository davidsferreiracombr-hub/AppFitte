import React, { useMemo } from 'react';
import { AppLayout } from '@/components/app-layout';
import { getRecipes, type Recipe } from '@/lib/recipes';
import { CategoryView } from './category-view';

const categoryDefinitions = [
  {
    name: 'Bolos e Tortas',
    description: 'Deliciosos bolos para o café, tortas cremosas e rocamboles para qualquer ocasião.',
    iconName: 'Cake',
    keywords: ['bolo', 'torta', 'cuca', 'rocambole', 'cheesecake', 'floresta negra', 'pudim'],
  },
  {
    name: 'Doces e Sobremesas',
    description: 'Mousses, cremes, pavês, docinhos de festa, gelatinas e muito mais para adoçar o dia.',
    iconName: 'IceCream',
    keywords: ['doce', 'sobremesa', 'mousse', 'creme', 'pave', 'sorvete', 'gelatina', 'manjar', 'bombom', 'trufa', 'paçoca', 'brigadeiro', 'quindim', 'cocada', 'ambrosia', 'suspiro', 'sagu', 'compota', 'goiabada', 'canjica'],
  },
  {
    name: 'Pães e Salgados',
    description: 'Receitas de pães caseiros, salgadinhos de festa, tortas salgadas, esfihas e lanches práticos.',
    iconName: 'Croissant',
    keywords: ['pão', 'salgado', 'empada', 'quibe', 'waffle', 'panqueca', 'esfiha', 'coxinha', 'petisco', 'pastel', 'croquete', 'nhoque', 'risoto', 'sopa', 'caldo', 'dadinho de tapioca', 'cuscuz', 'vatapá', 'acarajé'],
  },
  {
    name: 'Biscoitos e Cookies',
    description: 'Encontre cookies, biscoitinhos amanteigados, sequilhos e rosquinhas para acompanhar seu café.',
    iconName: 'Cookie',
    keywords: ['cookie', 'biscoito', 'sequilho', 'donut', 'rosquinha', 'alfajor', 'goiabinha', 'casadinho', 'bem-casado', 'churros'],
  },
  {
    name: 'Saudáveis e Fit',
    description: 'Opções leves e nutritivas, incluindo receitas fit, low-carb, integrais e proteicas.',
    iconName: 'Wheat',
    keywords: ['fit', 'low carb', 'integral', 'proteico', 'vegano', 'sem glúten', 'detox', 'saudavel', 'funcional', 'barra de cereal', 'vitamina', 'mingau', 'crepioca'],
  },
];

export function generateStaticParams() {
  return categoryDefinitions.map(category => ({
    categoryName: encodeURIComponent(category.name),
  }));
}

export default function CategoryPage({ params }: { params: { categoryName: string } }) {
  const allRecipes = useMemo(() => getRecipes(), []);
  
  const categoryName = decodeURIComponent(params.categoryName);

  const filteredRecipes = useMemo(() => {
    const categoryDef = categoryDefinitions.find(c => c.name === categoryName);
    if (!categoryDef) return [];

    const finalFilteredList: Recipe[] = [];
    const addedRecipeIds = new Set<number>();

    // This logic ensures a recipe is only added to the first category it matches,
    // preventing duplicates across category pages.
    categoryDefinitions.forEach(catDef => {
      allRecipes.forEach(recipe => {
        if(addedRecipeIds.has(recipe.id)) return;
        
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
          if (catDef.name === categoryName) {
            finalFilteredList.push(recipe);
          }
          addedRecipeIds.add(recipe.id);
        }
      });
    });

    return finalFilteredList;

  }, [allRecipes, categoryName]);

  const categoryDescription = categoryDefinitions.find(c => c.name === categoryName)?.description || `Encontramos ${filteredRecipes.length} receitas deliciosas na categoria ${categoryName}.`;

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Receitas de <span className="text-primary">{categoryName}</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
                {categoryDescription}
            </p>
        </div>

        <main>
          <CategoryView recipes={filteredRecipes} />
        </main>
      </div>
    </AppLayout>
  );
}
