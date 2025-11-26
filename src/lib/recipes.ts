
import recipesData from './recipes.json';
import { Cake, Cookie, Croissant, Wheat, IceCream } from 'lucide-react';
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
      name: 'Doces e Sobremesas',
      description: 'Pudins, mousses, cookies, docinhos de festa e sorvetes para adoçar qualquer momento.',
      icon: Cookie,
      color: 'bg-pink-50 border-pink-200',
    },
    {
      name: 'Pães e Salgados',
      description: 'Receitas de pães, salgadinhos de festa, tortas salgadas e petiscos para lanches ou refeições.',
      icon: Croissant,
      color: 'bg-yellow-50 border-yellow-200',
    },
  ];

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

let allRecipes: Recipe[] | null = null;

function processRecipes(): Recipe[] {
    if (allRecipes) {
        return allRecipes;
    }

    const recipesWithSlugs = (recipesData as Recipe[]).map((recipe, index) => {
        const uniqueId = recipe.id || (index + 1);
        const recipeTitleSlug = createSlug(recipe.title);
        return {
            ...recipe,
            slug: `${recipeTitleSlug}-${uniqueId}`
        };
    });

    const categoryKeywords = {
        'Saudáveis e Fit': ['fit', 'low carb', 'integral', 'proteico', 'vegano', 'sem glúten', 'detox', 'saudavel', 'funcional', 'light'],
        'Bolos e Tortas': ['bolo', 'torta', 'cuca', 'rocambole', 'cheesecake', 'floresta negra', 'empadão', 'banoffee'],
        'Doces e Sobremesas': ['doce', 'sobremesa', 'pudim', 'mousse', 'creme', 'pave', 'sorvete', 'gelatina', 'manjar', 'bombom', 'trufa', 'paçoca', 'brigadeiro', 'quindim', 'cocada', 'ambrosia', 'suspiro', 'compota', 'goiabada', 'canjica', 'queijadinha', 'sonho', 'maria-mole', 'olho de sogra', 'beijinho', 'danoninho', 'churros', 'alfajor', 'goiabinha', 'casadinho', 'bem-casado', 'cookie', 'biscoito', 'sequilho', 'donut', 'rosquinha', 'carolina', 'clafoutis', 'panna cotta', 'crème brûlée'],
        'Pães e Salgados': ['pão', 'salgado', 'empada', 'quibe', 'waffle', 'panqueca', 'esfiha', 'coxinha', 'petisco', 'pastel', 'croquete', 'nhoque', 'risoto', 'sopa', 'caldo', 'dadinho de tapioca', 'cuscuz', 'vatapá', 'acarajé', 'pão de queijo', 'farofa', 'crepioca'],
    };

    allRecipes = recipesWithSlugs.map(recipe => {
        const lowerCaseTags = recipe.tags.map(t => t.toLowerCase());

        // Priority 1: Saudáveis e Fit
        if (categoryKeywords['Saudáveis e Fit'].some(keyword => lowerCaseTags.includes(keyword))) {
            return { ...recipe, category: 'Saudáveis e Fit' };
        }

        // Priority 2: Bolos e Tortas
        if (categoryKeywords['Bolos e Tortas'].some(keyword => lowerCaseTags.includes(keyword))) {
            return { ...recipe, category: 'Bolos e Tortas' };
        }

        // Priority 3: Pães e Salgados
        if (categoryKeywords['Pães e Salgados'].some(keyword => lowerCaseTags.includes(keyword))) {
            return { ...recipe, category: 'Pães e Salgados' };
        }
        
        // Priority 4: Doces e Sobremesas (if it contains any sweet-related tag and hasn't been categorized)
        if (categoryKeywords['Doces e Sobremesas'].some(keyword => lowerCaseTags.includes(keyword))) {
            return { ...recipe, category: 'Doces e Sobremesas' };
        }

        // Fallback: If no category is found, it will be left without a category property.
        return recipe;
    });

    return allRecipes;
}

export function getRecipes(): Recipe[] {
  return processRecipes();
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return getRecipes().find((recipe) => recipe.slug === slug);
}

export function getCategorizedRecipes(categoryName: string): Recipe[] {
    const allRecipes = getRecipes();
    return allRecipes.filter(recipe => recipe.category === categoryName);
}
