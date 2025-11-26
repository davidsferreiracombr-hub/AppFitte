
import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { getRecipes, type Recipe, createSlug } from '@/lib/recipes';
import { CategoryView } from './category-view';

const categoryDefinitions = [
  {
    name: 'Bolos e Tortas',
    description: 'Deliciosos bolos para o café, tortas cremosas e rocamboles para qualquer ocasião.',
    iconName: 'Cake',
    keywords: ['bolo', 'torta', 'cuca', 'rocambole', 'cheesecake', 'floresta negra', 'pudim', 'empadão'],
  },
  {
    name: 'Doces e Sobremesas',
    description: 'Pudins, mousses, cremes, pavês, docinhos de festa, gelatinas e muito mais para adoçar o dia.',
    iconName: 'IceCream',
    keywords: ['doce', 'sobremesa', 'pudim', 'mousse', 'creme', 'pave', 'sorvete', 'gelatina', 'manjar', 'bombom', 'trufa', 'paçoca', 'brigadeiro', 'quindim', 'cocada', 'ambrosia', 'suspiro', 'sagu', 'compota', 'goiabada', 'canjica', 'queijadinha', 'sonho', 'maria-mole', 'olho de sogra', 'clafoutis', 'panna cotta', 'crème brûlée'],
  },
  {
    name: 'Pães e Salgados',
    description: 'Receitas de pães caseiros, salgadinhos de festa, tortas salgadas, esfihas e lanches práticos.',
    iconName: 'Croissant',
    keywords: ['pão', 'salgado', 'empada', 'quibe', 'waffle', 'panqueca', 'esfiha', 'coxinha', 'petisco', 'pastel', 'croquete', 'nhoque', 'risoto', 'sopa', 'caldo', 'dadinho de tapioca', 'cuscuz', 'vatapá', 'acarajé', 'pão de queijo', 'empadão'],
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
    categoryName: createSlug(category.name),
  }));
}

type FilteredData = {
  recipes: Recipe[];
  name: string;
  description: string;
};

function getFilteredRecipes(categorySlug: string): FilteredData {
    const allRecipes = getRecipes();
    const decodedCategoryName = decodeURIComponent(categorySlug.replace(/-/g, ' '));
    
    const categoryDef = categoryDefinitions.find(c => c.name.toLowerCase() === decodedCategoryName.toLowerCase());

    if (!categoryDef) {
      return {
        recipes: [],
        name: decodedCategoryName.charAt(0).toUpperCase() + decodedCategoryName.slice(1),
        description: `Nenhuma categoria encontrada para "${decodedCategoryName}".`
      };
    }

    const categorizedRecipes = allRecipes.filter(recipe => {
        // Prioritize tags for more accurate categorization
        if (recipe.tags && recipe.tags.some(tag => categoryDef.keywords.includes(tag.toLowerCase()))) {
            return true;
        }
        // Fallback to title matching
        if (categoryDef.keywords.some(keyword => recipe.title.toLowerCase().includes(keyword.toLowerCase()))) {
            return true;
        }
        return false;
    });
    
    const description = categoryDef.description || `Encontramos ${categorizedRecipes.length} receitas deliciosas na categoria ${categoryDef.name}.`;

    return {
      recipes: categorizedRecipes,
      name: categoryDef.name,
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
