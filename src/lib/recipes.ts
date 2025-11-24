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
};

const recipes: Recipe[] = [
  { 
    id: 1, 
    slug: "mousse-de-abacate-com-cacau", 
    title: "Mousse de Abacate com Cacau", 
    description: "Cremoso, saudável e delicioso. Uma sobremesa rica em gorduras boas.", 
    tags: ["vegano", "sem glúten", "mousse"],
    prepTime: "15 min",
    calories: "250 kcal",
    difficulty: "Fácil",
    ingredients: ["1 abacate maduro", "3 colheres de sopa de cacau em pó", "3 colheres de sopa de melado de cana", "1/4 xícara de leite vegetal"],
    instructions: ["Bata todos os ingredientes no liquidificador até obter um creme homogêneo.", "Leve à geladeira por pelo menos 30 minutos antes de servir."]
  },
  { 
    id: 2, 
    slug: "brownie-de-batata-doce", 
    title: "Brownie de Batata-Doce", 
    description: "Um brownie funcional, sem farinha e super macio. Ideal para o pós-treino.", 
    tags: ["vegano", "sem glúten", "brownie"],
    prepTime: "40 min",
    calories: "180 kcal por porção",
    difficulty: "Média",
    ingredients: ["1 xícara de purê de batata-doce", "1/2 xícara de farinha de amêndoas", "1/2 xícara de cacau em pó", "1/2 xícara de açúcar de coco", "1/4 xícara de óleo de coco"],
    instructions: ["Misture todos os ingredientes secos.", "Adicione os ingredientes úmidos e misture bem.", "Asse em forno pré-aquecido a 180°C por 25 minutos."]
  },
  { 
    id: 3, 
    slug: "cookie-de-banana-com-aveia", 
    title: "Cookie de Banana com Aveia", 
    description: "Apenas 2 ingredientes para um cookie rápido, prático e saudável.", 
    tags: ["vegano", "sem glúten", "cookie"],
    prepTime: "20 min",
    calories: "90 kcal por cookie",
    difficulty: "Fácil",
    ingredients: ["2 bananas maduras amassadas", "1 xícara de aveia em flocos"],
    instructions: ["Misture a banana amassada com a aveia.", "Modele os cookies e asse em forno pré-aquecido a 180°C por 15 minutos."]
  },
  { 
    id: 4, 
    slug: "torta-de-limao-fit", 
    title: "Torta de Limão Fit", 
    description: "Versão saudável da clássica torta de limão, com base de castanhas.", 
    tags: ["sem glúten", "torta"],
    prepTime: "1h",
    calories: "300 kcal por fatia",
    difficulty: "Difícil",
    ingredients: ["Base: 1 xícara de castanhas", "Recheio: 1 xícara de castanha de caju demolhada, suco de 2 limões, 1/2 xícara de melado"],
    instructions: ["Processe as castanhas da base e forre uma forma.", "Bata os ingredientes do recheio e despeje sobre a base.", "Leve para gelar por 4 horas."]
  },
  { 
    id: 5, 
    slug: "pudim-de-chia-com-manga", 
    title: "Pudim de Chia com Manga", 
    description: "Uma opção leve e refrescante para o café da manhã ou sobremesa.", 
    tags: ["vegano", "sem glúten", "pudim"],
    prepTime: "10 min + 4h de geladeira",
    calories: "200 kcal",
    difficulty: "Fácil",
    ingredients: ["3 colheres de sopa de chia", "1 xícara de leite de coco", "1 manga em cubos"],
    instructions: ["Misture a chia com o leite de coco e deixe hidratar por 4 horas na geladeira.", "Sirva com a manga em cubos por cima."]
  },
  { 
    id: 6, 
    slug: "bolo-de-cenoura-funcional", 
    title: "Bolo de Cenoura Funcional", 
    description: "Bolo fofinho com cobertura de chocolate amargo, sem açúcar refinado.", 
    tags: ["bolo", "sem glúten"],
    prepTime: "50 min",
    calories: "220 kcal por fatia",
    difficulty: "Média",
    ingredients: ["2 cenouras", "3 ovos", "1/2 xícara de óleo de coco", "1 xícara de farinha de aveia", "1/2 xícara de açúcar demerara"],
    instructions: ["Bata cenouras, ovos e óleo no liquidificador.", "Misture com os secos e asse a 180°C por 35 minutos."]
  },
  { 
    id: 7, 
    slug: "trufa-de-tamara-com-nozes", 
    title: "Trufa de Tâmara com Nozes", 
    description: "Docinho rápido e energético, perfeito para antes do treino.", 
    tags: ["vegano", "sem glúten", "doce"],
    prepTime: "10 min",
    calories: "70 kcal por trufa",
    difficulty: "Fácil",
    ingredients: ["1 xícara de tâmaras sem caroço", "1/2 xícara de nozes", "2 colheres de cacau em pó"],
    instructions: ["Processe todos os ingredientes até formar uma massa.", "Enrole em bolinhas e passe no cacau em pó."]
  },
  { 
    id: 8, 
    slug: "beijinho-de-macadamia", 
    title: "Beijinho de Macadâmia", 
    description: "Uma versão sofisticada e saudável do clássico beijinho.", 
    tags: ["vegano", "sem glúten", "doce"],
    prepTime: "25 min",
    calories: "100 kcal por unidade",
    difficulty: "Média",
    ingredients: ["1 xícara de macadâmia crua", "1/2 xícara de coco ralado", "3 colheres de sopa de leite de coco", "Adoçante a gosto"],
    instructions: ["Processe as macadâmias até virar uma pasta.", "Misture com os outros ingredientes e enrole."]
  },
  { 
    id: 9, 
    slug: "creme-de-papaia-com-cassis-fit", 
    title: "Creme de Papaia com Cassis Fit", 
    description: "Sobremesa digestiva e elegante, sem álcool e sem açúcar.", 
    tags: ["sem glúten", "creme"],
    prepTime: "5 min",
    calories: "150 kcal",
    difficulty: "Fácil",
    ingredients: ["1/2 mamão papaia congelado", "2 colheres de sopa de iogurte natural"],
    instructions: ["Bata o mamão com o iogurte no liquidificador até ficar cremoso.", "Sirva imediatamente."]
  },
  { 
    id: 10, 
    slug: "bombom-de-morango-na-travessa", 
    title: "Bombom de Morango na Travessa", 
    description: "Uma sobremesa incrível com camadas de creme e morangos frescos.", 
    tags: ["doce", "sobremesa"],
    prepTime: "30 min + 2h de geladeira",
    calories: "280 kcal por porção",
    difficulty: "Média",
    ingredients: ["1 caixa de morangos", "1 lata de leite condensado fake", "1 xícara de chocolate 70% derretido"],
    instructions: ["Faça um creme com o leite condensado.", "Alterne camadas de creme e morangos.", "Cubra com chocolate derretido e gele."]
  },
  { 
    id: 11, 
    slug: "danoninho-caseiro-fit", 
    title: "Danoninho Caseiro Fit", 
    description: "Iogurte de morango caseiro, rico em proteínas e probióticos.", 
    tags: ["crianças", "lanche"],
    prepTime: "10 min",
    calories: "120 kcal",
    difficulty: "Fácil",
    ingredients: ["1 xícara de morangos congelados", "1/2 xícara de iogurte grego natural", "Adoçante a gosto"],
    instructions: ["Bata todos os ingredientes no liquidificador.", "Sirva gelado."]
  },
  { 
    id: 12, 
    slug: "brigadeiro-de-biomassa-de-banana-verde", 
    title: "Brigadeiro de Biomassa", 
    description: "Brigadeiro funcional que ajuda a regular o intestino.", 
    tags: ["vegano", "sem glúten", "brigadeiro"],
    prepTime: "20 min",
    calories: "80 kcal por unidade",
    difficulty: "Média",
    ingredients: ["1 xícara de biomassa de banana verde", "3 colheres de sopa de cacau em pó", "Açúcar de coco a gosto"],
    instructions: ["Leve tudo ao fogo baixo, mexendo sempre, até desgrudar do fundo da panela.", "Deixe esfriar e enrole."]
  },
  { 
    id: 13, 
    slug: "cheesecake-de-frutas-vermelhas-sem-acucar", 
    title: "Cheesecake de Frutas Vermelhas", 
    description: "Cheesecake cremoso com calda de frutas vermelhas, sem adição de açúcar.", 
    tags: ["torta", "cheesecake"],
    prepTime: "1h + 4h de geladeira",
    calories: "320 kcal por fatia",
    difficulty: "Difícil",
    ingredients: ["Base: 1 xícara de amêndoas", "Recheio: 2 xícaras de cream cheese light, suco de 1 limão", "Calda: 1 xícara de frutas vermelhas"],
    instructions: ["Triture as amêndoas e forre uma forma.", "Bata o recheio e despeje na forma.", "Asse, gele e cubra com a calda."]
  },
  { 
    id: 14, 
    slug: "panqueca-de-aveia-com-frutas", 
    title: "Panqueca de Aveia com Frutas", 
    description: "Café da manhã reforçado e delicioso para começar o dia.", 
    tags: ["panqueca", "café da manhã"],
    prepTime: "15 min",
    calories: "250 kcal por porção",
    difficulty: "Fácil",
    ingredients: ["1 ovo", "2 colheres de sopa de farelo de aveia", "1 banana amassada", "Frutas picadas a gosto"],
    instructions: ["Misture ovo, aveia e banana.", "Despeje em uma frigideira antiaderente quente.", "Sirva com frutas picadas."]
  },
  { 
    id: 15, 
    slug: "manjar-de-coco-com-calda-de-ameixa", 
    title: "Manjar de Coco Fit", 
    description: "Sobremesa clássica em versão saudável, com leite de coco caseiro.", 
    tags: ["vegano", "sem glúten", "manjar"],
    prepTime: "25 min + 3h de geladeira",
    calories: "270 kcal",
    difficulty: "Média",
    ingredients: ["1 litro de leite de coco", "1/2 xícara de amido de milho", "Açúcar de coco a gosto", "Calda: ameixas secas"],
    instructions: ["Cozinhe o leite, amido e açúcar até engrossar.", "Despeje em forma e gele.", "Sirva com a calda de ameixas."]
  },
];

const difficulties: Array<"Fácil" | "Média" | "Difícil"> = ["Fácil", "Média", "Difícil"];

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
    prepTime: `${Math.floor(Math.random() * 50) + 10} min`,
    calories: `${Math.floor(Math.random() * 300) + 100} kcal`,
    difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
  });
  currentId++;
}


export function getRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}
