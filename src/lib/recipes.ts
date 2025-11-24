export type Recipe = {
  id: number;
  slug: string;
  title: string;
  description: string;
  tags: string[];
};

const recipes: Recipe[] = [
  { id: 1, slug: "mousse-de-abacate-com-cacau", title: "Mousse de Abacate com Cacau", description: "Cremoso, saudável e delicioso. Uma sobremesa rica em gorduras boas.", tags: ["vegano", "sem glúten", "mousse"] },
  { id: 2, slug: "brownie-de-batata-doce", title: "Brownie de Batata-Doce", description: "Um brownie funcional, sem farinha e super macio. Ideal para o pós-treino.", tags: ["vegano", "sem glúten", "brownie"] },
  { id: 3, slug: "cookie-de-banana-com-aveia", title: "Cookie de Banana com Aveia", description: "Apenas 2 ingredientes para um cookie rápido, prático e saudável.", tags: ["vegano", "sem glúten", "cookie"] },
  { id: 4, slug: "torta-de-limao-fit", title: "Torta de Limão Fit", description: "Versão saudável da clássica torta de limão, com base de castanhas.", tags: ["sem glúten", "torta"] },
  { id: 5, slug: "pudim-de-chia-com-manga", title: "Pudim de Chia com Manga", description: "Uma opção leve e refrescante para o café da manhã ou sobremesa.", tags: ["vegano", "sem glúten", "pudim"] },
  { id: 6, slug: "bolo-de-cenoura-funcional", title: "Bolo de Cenoura Funcional", description: "Bolo fofinho com cobertura de chocolate amargo, sem açúcar refinado.", tags: ["bolo", "sem glúten"] },
  { id: 7, slug: "trufa-de-tamara-com-nozes", title: "Trufa de Tâmara com Nozes", description: "Docinho rápido e energético, perfeito para antes do treino.", tags: ["vegano", "sem glúten", "doce"] },
  { id: 8, slug: "beijinho-de-macadamia", title: "Beijinho de Macadâmia", description: "Uma versão sofisticada e saudável do clássico beijinho.", tags: ["vegano", "sem glúten", "doce"] },
  { id: 9, slug: "creme-de-papaia-com-cassis-fit", title: "Creme de Papaia com Cassis Fit", description: "Sobremesa digestiva e elegante, sem álcool e sem açúcar.", tags: ["sem glúten", "creme"] },
  { id: 10, slug: "bombom-de-morango-na-travessa", title: "Bombom de Morango na Travessa", description: "Uma sobremesa incrível com camadas de creme e morangos frescos.", tags: ["doce", "sobremesa"] },
  { id: 11, slug: "danoninho-caseiro-fit", title: "Danoninho Caseiro Fit", description: "Iogurte de morango caseiro, rico em proteínas e probióticos.", tags: ["crianças", "lanche"] },
  { id: 12, slug: "brigadeiro-de-biomassa-de-banana-verde", title: "Brigadeiro de Biomassa", description: "Brigadeiro funcional que ajuda a regular o intestino.", tags: ["vegano", "sem glúten", "brigadeiro"] },
  { id: 13, slug: "cheesecake-de-frutas-vermelhas-sem-acucar", title: "Cheesecake de Frutas Vermelhas", description: "Cheesecake cremoso com calda de frutas vermelhas, sem adição de açúcar.", tags: ["torta", "cheesecake"] },
  { id: 14, slug: "panqueca-de-aveia-com-frutas", title: "Panqueca de Aveia com Frutas", description: "Café da manhã reforçado e delicioso para começar o dia.", tags: ["panqueca", "café da manhã"] },
  { id: 15, slug: "manjar-de-coco-com-calda-de-ameixa", title: "Manjar de Coco Fit", description: "Sobremesa clássica em versão saudável, com leite de coco caseiro.", tags: ["vegano", "sem glúten", "manjar"] },
];

// Preenchendo com mais receitas para chegar a 500
const baseRecipes = [...recipes];
let currentId = recipes.length + 1;
while (recipes.length < 500) {
  const baseRecipe = baseRecipes[Math.floor(Math.random() * baseRecipes.length)];
  recipes.push({
    ...baseRecipe,
    id: currentId,
    slug: `${baseRecipe.slug}-${currentId}`,
    title: `${baseRecipe.title} #${currentId - baseRecipes.length}`,
  });
  currentId++;
}


export function getRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}
