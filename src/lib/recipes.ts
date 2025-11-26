
import recipesData from './recipes.json';
import { Cake, Cookie, Croissant, Wheat } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export type Recipe = {
  id: number;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  prepTime: string;
  calories: string;
  difficulty: "Fácil" | "Média" | "Difícil";
  ingredients: string[];
  instructions: string[];
  servings: string;
  notes?: string;
};

export type CategoryInfo = {
  name: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  color: string;
  keywords: string[];
  count?: number;
};

// Helper function to create a URL-friendly slug
export function createSlug(title: string): string {
    const accents: { [key: string]: string } = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
        'ã': 'a', 'õ': 'o', 'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
        'ç': 'c'
    };
    
    return title
        .toLowerCase()
        .replace(/[áéíóúàèìòùãõâêîôûç]/g, char => accents[char] || char)
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

let processedRecipes: Recipe[] | null = null;

export function getRecipes(): Recipe[] {
  if (processedRecipes) {
    return processedRecipes;
  }

  const allRecipes: Recipe[] = recipesData as Recipe[];

  processedRecipes = allRecipes.map((recipe, index) => {
      const uniqueId = recipe.id || (index + 1);
      const recipeTitleSlug = createSlug(recipe.title);
      return {
          ...recipe,
          slug: `${recipeTitleSlug}-${uniqueId}`
      };
  });
  
  return processedRecipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return getRecipes().find((recipe) => recipe.slug === slug);
}

export const categoryDefinitions: CategoryInfo[] = [
    {
      name: 'Bolos e Tortas',
      description: 'Deliciosos bolos para o café, tortas cremosas e rocamboles para qualquer ocasião.',
      icon: Cake,
      color: 'bg-red-50 border-red-200',
      keywords: ['bolo', 'torta', 'cuca', 'rocambole', 'cheesecake', 'floresta negra', 'pudim', 'empadão', 'banoffee', 'quindim', 'clafoutis'],
    },
    {
      name: 'Doces e Sobremesas',
      description: 'Pudins, mousses, cremes, pavês, docinhos de festa, gelatinas e muito mais para adoçar o dia.',
      icon: Cookie,
      color: 'bg-pink-50 border-pink-200',
      keywords: ['doce', 'sobremesa', 'pudim', 'mousse', 'creme', 'pave', 'sorvete', 'gelatina', 'manjar', 'bombom', 'trufa', 'paçoca', 'brigadeiro', 'quindim', 'cocada', 'ambrosia', 'suspiro', 'sagu', 'compota', 'goiabada', 'canjica', 'queijadinha', 'sonho', 'maria-mole', 'olho de sogra', 'clafoutis', 'panna cotta', 'crème brûlée', 'beijinho', 'danoninho', 'churros', 'alfajor', 'goiabinha', 'casadinho', 'bem-casado', 'cookie', 'biscoito', 'sequilho', 'donut', 'rosquinha'],
    },
    {
      name: 'Pães e Salgados',
      description: 'Receitas de pães caseiros, salgadinhos de festa, tortas salgadas, esfihas e lanches práticos.',
      icon: Croissant,
      color: 'bg-yellow-50 border-yellow-200',
      keywords: ['pão', 'salgado', 'empada', 'quibe', 'waffle', 'panqueca', 'esfiha', 'coxinha', 'petisco', 'pastel', 'croquete', 'nhoque', 'risoto', 'sopa', 'caldo', 'dadinho de tapioca', 'cuscuz', 'vatapá', 'acarajé', 'pão de queijo', 'empadão', 'crepioca'],
    },
    {
      name: 'Saudáveis e Fit',
      description: 'Opções leves e nutritivas, incluindo receitas fit, low-carb, integrais e proteicas.',
      icon: Wheat,
      color: 'bg-lime-50 border-lime-200',
      keywords: ['fit', 'low carb', 'integral', 'proteico', 'vegano', 'sem glúten', 'detox', 'saudavel', 'funcional', 'barra de cereal', 'vitamina', 'mingau', 'crepioca'],
    },
];

export function getCategorizedRecipes(categoryName: string): Recipe[] {
    const allRecipes = getRecipes();
    const categoryDef = categoryDefinitions.find(c => c.name === categoryName);

    if (!categoryDef) {
        return [];
    }

    return allRecipes.filter(recipe => {
        const lowerCaseTitle = recipe.title.toLowerCase();
        const lowerCaseTags = recipe.tags?.map(tag => tag.toLowerCase()) || [];
        const lowerCaseDescription = recipe.description.toLowerCase();

        return categoryDef.keywords.some(keyword => {
            const lowerCaseKeyword = keyword.toLowerCase();
            return lowerCaseTitle.includes(lowerCaseKeyword) || 
                   lowerCaseTags.includes(lowerCaseKeyword) ||
                   lowerCaseDescription.includes(lowerCaseKeyword);
        });
    });
}
