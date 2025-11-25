import recipesData from './recipes.json';

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

// Helper function to create a URL-friendly slug
function createSlug(title: string, id: number): string {
    const accents: { [key: string]: string } = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
        'ã': 'a', 'õ': 'o', 'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
        'ç': 'c'
    };
    
    return title
        .toLowerCase()
        .replace(/[áéíóúàèìòùãõâêîôûç]/g, char => accents[char])
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with a single one
        + `-${id}`;
}


let processedRecipes: Recipe[] | null = null;

export function getRecipes(): Recipe[] {
  if (processedRecipes) {
    return processedRecipes;
  }

  const allRecipes: Recipe[] = recipesData as Recipe[];

  processedRecipes = allRecipes.map((recipe, index) => {
      const uniqueId = recipe.id || (index + 1);
      return {
          ...recipe,
          slug: createSlug(recipe.title, uniqueId)
      };
  });
  
  return processedRecipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return getRecipes().find((recipe) => recipe.slug === slug);
}
