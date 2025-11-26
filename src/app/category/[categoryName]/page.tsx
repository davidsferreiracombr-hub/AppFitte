import React from 'react';
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

type FilteredData = {
  recipes: Recipe[];
  name: string;
  description: string;
};

function getFilteredRecipes(encodedCategoryName: string): FilteredData {
    const categoryName = decodeURIComponent(encodedCategoryName);
    const allRecipes = getRecipes();
    const categoryDef = categoryDefinitions.find(c => c.name === categoryName);

    if (!categoryDef) {
      return {
        recipes: [],
        name: categoryName,
        description: `Nenhuma categoria encontrada para "${categoryName}".`
      };
    }

    const categorizedRecipes: { [key: string]: Recipe[] } = {};
    const addedRecipeIds = new Set<number>();

    // First pass: assign recipes to their best-fit category
    for (const recipe of allRecipes) {
      if (addedRecipeIds.has(recipe.id)) continue;
      
      for (const catDef of categoryDefinitions) {
        let match = false;
        if (recipe.tags && recipe.tags.some(tag => catDef.keywords.includes(tag.toLowerCase()))) {
            match = true;
        } else if (catDef.keywords.some(keyword => recipe.title.toLowerCase().includes(keyword.toLowerCase()))) {
            match = true;
        }

        if (match) {
            if (!categorizedRecipes[catDef.name]) {
                categorizedRecipes[catDef.name] = [];
            }
            categorizedRecipes[catDef.name].push(recipe);
            addedRecipeIds.add(recipe.id);
            break; // Assign to first matching category and move to next recipe
        }
      }
    }
    
    const finalFilteredList = categorizedRecipes[categoryName] || [];

    const description = categoryDef.description || `Encontramos ${finalFilteredList.length} receitas deliciosas na categoria ${categoryName}.`;

    return {
      recipes: finalFilteredList,
      name: categoryName,
      description: description
    };
}


export default function CategoryPage({ params }: { params: { categoryName: string } }) {
  const { recipes, name, description } = getFilteredRecipes(params.categoryName);

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