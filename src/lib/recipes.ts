
import recipesData from './recipes.json';
import { Cake, Cookie, Croissant, Wheat } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// --- LÓGICA DE CÁLCULO DE POTENCIAL DE VENDA ---

// 1. Definição de palavras-chave e seus pesos
const ingredientWeight: { [key: string]: number } = {
    // Alto Custo
    'macadâmia': 15, 'amêndoas': 12, 'nozes': 12, 'pistache': 15, 'whey protein': 10,
    'castanha de caju': 10, 'chocolate 70%': 8, 'queijo coalho': 7, 'cream cheese': 7,
    'camarão': 15, 'carne seca': 12, 'damasco': 10,
    // Médio Custo
    'biomassa': 6, 'leite de coco': 5, 'óleo de coco': 5, 'tâmaras': 7,
    'goiabada': 4, 'doce de leite': 4, 'morango': 6, 'frutas vermelhas': 8,
    // Baixo Custo
    'aveia': 2, 'banana': 1, 'fubá': 1, 'batata-doce': 2, 'mandioca': 2,
};

const complexityWeight = {
    'Fácil': 5,
    'Média': 15,
    'Difícil': 25,
};

const categoryWeight = {
    'Bolos e Tortas': 20,
    'Doces e Sobremesas': 15,
    'Pães e Salgados': 10,
    'Saudáveis e Fit': 5,
};

/**
 * Calcula o potencial de venda de uma receita (0-100) com base nos ingredientes,
 * dificuldade e categoria, para fornecer uma estimativa de preço mais realista.
 * @param recipe A receita a ser analisada.
 * @returns Um número de 0 a 100 representando o potencial de venda.
 */
function calculateSalePotential(recipe: Omit<Recipe, 'saleValue' | 'category'>, assignedCategory: string | null): number {
    let score = 0;

    // 2. Calcular score dos ingredientes
    const ingredientsString = recipe.ingredients.join(' ').toLowerCase();
    for (const ingredient in ingredientWeight) {
        if (ingredientsString.includes(ingredient)) {
            score += ingredientWeight[ingredient];
        }
    }

    // 3. Adicionar score da complexidade
    score += complexityWeight[recipe.difficulty] || 0;

    // 4. Adicionar score da categoria
    if (assignedCategory && categoryWeight[assignedCategory as keyof typeof categoryWeight]) {
        score += categoryWeight[assignedCategory as keyof typeof categoryWeight];
    }
    
    // 5. Adicionar um pouco de variação baseada no título para diferenciar receitas parecidas
    let titleHash = 0;
    for (let i = 0; i < recipe.title.length; i++) {
        titleHash = (titleHash << 5) - titleHash + recipe.title.charCodeAt(i);
        titleHash |= 0;
    }
    score += (Math.abs(titleHash) % 10); // Adiciona um valor de 0 a 9

    // 6. Normalizar o score para uma escala de 0 a 100
    // O score máximo teórico pode ser alto, então definimos um teto razoável (ex: 80)
    // para mapear para 100. Isso evita que a maioria das receitas fique no final da escala.
    const maxScore = 85; 
    const normalizedScore = Math.min(100, Math.floor((score / maxScore) * 100));

    return normalizedScore;
}


// --- FIM DA LÓGICA DE CÁLCULO ---


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
  imageUrl?: string;
  saleValue: number; // Novo campo para o valor de venda
};

export type CategoryInfo = {
  name: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  color: string;
  count?: number;
};

const categoryImages: { [key: string]: string } = {
  'Saudáveis e Fit': 'https://i.imgur.com/iXZhuMZ.jpg',
  'Bolos e Tortas': 'https://i.imgur.com/IrHe2VD.jpg',
  'Pães e Salgados': 'https://i.imgur.com/cnteplY.jpg',
  'Doces e Sobremesas': 'https://i.imgur.com/GsBgymO.jpg'
};

export function getRecipeImage(categoryName?: string): string | null {
    if (!categoryName || !categoryImages[categoryName]) {
        // Retorna uma imagem padrão ou nulo se a categoria não existir ou não tiver imagem
        return 'https://i.imgur.com/iXZhuMZ.jpg';
    }
    return categoryImages[categoryName];
}

// 1. Single Source of Truth for Category Definitions
export const categoryDefinitions: CategoryInfo[] = [
    {
      name: 'Saudáveis e Fit',
      description: 'Receitas leves para um estilo de vida equilibrado e cheio de sabor.',
      icon: Wheat,
      color: 'bg-lime-50 border-lime-200',
    },
    {
      name: 'Bolos e Tortas',
      description: 'Delícias para o café da tarde, celebrações ou aquele doce especial.',
      icon: Cake,
      color: 'bg-red-50 border-red-200',
    },
    {
      name: 'Pães e Salgados',
      description: 'Opções perfeitas para lanches, festas ou uma refeição rápida.',
      icon: Croissant,
      color: 'bg-yellow-50 border-yellow-200',
    },
    {
      name: 'Doces e Sobremesas',
      description: 'Para adoçar a vida com pudins, mousses, cookies e muito mais.',
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

    const initialRecipes = (recipesData as Omit<Recipe, 'saleValue'>[]);

    const categorizedRecipes: Recipe[] = [];
    const tempRecipesByCategory: { [categoryName: string]: Recipe[] } = {
        'Saudáveis e Fit': [],
        'Bolos e Tortas': [],
        'Pães e Salgados': [],
        'Doces e Sobremesas': [],
    };

    initialRecipes.forEach((recipe, index) => {
        const lowerCaseTags = recipe.tags.map(t => t.toLowerCase());
        let assignedCategory: string | null = null;

        // Strict priority order for categorization
        if (categoryKeywords['Saudáveis e Fit'].some(keyword => lowerCaseTags.includes(keyword) || recipe.title.toLowerCase().includes('fit'))) {
            assignedCategory = 'Saudáveis e Fit';
        } else if (categoryKeywords['Bolos e Tortas'].some(keyword => lowerCaseTags.includes(keyword))) {
            assignedCategory = 'Bolos e Tortas';
        } else if (categoryKeywords['Pães e Salgados'].some(keyword => lowerCaseTags.includes(keyword))) {
            assignedCategory = 'Pães e Salgados';
        } else if (categoryKeywords['Doces e Sobremesas'].some(keyword => lowerCaseTags.includes(keyword))) {
            assignedCategory = 'Doces e Sobremesas';
        }
        
        const finalRecipe: Recipe = {
            ...recipe,
            slug: `${createSlug(recipe.title)}-${recipe.id || index + 1}`,
            saleValue: calculateSalePotential(recipe, assignedCategory),
            category: assignedCategory || undefined
        };
        
        categorizedRecipes.push(finalRecipe);

        if (assignedCategory) {
            tempRecipesByCategory[assignedCategory].push(finalRecipe);
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

export function getRecipesByAllCategories(): { [categoryName:string]: Recipe[] } {
    processAndCategorizeRecipes();
    return recipesByCategory!;
}
