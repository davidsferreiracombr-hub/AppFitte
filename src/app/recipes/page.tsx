import { getRecipes } from '@/lib/recipes';
import RecipesClient from './recipes-client';
import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Recipes | Fit Sweet Delights',
    description: 'Explore hundreds of healthy and delicious dessert recipes.'
};

export default async function RecipesPage() {
  const recipes = await getRecipes();
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Explore Our Sweet & Healthy Recipes</h1>
        <p className="text-center text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Find the perfect dessert to satisfy your cravings without compromising your health goals.
        </p>
      </div>
      <RecipesClient recipes={recipes} />
    </div>
  );
}
