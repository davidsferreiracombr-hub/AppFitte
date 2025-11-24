'use client';

import { useEffect, useState } from 'react';
import { getRecipeBySlug, type Recipe } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChefHat, Clock, Flame, Utensils, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RecipePage({ params }: { params: { slug: string } }) {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);

  useEffect(() => {
    const foundRecipe = getRecipeBySlug(params.slug);
    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      // In a real client-side scenario, you might want to handle this differently
      // as notFound() is for server components. For this SPA-like behavior,
      // we can perhaps redirect or show a "not found" component.
      console.log('Recipe not found');
    }
  }, [params.slug]);

  if (!recipe) {
    // You could return a loading skeleton here
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
  }

  return (
    <div className="bg-white min-h-screen font-body">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl py-12">
        <div className="mb-8">
            <Link href="/" legacyBehavior>
                <a className="inline-flex items-center text-primary hover:text-primary/90 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para todas as receitas
                </a>
            </Link>
        </div>

        <header className="text-center mb-10">
          <ChefHat className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-gray-800">
            {recipe.title}
          </h1>
          <p className="text-gray-500 mt-3 text-base">
            {recipe.description}
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 text-center">
            <div className="bg-gray-50 p-4 rounded-lg">
                <Clock className="h-6 w-6 mx-auto text-primary mb-2" />
                <p className="font-semibold text-sm text-gray-700">Tempo</p>
                <p className="text-sm text-gray-600">{recipe.prepTime}</p>
            </div>
             <div className="bg-gray-50 p-4 rounded-lg">
                <Flame className="h-6 w-6 mx-auto text-primary mb-2" />
                <p className="font-semibold text-sm text-gray-700">Calorias</p>
                <p className="text-sm text-gray-600">{recipe.calories}</p>
            </div>
             <div className="bg-gray-50 p-4 rounded-lg col-span-2 sm:col-span-1">
                <Info className="h-6 w-6 mx-auto text-primary mb-2" />
                <p className="font-semibold text-sm text-gray-700">Dificuldade</p>
                <p className="text-sm text-gray-600">{recipe.difficulty}</p>
            </div>
        </div>

        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-headline font-bold text-gray-800 mb-4 flex items-center gap-3"><Utensils className="h-6 w-6 text-primary" /> Ingredientes</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 bg-gray-50 p-6 rounded-lg">
                    {recipe.ingredients.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-headline font-bold text-gray-800 mb-4 flex items-center gap-3"><ChefHat className="h-6 w-6 text-primary" /> Modo de Preparo</h2>
                 <ol className="list-decimal list-inside space-y-4 text-gray-700 bg-gray-50 p-6 rounded-lg">
                    {recipe.instructions.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ol>
            </div>
        </div>

      </div>
    </div>
  );
}
