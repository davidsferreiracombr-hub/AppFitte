
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

const recipes: Recipe[] = [
  { 
    id: 1, 
    slug: "mousse-de-abacate-com-cacau", 
    title: "Mousse de Abacate com Cacau", 
    description: "Cremoso, saudável e delicioso. Uma sobremesa rica em gorduras boas, perfeita para um doce sem culpa após as refeições.", 
    tags: ["vegano", "sem glúten", "mousse"],
    prepTime: "15 min",
    calories: "250 kcal",
    difficulty: "Fácil",
    servings: "2 porções",
    ingredients: [
        "1 abacate maduro e macio", 
        "3 colheres de sopa de cacau em pó 100%", 
        "3 colheres de sopa de melado de cana (ou agave)", 
        "1/4 xícara de leite vegetal (amêndoas, coco ou aveia)",
        "1 colher de chá de extrato de baunilha (opcional)",
        "Raspas de chocolate amargo para decorar"
    ],
    instructions: [
        "Corte o abacate ao meio, remova o caroço e retire toda a polpa com uma colher.",
        "No liquidificador ou processador de alimentos, adicione a polpa do abacate, o cacau em pó, o melado de cana, o leite vegetal e a baunilha.",
        "Bata em alta velocidade por cerca de 2-3 minutos, parando para raspar as laterais se necessário, até obter um creme completamente liso e aveludado.",
        "Experimente e ajuste a doçura se desejar, adicionando um pouco mais de melado.",
        "Distribua o mousse em taças ou potes individuais.",
        "Leve à geladeira por pelo menos 30 minutos para firmar e gelar. Este passo é crucial para a textura final.",
        "Antes de servir, decore com raspas de chocolate amargo."
    ],
    notes: "Para um sabor mais intenso, utilize um cacau de boa qualidade. Se o abacate não estiver muito maduro, pode ser necessário adicionar um pouco mais de leite vegetal para ajudar a bater."
  },
  { 
    id: 2, 
    slug: "brownie-de-batata-doce", 
    title: "Brownie de Batata-Doce", 
    description: "Um brownie funcional, sem farinha e super macio. Ideal para o pós-treino ou um lanche da tarde nutritivo.", 
    tags: ["vegano", "sem glúten", "brownie"],
    prepTime: "40 min",
    calories: "180 kcal por porção",
    difficulty: "Média",
    servings: "9 pedaços",
    ingredients: [
        "1 xícara de purê de batata-doce cozida e amassada (cerca de 1 batata-doce média)", 
        "1/2 xícara de farinha de amêndoas", 
        "1/2 xícara de cacau em pó", 
        "1/2 xícara de açúcar de coco", 
        "1/4 xícara de óleo de coco derretido",
        "1 colher de chá de fermento em pó",
        "1 pitada de sal",
        "50g de chocolate 70% cacau picado (opcional)"
    ],
    instructions: [
        "Pré-aqueça o forno a 180°C e unte uma forma quadrada (20x20 cm) ou forre com papel manteiga.",
        "Em uma tigela grande, misture o purê de batata-doce e o açúcar de coco.",
        "Adicione o óleo de coco derretido e misture bem.",
        "Em outra tigela, peneire a farinha de amêndoas, o cacau em pó, o fermento e o sal.",
        "Adicione os ingredientes secos aos úmidos e incorpore delicadamente com uma espátula até a massa ficar homogênea, sem misturar em excesso.",
        "Se estiver usando, adicione o chocolate picado à massa.",
        "Despeje a massa na forma preparada e alise a superfície.",
        "Asse por 25 a 30 minutos. O brownie deve estar firme nas bordas e ligeiramente úmido no centro.",
        "Deixe esfriar completamente na forma antes de cortar em 9 quadrados."
    ],
    notes: "A batata-doce deve estar bem cozida para que o purê fique lisinho. Você pode cozinhá-la no vapor ou assada. Se não tiver forno, pode tentar cozinhar porções individuais no micro-ondas por 2-3 minutos em um recipiente seguro, mas a textura pode variar."
  },
  { 
    id: 3, 
    slug: "cookie-de-banana-com-aveia", 
    title: "Cookie de Banana com Aveia", 
    description: "Apenas 2 ingredientes para um cookie rápido, prático e saudável. Perfeito para quando bate a vontade de um doce.", 
    tags: ["vegano", "sem glúten", "cookie"],
    prepTime: "20 min",
    calories: "90 kcal por cookie",
    difficulty: "Fácil",
    servings: "8 cookies",
    ingredients: [
        "2 bananas nanicas bem maduras, amassadas", 
        "1 xícara de aveia em flocos (finos ou grossos)",
        "Opcionais: 1/4 xícara de gotas de chocolate amargo, uvas passas, nozes picadas ou canela em pó."
    ],
    instructions: [
        "Pré-aqueça o forno a 180°C e forre uma assadeira com papel manteiga.",
        "Em uma tigela, amasse bem as bananas com um garfo até formar um purê.",
        "Adicione a aveia e misture bem até que toda a aveia esteja incorporada à banana.",
        "Se desejar, adicione os ingredientes opcionais e misture.",
        "Com a ajuda de duas colheres, forme pequenas bolas de massa e coloque-as na assadeira, achatando-as levemente para formar os cookies.",
        "Asse por 15-20 minutos, ou até que as bordas estejam douradas e firmes.",
        "Deixe esfriar na assadeira por alguns minutos antes de transferir para uma grade."
    ],
    notes: "Para uma versão ainda mais rápida, você pode cozinhar os cookies na airfryer a 160°C por cerca de 8-10 minutos. Fica ótimo!"
  },
  { 
    id: 4, 
    slug: "torta-de-limao-fit", 
    title: "Torta de Limão Fit", 
    description: "Versão saudável da clássica torta de limão, com base de castanhas e um recheio cremoso e azedinho.", 
    tags: ["sem glúten", "torta"],
    prepTime: "1h",
    calories: "300 kcal por fatia",
    difficulty: "Difícil",
    servings: "8 fatias",
    ingredients: [
        "Base: 1 e 1/2 xícara de amêndoas ou nozes", "Base: 1/2 xícara de tâmaras sem caroço",
        "Recheio: 1 xícara de castanha de caju crua (deixada de molho em água por 4 horas)", 
        "Recheio: Suco e raspas de 2 limões Tahiti", 
        "Recheio: 1/2 xícara de melado de cana ou xarope de bordo",
        "Recheio: 1/4 xícara de óleo de coco derretido"
    ],
    instructions: [
        "Para a base, processe as amêndoas e as tâmaras até formar uma massa pegajosa.",
        "Forre o fundo de uma forma de torta com fundo removível (20 cm) com a massa, pressionando bem.",
        "Para o recheio, escorra a água das castanhas de caju e lave-as bem.",
        "Bata as castanhas de caju no liquidificador com o suco de limão, o melado e o óleo de coco até obter um creme muito liso.",
        "Incorpore as raspas de limão ao creme.",
        "Despeje o recheio sobre a base e alise a superfície.",
        "Leve para gelar por pelo menos 4 horas, ou até que a torta esteja firme.",
        "Decore com mais raspas de limão antes de servir."
    ],
    notes: "Esta é uma torta 'crua' (raw), então não precisa de forno, apenas geladeira. Se não tiver um processador potente, deixe as castanhas de molho por mais tempo (até 8 horas) para facilitar."
  },
  { 
    id: 5, 
    slug: "pudim-de-chia-com-manga", 
    title: "Pudim de Chia com Manga", 
    description: "Uma opção leve e refrescante para o café da manhã ou sobremesa. Cheio de fibras e vitaminas.", 
    tags: ["vegano", "sem glúten", "pudim"],
    prepTime: "10 min + 4h de geladeira",
    calories: "200 kcal",
    difficulty: "Fácil",
    servings: "2 porções",
    ingredients: [
        "3 colheres de sopa de sementes de chia", 
        "1 xícara de leite de coco light", 
        "1 colher de sopa de melado de cana (opcional)",
        "Polpa de 1 manga Palmer madura batida"
    ],
    instructions: [
        "Em um pote com tampa, misture as sementes de chia, o leite de coco e o melado.",
        "Chacoalhe bem ou mexa com uma colher para garantir que não haja grumos.",
        "Leve à geladeira por pelo menos 4 horas (ou durante a noite) para que a chia hidrate e forme um gel.",
        "Após o tempo de geladeira, mexa o pudim de chia novamente.",
        "Em copos ou taças, monte camadas alternadas do pudim de chia e do purê de manga.",
        "Sirva gelado."
    ]
  },
  { 
    id: 6, 
    slug: "bolo-de-cenoura-funcional", 
    title: "Bolo de Cenoura Funcional", 
    description: "Bolo fofinho com cobertura de chocolate amargo, sem açúcar refinado e com o toque nutritivo da aveia.", 
    tags: ["bolo", "sem glúten"],
    prepTime: "50 min",
    calories: "220 kcal por fatia",
    difficulty: "Média",
    servings: "10 fatias",
    ingredients: [
        "2 cenouras médias raladas", 
        "3 ovos", 
        "1/2 xícara de óleo de coco", 
        "1 xícara de farinha de aveia", 
        "1/2 xícara de açúcar demerara ou de coco",
        "1 colher de sopa de fermento em pó",
        "Cobertura: 100g de chocolate 70% e 1/4 xícara de leite vegetal"
    ],
    instructions: [
        "Pré-aqueça o forno a 180°C. Unte e enfarinhe uma forma.",
        "No liquidificador, bata as cenouras, os ovos e o óleo de coco até obter uma mistura homogênea.",
        "Em uma tigela, misture a farinha de aveia, o açúcar e o fermento.",
        "Despeje a mistura líquida sobre os ingredientes secos e incorpore com uma espátula.",
        "Coloque a massa na forma e asse por aproximadamente 35-40 minutos, ou até que um palito inserido no centro saia limpo.",
        "Enquanto o bolo assa, prepare a cobertura: derreta o chocolate com o leite vegetal em fogo baixo ou no micro-ondas.",
        "Deixe o bolo amornar, desenforme e cubra com a ganache de chocolate."
    ]
  },
  { 
    id: 7, 
    slug: "trufa-de-tamara-com-nozes", 
    title: "Trufa de Tâmara com Nozes", 
    description: "Docinho rápido e energético, perfeito para antes do treino ou para matar a vontade de chocolate.", 
    tags: ["vegano", "sem glúten", "doce"],
    prepTime: "10 min",
    calories: "70 kcal por trufa",
    difficulty: "Fácil",
    servings: "12 trufas",
    ingredients: [
        "1 xícara de tâmaras Medjool sem caroço", 
        "1/2 xícara de nozes", 
        "2 colheres de sopa de cacau em pó",
        "1 pitada de sal"
    ],
    instructions: [
        "Se as tâmaras estiverem secas, deixe-as de molho em água morna por 10 minutos e escorra.",
        "Em um processador de alimentos, adicione as tâmaras, as nozes, o cacau e o sal.",
        "Processe até que os ingredientes se transformem em uma massa moldável e homogênea.",
        "Com as mãos levemente umedecidas, pegue pequenas porções da massa e enrole em bolinhas.",
        "Passe as trufas no cacau em pó ou em nibs de cacau para decorar.",
        "Mantenha na geladeira em um recipiente fechado."
    ]
  },
  { 
    id: 8, 
    slug: "beijinho-de-macadamia", 
    title: "Beijinho de Macadâmia", 
    description: "Uma versão sofisticada e saudável do clássico beijinho, sem leite condensado e cheio de sabor.", 
    tags: ["vegano", "sem glúten", "doce"],
    prepTime: "25 min",
    calories: "100 kcal por unidade",
    difficulty: "Média",
    servings: "10 unidades",
    ingredients: [
        "1 xícara de macadâmia crua (deixar de molho por 2h)", 
        "1/2 xícara de coco ralado sem açúcar", 
        "3 colheres de sopa de leite de coco em pó", 
        "2 colheres de sopa de melado de cana ou outro adoçante líquido",
        "Coco ralado para enrolar"
    ],
    instructions: [
        "Escorra e seque bem as macadâmias.",
        "Processe as macadâmias no processador até virar uma farinha fina e depois uma pasta cremosa.",
        "Adicione o coco ralado, o leite de coco em pó e o adoçante. Processe novamente para misturar.",
        "Leve a massa à geladeira por 15 minutos para firmar.",
        "Enrole em bolinhas e passe no coco ralado.",
        "Sirva gelado."
    ]
  },
  { 
    id: 9, 
    slug: "creme-de-papaia-com-cassis-fit", 
    title: "Creme de Papaia com Cassis Fit", 
    description: "Sobremesa digestiva e elegante, sem álcool e sem açúcar, para um toque gourmet no seu dia.", 
    tags: ["sem glúten", "creme"],
    prepTime: "5 min",
    calories: "150 kcal",
    difficulty: "Fácil",
    servings: "1 porção",
    ingredients: [
        "1/2 mamão papaia congelado em pedaços", 
        "2 colheres de sopa de iogurte grego natural ou iogurte de coco",
        "1 colher de sopa de suco de groselha (cassis) sem açúcar para decorar"
    ],
    instructions: [
        "No liquidificador ou processador, bata o mamão congelado com o iogurte até obter a consistência de um sorbet cremoso.",
        "Despeje em uma taça imediatamente.",
        "Regue com o suco de cassis por cima para decorar.",
        "Sirva na hora para não perder a textura."
    ]
  },
  { 
    id: 10, 
    slug: "bombom-de-morango-na-travessa", 
    title: "Bombom de Morango na Travessa", 
    description: "Uma sobremesa incrível com camadas de creme branco fit e morangos frescos, coberta com ganache.", 
    tags: ["doce", "sobremesa"],
    prepTime: "30 min + 2h de geladeira",
    calories: "280 kcal por porção",
    difficulty: "Média",
    servings: "6 porções",
    ingredients: [
        "Creme: 2 xícaras de castanha de caju demolhada, 1/2 xícara de água, 3 colheres de sopa de adoçante (xilitol ou eritritol)",
        "Recheio: 2 caixas de morangos frescos, limpos e picados",
        "Ganache: 1 xícara de chocolate 70% derretido com 1/2 xícara de leite vegetal"
    ],
    instructions: [
        "Para o creme, bata as castanhas com a água e o adoçante até obter um creme liso.",
        "Em uma travessa, faça uma camada com metade do creme branco.",
        "Distribua os morangos picados por cima do creme.",
        "Cubra com o restante do creme branco.",
        "Prepare a ganache misturando o chocolate derretido com o leite vegetal até ficar homogêneo.",
        "Despeje a ganache por cima da sobremesa, cobrindo tudo.",
        "Leve à geladeira por pelo menos 2 horas antes de servir."
    ]
  },
  { 
    id: 11, 
    slug: "danoninho-caseiro-fit", 
    title: "Danoninho Caseiro Fit", 
    description: "Iogurte de morango caseiro, rico em proteínas e probióticos, sem corantes ou conservantes.", 
    tags: ["crianças", "lanche"],
    prepTime: "10 min",
    calories: "120 kcal",
    difficulty: "Fácil",
    servings: "2 porções",
    ingredients: [
        "1 xícara de morangos congelados", 
        "1/2 xícara de iogurte grego natural ou Kefir", 
        "1 colher de sopa de mel ou melado (opcional)",
        "Opcional: 1 colher de sopa de leite em pó para mais cremosidade"
    ],
    instructions: [
        "Coloque todos os ingredientes no liquidificador ou mixer.",
        "Bata em alta velocidade até que a mistura esteja completamente homogênea e cremosa.",
        "Se necessário, adicione um pouquinho de água ou leite para ajudar a bater.",
        "Sirva imediatamente ou guarde na geladeira por até 2 dias."
    ]
  },
  { 
    id: 12, 
    slug: "brigadeiro-de-biomassa-de-banana-verde", 
    title: "Brigadeiro de Biomassa", 
    description: "Brigadeiro funcional que ajuda a regular o intestino, com a textura perfeita e muito sabor.", 
    tags: ["vegano", "sem glúten", "brigadeiro"],
    prepTime: "20 min",
    calories: "80 kcal por unidade",
    difficulty: "Média",
    servings: "15 unidades",
    ingredients: [
        "1 xícara de biomassa de banana verde", 
        "3 colheres de sopa de cacau em pó", 
        "3 colheres de sopa de açúcar de coco ou demerara",
        "1 colher de sopa de óleo de coco",
        "Granulado de chocolate amargo ou nibs de cacau para enrolar"
    ],
    instructions: [
        "Em uma panela, misture a biomassa, o cacau, o açúcar e o óleo de coco.",
        "Leve ao fogo baixo, mexendo continuamente com uma espátula, por cerca de 10-15 minutos.",
        "O ponto certo é quando a massa engrossar e começar a desgrudar do fundo da panela.",
        "Transfira para um prato untado com óleo de coco e deixe esfriar completamente.",
        "Após esfriar, unte as mãos e enrole os brigadeiros.",
        "Passe no granulado ou nibs de cacau."
    ]
  },
  { 
    id: 13, 
    slug: "cheesecake-de-frutas-vermelhas-sem-acucar", 
    title: "Cheesecake de Frutas Vermelhas", 
    description: "Cheesecake cremoso com calda de frutas vermelhas, sem adição de açúcar e com base low carb.", 
    tags: ["torta", "cheesecake"],
    prepTime: "1h + 4h de geladeira",
    calories: "320 kcal por fatia",
    difficulty: "Difícil",
    servings: "10 fatias",
    ingredients: [
        "Base: 1 e 1/2 xícara de farinha de amêndoas, 3 colheres de sopa de manteiga ghee derretida",
        "Recheio: 2 xícaras de cream cheese light ou biomassa, suco de 1 limão, 1/2 xícara de xilitol",
        "Calda: 1 xícara de frutas vermelhas congeladas, 2 colheres de sopa de xilitol"
    ],
    instructions: [
        "Misture a farinha de amêndoas com a manteiga e forre o fundo de uma forma.",
        "Asse a base por 10 minutos a 180°C e reserve.",
        "No liquidificador, bata o cream cheese, o suco de limão e o xilitol até ficar liso.",
        "Despeje o recheio sobre a base fria e asse em banho-maria por 45 minutos.",
        "Desligue o forno e deixe o cheesecake esfriar lá dentro.",
        "Leve à geladeira por 4 horas.",
        "Para a calda, cozinhe as frutas com o xilitol até engrossar. Deixe esfriar e cubra o cheesecake."
    ]
  },
  { 
    id: 14, 
    slug: "panqueca-de-aveia-com-frutas", 
    title: "Panqueca de Aveia com Frutas", 
    description: "Café da manhã reforçado, proteico e delicioso para começar o dia com energia total.", 
    tags: ["panqueca", "café da manhã"],
    prepTime: "15 min",
    calories: "250 kcal por porção",
    difficulty: "Fácil",
    servings: "1 porção (2 panquecas)",
    ingredients: [
        "1 ovo", 
        "2 colheres de sopa de farelo de aveia", 
        "1 banana pequena amassada", 
        "1 colher de chá de canela em pó",
        "Frutas picadas a gosto para servir (morangos, mirtilos, banana)"
    ],
    instructions: [
        "Em uma tigela, bata o ovo com um garfo.",
        "Adicione a banana amassada, o farelo de aveia e a canela. Misture bem até formar uma massa homogênea.",
        "Aqueça uma frigideira antiaderente em fogo médio.",
        "Despeje metade da massa na frigideira para formar a primeira panqueca.",
        "Cozinhe por 2-3 minutos de cada lado, ou até dourar.",
        "Repita com o restante da massa.",
        "Sirva as panquecas quentes, cobertas com suas frutas favoritas."
    ]
  },
  { 
    id: 15, 
    slug: "manjar-de-coco-com-calda-de-ameixa", 
    title: "Manjar de Coco Fit", 
    description: "Sobremesa clássica em versão saudável, com leite de coco caseiro, sem açúcar e naturalmente doce.", 
    tags: ["vegano", "sem glúten", "manjar"],
    prepTime: "25 min + 3h de geladeira",
    calories: "270 kcal",
    difficulty: "Média",
    servings: "8 porções",
    ingredients: [
        "1 litro de leite de coco (preferencialmente caseiro ou de boa qualidade)", 
        "1/2 xícara de amido de milho", 
        "4 colheres de sopa de açúcar de coco ou xilitol", 
        "Calda: 1 xícara de ameixas secas sem caroço, 1 xícara de água"
    ],
    instructions: [
        "Em uma panela, dissolva o amido de milho em uma parte do leite de coco.",
        "Adicione o restante do leite e o açúcar. Leve ao fogo médio, mexendo sempre.",
        "Cozinhe até a mistura engrossar bem (ponto de mingau espesso), por cerca de 15 minutos.",
        "Despeje o creme em uma forma de pudim umedecida com água.",
        "Deixe esfriar e leve à geladeira por no mínimo 3 horas.",
        "Para a calda, cozinhe as ameixas com a água em fogo baixo até que amoleçam e a calda engrosse ligeiramente.",
        "Desenforme o manjar e sirva com a calda de ameixas fria por cima."
    ]
  },
  {
    id: 16,
    slug: "bolo-de-banana-fit",
    title: "Bolo de Banana Fit com Aveia",
    description: "Um bolo úmido e saboroso, sem açúcar refinado, perfeito para aproveitar aquelas bananas maduras.",
    tags: ["bolo", "sem glúten", "lanche"],
    prepTime: "45 min",
    calories: "190 kcal por fatia",
    difficulty: "Fácil",
    servings: "12 fatias",
    ingredients: [
      "4 bananas nanicas bem maduras",
      "3 ovos",
      "1/4 xícara de óleo de coco",
      "1/2 xícara de uvas passas (opcional)",
      "2 xícaras de aveia em flocos",
      "1 colher de sopa de canela em pó",
      "1 colher de sopa de fermento em pó"
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C e unte uma forma de bolo inglês.",
      "No liquidificador, bata as bananas, os ovos e o óleo de coco até obter uma mistura cremosa.",
      "Em uma tigela, misture a aveia, a canela e as uvas passas.",
      "Despeje a mistura líquida sobre os ingredientes secos e incorpore bem.",
      "Adicione o fermento e mexa delicadamente.",
      "Despeje a massa na forma e asse por cerca de 30-35 minutos, ou até dourar.",
      "Deixe esfriar para desenformar e servir."
    ],
    notes: "Fica delicioso com uma pasta de amendoim por cima. Você pode usar a airfryer a 180ºC por cerca de 20-25 minutos, dependendo da potência."
  },
  {
    id: 17,
    slug: "bolo-de-fuba-cremoso-fit",
    title: "Bolo de Fubá Cremoso Fit",
    description: "Aquele bolo de fubá com textura de pudim, mas em uma versão saudável e sem culpa para o seu café da tarde.",
    tags: ["bolo", "sem glúten"],
    prepTime: "1h",
    calories: "210 kcal por fatia",
    difficulty: "Média",
    servings: "10 fatias",
    ingredients: [
      "4 ovos",
      "2 xícaras de leite desnatado ou vegetal",
      "1 xícara de fubá mimoso",
      "1/2 xícara de açúcar de coco ou xilitol",
      "2 colheres de sopa de óleo de coco",
      "50g de coco ralado sem açúcar",
      "1 colher de sopa de fermento em pó"
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C.",
      "No liquidificador, bata todos os ingredientes, exceto o fermento, por 3 minutos.",
      "Adicione o fermento e bata rapidamente, apenas para misturar.",
      "Despeje a massa, que é bem líquida, em uma forma untada e enfarinhada.",
      "Asse por cerca de 40-50 minutos. O bolo cria duas camadas: uma cremosa embaixo e uma fofinha em cima.",
      "Espere esfriar completamente para cortar, pois ele é delicado."
    ],
    notes: "Este bolo é naturalmente cremoso, então não se assuste com a consistência da massa. A mágica acontece no forno!"
  },
  {
    id: 18,
    slug: "bolo-de-chocolate-low-carb",
    title: "Bolo de Chocolate Low Carb",
    description: "Um bolo de chocolate intenso, fofinho e totalmente low carb, feito com farinha de amêndoas.",
    tags: ["bolo", "low carb", "sem glúten"],
    prepTime: "40 min",
    calories: "250 kcal por fatia",
    difficulty: "Média",
    servings: "8 fatias",
    ingredients: [
      "4 ovos",
      "1 xícara de farinha de amêndoas",
      "1/2 xícara de cacau em pó 100%",
      "1/2 xícara de adoçante xilitol ou eritritol",
      "100ml de leite de coco",
      "3 colheres de sopa de óleo de coco",
      "1 colher de sopa de fermento em pó"
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C.",
      "Bata os ovos com o adoçante até obter um creme claro.",
      "Adicione o óleo de coco e o leite de coco, e misture.",
      "Incorpore a farinha de amêndoas e o cacau em pó peneirados.",
      "Por último, adicione o fermento e misture delicadamente.",
      "Asse em forma untada por cerca de 30 minutos.",
      "Faça uma calda com chocolate 70% e leite de coco para cobrir, se desejar."
    ]
  },
  ...Array.from({ length: 700 }, (_, i) => ({
    id: 19 + i,
    slug: `receita-fit-${19 + i}`,
    title: `Doce Fit Delicioso`,
    description: "Uma receita de doce saudável, rápida e incrivelmente saborosa, perfeita para qualquer ocasião.",
    tags: ["doce", "fit", i % 3 === 0 ? "bolo" : (i % 2 === 0 ? "vegano" : "sem glúten")],
    prepTime: `${Math.floor(Math.random() * 20) + 10} min`,
    calories: `${Math.floor(Math.random() * 150) + 100} kcal`,
    difficulty: (["Fácil", "Média", "Difícil"] as const)[Math.floor(Math.random() * 3)],
    servings: `${Math.floor(Math.random() * 4) + 2} porções`,
    ingredients: [
      "Ingrediente principal (ex: 1 xícara de fruta)",
      "Adoçante natural (ex: 2 colheres de sopa de mel)",
      "Agente de liga (ex: 1/4 xícara de aveia)",
      "Saborizante (ex: 1 colher de chá de canela)"
    ],
    instructions: [
      "Misture todos os ingredientes secos em uma tigela.",
      "Adicione os ingredientes molhados e misture bem.",
      "Modele a massa no formato desejado (bolinhas, barras, etc.).",
      "Leve ao forno pré-aquecido a 180°C por 15 minutos ou à geladeira por 30 minutos, dependendo da receita.",
      "Decore a gosto e sirva."
    ],
    notes: "Seja criativo! Você pode adicionar nozes, sementes ou gotas de chocolate amargo para dar um toque especial."
  }))
];

export function getRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}
