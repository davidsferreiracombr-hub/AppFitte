
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
  category?: string;
};

export type CategoryInfo = {
  name: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  color: string;
  count?: number;
};

// 1. Single Source of Truth for Category Definitions
export const categoryDefinitions: CategoryInfo[] = [
    {
      name: 'Saudáveis e Fit',
      description: 'Opções leves, nutritivas, fit, low-carb, integrais e proteicas para uma vida equilibrada.',
      icon: Wheat,
      color: 'bg-lime-50 border-lime-200',
    },
    {
      name: 'Bolos e Tortas',
      description: 'Deliciosos bolos para o café, tortas cremosas e cheesecakes para todas as ocasiões.',
      icon: Cake,
      color: 'bg-red-50 border-red-200',
    },
    {
      name: 'Pães e Salgados',
      description: 'Receitas de pães, salgadinhos de festa, tortas salgadas e petiscos para lanches ou refeições.',
      icon: Croissant,
      color: 'bg-yellow-50 border-yellow-200',
    },
    {
      name: 'Doces e Sobremesas',
      description: 'Pudins, mousses, cookies, docinhos de festa e sorvetes para adoçar qualquer momento.',
      icon: Cookie,
      color: 'bg-pink-50 border-pink-200',
    },
];

const categoryKeywords = {
    'Saudáveis e Fit': ['fit', 'low carb', 'integral', 'proteico', 'vegano', 'sem glúten', 'detox', 'saudavel', 'funcional', 'light'],
    'Bolos e Tortas': ['bolo', 'torta', 'cuca', 'rocambole', 'cheesecake', 'floresta negra', 'empadão', 'banoffee'],
    'Pães e Salgados': ['pão', 'salgado', 'empada', 'quibe', 'waffle', 'panqueca', 'esfiha', 'coxinha', 'petisco', 'pastel', 'croquete', 'nhoque', 'risoto', 'sopa', 'caldo', 'dadinho de tapioca', 'cuscuz', 'vatapá', 'acarajé', 'pão de queijo', 'farofa', 'crepioca'],
    'Doces e Sobremesas': ['doce', 'sobremesa', 'pudim', 'mousse', 'creme', 'pave', 'sorvete', 'gelatina', 'manjar', 'bombom', 'trufa', 'paçoca', 'brigadeiro', 'quindim', 'cocada', 'ambrosia', 'suspiro', 'compota', 'goiabada', 'canjica', 'queijadinha', 'sonho', 'maria-mole', 'olho de sogra', 'beijinho', 'danoninho', 'churros', 'alfajor', 'goiabinha', 'casadinho', 'bem-casado', 'cookie', 'biscoito', 'sequilho', 'donut', 'rosquinha', 'carolina', 'clafoutis', 'panna cotta', 'crème brûlée'],
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


// 2. Caching mechanism to process recipes only once
let allRecipes: Recipe[] | null = null;
let recipesByCategory: { [categoryName: string]: Recipe[] } | null = null;

// 3. Centralized Categorization Logic
function processAndCategorizeRecipes(): void {
    if (allRecipes && recipesByCategory) {
        return; // Avoid reprocessing if already done
    }

    const initialRecipes = (recipesData as Recipe[]).map((recipe, index) => ({
        ...recipe,
        slug: `${createSlug(recipe.title)}-${recipe.id || index + 1}`
    }));

    const categorizedRecipes: Recipe[] = [];
    const tempRecipesByCategory: { [categoryName: string]: Recipe[] } = {
        'Saudáveis e Fit': [],
        'Bolos e Tortas': [],
        'Pães e Salgados': [],
        'Doces e Sobremesas': [],
    };

    initialRecipes.forEach(recipe => {
        const lowerCaseTags = recipe.tags.map(t => t.toLowerCase());
        let assignedCategory: string | null = null;

        // Strict priority order for categorization
        if (categoryKeywords['Saudáveis e Fit'].some(keyword => lowerCaseTags.includes(keyword))) {
            assignedCategory = 'Saudáveis e Fit';
        } else if (categoryKeywords['Bolos e Tortas'].some(keyword => lowerCaseTags.includes(keyword))) {
            assignedCategory = 'Bolos e Tortas';
        } else if (categoryKeywords['Pães e Salgados'].some(keyword => lowerCaseTags.includes(keyword))) {
            assignedCategory = 'Pães e Salgados';
        } else if (categoryKeywords['Doces e Sobremesas'].some(keyword => lowerCaseTags.includes(keyword))) {
            assignedCategory = 'Doces e Sobremesas';
        }

        if (assignedCategory) {
            const categorizedRecipe = { ...recipe, category: assignedCategory };
            categorizedRecipes.push(categorizedRecipe);
            tempRecipesByCategory[assignedCategory].push(categorizedRecipe);
        } else {
             // Fallback for uncategorized recipes, though the keywords should cover all.
            categorizedRecipes.push(recipe);
        }
    });

    allRecipes = categorizedRecipes;
    recipesByCategory = tempRecipesByCategory;
}

// 4. Public functions to access the processed data
export function getRecipes(): Recipe[] {
  processAndCategorizeRecipes();
  return allRecipes!;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return getRecipes().find((recipe) => recipe.slug === slug);
}

export function getCategorizedRecipes(categoryName: string): Recipe[] {
    processAndCategorizeRecipes();
    return recipesByCategory![categoryName] || [];
}

export function getRecipesByAllCategories(): { [categoryName: string]: Recipe[] } {
    processAndCategorizeRecipes();
    return recipesByCategory!;
}
