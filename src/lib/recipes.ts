import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type Recipe = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: ImagePlaceholder;
  prepTime: string;
  cookTime: string;
  servings: string;
  tags: string[];
  ingredients: {
    name: string;
    quantity: string;
  }[];
  instructions: string[];
  nutritionalInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
};

const recipes: Recipe[] = [
  {
    id: 1,
    slug: 'avocado-chocolate-mousse',
    title: 'Avocado Chocolate Mousse',
    description: 'A creamy, rich, and decadent chocolate mousse that is secretly healthy.',
    image: PlaceHolderImages.find(p => p.id === 'recipe-1')!,
    prepTime: '10 mins',
    cookTime: '0 mins',
    servings: '4',
    tags: ['vegan', 'gluten-free', 'dairy-free'],
    ingredients: [
      { name: 'Ripe Avocados', quantity: '2' },
      { name: 'Unsweetened Cocoa Powder', quantity: '1/2 cup' },
      { name: 'Maple Syrup or Agave', quantity: '1/2 cup' },
      { name: 'Plant-based Milk', quantity: '1/4 cup' },
      { name: 'Vanilla Extract', quantity: '1 tsp' },
      { name: 'Pinch of Salt', quantity: '1' },
    ],
    instructions: [
      'Combine all ingredients in a high-speed blender or food processor.',
      'Blend until completely smooth and creamy, scraping down the sides as needed.',
      'Taste and adjust sweetness if necessary.',
      'Divide the mousse into serving dishes and refrigerate for at least 30 minutes to chill and set.',
      'Serve chilled, garnished with berries or chocolate shavings.'
    ],
    nutritionalInfo: {
      calories: '250 kcal',
      protein: '5g',
      carbs: '30g',
      fat: '15g',
    },
  },
  {
    id: 2,
    slug: 'berry-chia-seed-pudding',
    title: 'Berry Chia Seed Pudding',
    description: 'A simple and nutritious breakfast, snack, or dessert packed with fiber and omega-3s.',
    image: PlaceHolderImages.find(p => p.id === 'recipe-2')!,
    prepTime: '5 mins',
    cookTime: '4 hours (chill time)',
    servings: '2',
    tags: ['vegan', 'gluten-free', 'high-fiber'],
    ingredients: [
      { name: 'Chia Seeds', quantity: '1/4 cup' },
      { name: 'Almond Milk', quantity: '1 cup' },
      { name: 'Mixed Berries (fresh or frozen)', quantity: '1/2 cup' },
      { name: 'Maple Syrup', quantity: '1 tbsp' },
      { name: 'Vanilla Extract', quantity: '1/2 tsp' },
    ],
    instructions: [
      'In a jar or bowl, whisk together chia seeds, almond milk, maple syrup, and vanilla.',
      'Once combined, let it sit for 5 minutes, then whisk again to break up any clumps.',
      'Cover and refrigerate for at least 4 hours or overnight, until it has a pudding-like consistency.',
      'Serve layered with mixed berries.'
    ],
    nutritionalInfo: {
      calories: '220 kcal',
      protein: '6g',
      carbs: '25g',
      fat: '12g',
    },
  },
  {
    id: 3,
    slug: 'no-bake-energy-bites',
    title: 'No-Bake Energy Bites',
    description: 'Perfect for a pre-workout snack or a healthy treat to curb your sweet cravings.',
    image: PlaceHolderImages.find(p => p.id === 'recipe-3')!,
    prepTime: '15 mins',
    cookTime: '0 mins',
    servings: '12 bites',
    tags: ['no-bake', 'quick', 'gluten-free'],
    ingredients: [
      { name: 'Rolled Oats', quantity: '1 cup' },
      { name: 'Natural Peanut Butter', quantity: '1/2 cup' },
      { name: 'Honey or Maple Syrup', quantity: '1/3 cup' },
      { name: 'Flax Seeds', quantity: '1/4 cup' },
      { name: 'Dark Chocolate Chips', quantity: '1/4 cup' },
    ],
    instructions: [
      'In a medium bowl, mix all ingredients together until well combined.',
      'Refrigerate the mixture for 15-30 minutes to make it easier to roll.',
      'Roll the mixture into 1-inch balls.',
      'Store in an airtight container in the refrigerator for up to a week.'
    ],
    nutritionalInfo: {
      calories: '120 kcal',
      protein: '4g',
      carbs: '15g',
      fat: '6g',
    },
  },
  {
    id: 4,
    slug: 'sweet-potato-brownies',
    title: 'Sweet Potato Brownies',
    description: 'Fudgy, delicious, and made with a secret healthy ingredient: sweet potato!',
    image: PlaceHolderImages.find(p => p.id === 'recipe-4')!,
    prepTime: '20 mins',
    cookTime: '25 mins',
    servings: '9',
    tags: ['gluten-free', 'veggie-packed', 'vegan'],
    ingredients: [
      { name: 'Mashed Sweet Potato', quantity: '1 cup' },
      { name: 'Almond Butter', quantity: '1/2 cup' },
      { name: 'Maple Syrup', quantity: '1/4 cup' },
      { name: 'Cocoa Powder', quantity: '1/3 cup' },
      { name: 'Oat Flour', quantity: '1/4 cup' },
      { name: 'Baking Powder', quantity: '1 tsp' },
    ],
    instructions: [
      'Preheat oven to 350°F (175°C) and line an 8x8 inch baking pan.',
      'In a large bowl, mix together mashed sweet potato, almond butter, and maple syrup.',
      'Stir in the cocoa powder, oat flour, and baking powder until just combined.',
      'Pour batter into the prepared pan and spread evenly.',
      'Bake for 20-25 minutes, or until a toothpick inserted into the center comes out clean.',
      'Let cool completely before cutting into squares.'
    ],
    nutritionalInfo: {
      calories: '150 kcal',
      protein: '5g',
      carbs: '20g',
      fat: '7g',
    },
  },
  {
    id: 5,
    slug: 'greek-yogurt-parfait',
    title: 'Greek Yogurt Parfait',
    description: 'A high-protein, layered dessert that\'s as beautiful as it is delicious.',
    image: PlaceHolderImages.find(p => p.id === 'recipe-5')!,
    prepTime: '5 mins',
    cookTime: '0 mins',
    servings: '1',
    tags: ['high-protein', 'quick', 'gluten-free'],
    ingredients: [
      { name: 'Plain Greek Yogurt', quantity: '1 cup' },
      { name: 'Mixed Berries', quantity: '1/2 cup' },
      { name: 'Granola', quantity: '1/4 cup' },
      { name: 'Drizzle of Honey', quantity: '1 tsp' },
    ],
    instructions: [
      'In a glass or jar, create layers starting with Greek yogurt.',
      'Add a layer of mixed berries, followed by a layer of granola.',
      'Repeat the layers until the glass is full.',
      'Top with a final dollop of yogurt, a few berries, and a drizzle of honey.'
    ],
    nutritionalInfo: {
      calories: '300 kcal',
      protein: '20g',
      carbs: '40g',
      fat: '8g',
    },
  },
    {
    id: 6,
    slug: 'baked-apples-with-cinnamon',
    title: 'Baked Apples with Cinnamon',
    description: 'A warm, comforting, and simple dessert that tastes like apple pie without the crust.',
    image: PlaceHolderImages.find(p => p.id === 'recipe-6')!,
    prepTime: '10 mins',
    cookTime: '30 mins',
    servings: '4',
    tags: ['gluten-free', 'low-fat', 'vegan'],
    ingredients: [
      { name: 'Apples', quantity: '4' },
      { name: 'Cinnamon', quantity: '1 tsp' },
      { name: 'Maple Syrup', quantity: '2 tbsp' },
      { name: 'Chopped Walnuts or Pecans', quantity: '1/4 cup' },
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Core the apples, leaving the bottom intact. Place them in a baking dish.',
      'In a small bowl, mix together cinnamon, maple syrup, and chopped nuts.',
      'Fill each apple with the mixture.',
      'Pour a little water into the bottom of the baking dish to prevent sticking.',
      'Bake for 30-40 minutes, or until the apples are tender.',
      'Serve warm, optionally with a scoop of yogurt.'
    ],
    nutritionalInfo: {
      calories: '180 kcal',
      protein: '2g',
      carbs: '35g',
      fat: '5g',
    },
  },
];

export async function getRecipes(): Promise<Recipe[]> {
  // In a real app, you'd fetch this from a database.
  return Promise.resolve(recipes);
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | undefined> {
  // In a real app, you'd fetch this from a database.
  return Promise.resolve(recipes.find((recipe) => recipe.slug === slug));
}
