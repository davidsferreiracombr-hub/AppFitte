
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

const categoryDefinitions = [
    {
      name: 'Bolos e Tortas',
      description: 'Deliciosos bolos para o café, tortas cremosas e rocamboles para qualquer ocasião.',
      keywords: ['bolo', 'torta', 'cuca', 'rocambole', 'cheesecake', 'floresta negra', 'pudim', 'empadão', 'banoffee'],
    },
    {
      name: 'Doces e Sobremesas',
      description: 'Pudins, mousses, cremes, pavês, docinhos de festa, gelatinas e muito mais para adoçar o dia.',
      keywords: ['doce', 'sobremesa', 'pudim', 'mousse', 'creme', 'pave', 'sorvete', 'gelatina', 'manjar', 'bombom', 'trufa', 'paçoca', 'brigadeiro', 'quindim', 'cocada', 'ambrosia', 'suspiro', 'sagu', 'compota', 'goiabada', 'canjica', 'queijadinha', 'sonho', 'maria-mole', 'olho de sogra', 'clafoutis', 'panna cotta', 'crème brûlée', 'beijinho', 'danoninho'],
    },
    {
      name: 'Pães e Salgados',
      description: 'Receitas de pães caseiros, salgadinhos de festa, tortas salgadas, esfihas e lanches práticos.',
      keywords: ['pão', 'salgado', 'empada', 'quibe', 'waffle', 'panqueca', 'esfiha', 'coxinha', 'petisco', 'pastel', 'croquete', 'nhoque', 'risoto', 'sopa', 'caldo', 'dadinho de tapioca', 'cuscuz', 'vatapá', 'acarajé', 'pão de queijo', 'empadão', 'crepioca'],
    },
    {
      name: 'Biscoitos e Cookies',
      description: 'Encontre cookies, biscoitinhos amanteigados, sequilhos e rosquinhas para acompanhar seu café.',
      keywords: ['cookie', 'biscoito', 'sequilho', 'donut', 'rosquinha', 'alfajor', 'goiabinha', 'casadinho', 'bem-casado', 'churros'],
    },
    {
      name: 'Saudáveis e Fit',
      description: 'Opções leves e nutritivas, incluindo receitas fit, low-carb, integrais e proteicas.',
      keywords: ['fit', 'low carb', 'integral', 'proteico', 'vegano', 'sem glúten', 'detox', 'saudavel', 'funcional', 'barra de cereal', 'vitamina', 'mingau', 'crepioca'],
    },
  ];

export function getCategorizedRecipes(categoryName: string) {
    const allRecipes = getRecipes();
    const categoryDef = categoryDefinitions.find(c => c.name === categoryName);
  
    if (!categoryDef) {
      return [];
    }
  
    return allRecipes.filter(recipe => {
      const lowerCaseTitle = recipe.title.toLowerCase();
      const lowerCaseTags = recipe.tags?.map(tag => tag.toLowerCase()) || [];
      const keywords = categoryDef.keywords;
  
      // Prioritize tags for more accurate categorization
      if (lowerCaseTags.some(tag => keywords.includes(tag))) {
        return true;
      }
  
      // Fallback to title matching
      if (keywords.some(keyword => lowerCaseTitle.includes(keyword))) {
        return true;
      }
  
      return false;
    });
}
