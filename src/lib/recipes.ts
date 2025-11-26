
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
export function createSlug(title: string): string {
    const accents: { [key: string]: string } = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
        'ã': 'a', 'õ': 'o', 'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
        'ç': 'c'
    };
    
    // The id part is removed as it's not universally needed and complicates category slugs
    return title
        .toLowerCase()
        .replace(/[áéíóúàèìòùãõâêîôûç]/g, char => accents[char] || char)
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
}


let processedRecipes: Recipe[] | null = null;

export function getRecipes(): Recipe[] {
  if (processedRecipes) {
    return processedRecipes;
  }

  const allRecipes: Recipe[] = recipesData as Recipe[];

  // Note: Slugs are now generated using the title and a unique ID for recipes.
  // The createSlug function itself is generic.
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
