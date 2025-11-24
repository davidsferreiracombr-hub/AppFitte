'use client';

import { useEffect, useState } from 'react';
import { getRecipeBySlug, type Recipe } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChefHat, Clock, Flame, Utensils, Info, BookText, Award, TimerIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Timer } from '@/components/Timer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RecipePage({ params }: { params: { slug: string } }) {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const foundRecipe = getRecipeBySlug(params.slug);
    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      // Em um app de produção, você poderia redirecionar para uma página 404
      // notFound() é para Server Components, então logamos no console aqui
      console.log('Recipe not found');
    }
  }, [params.slug]);

  const prepTimeInMinutes = recipe?.prepTime ? parseInt(recipe.prepTime.split(' ')[0]) : 0;

  // Evita problemas de hidratação
  if (!isMounted) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
  }

  if (!recipe) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-center px-4">
        <ChefHat className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Receita não encontrada</h1>
        <p className="text-gray-600 mb-6">A receita que você está procurando não existe ou foi movida.</p>
        <Link href="/" legacyBehavior>
            <a className="inline-flex items-center text-primary hover:text-primary/90 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para todas as receitas
            </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-body">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        <div className="mb-8">
            <Link href="/" legacyBehavior>
                <a className="inline-flex items-center text-primary hover:text-primary/90 transition-colors font-semibold">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para todas as receitas
                </a>
            </Link>
        </div>

        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="text-center p-8 bg-white">
            <ChefHat className="mx-auto h-12 w-12 text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-gray-800">
              {recipe.title}
            </h1>
            <p className="text-gray-500 mt-3 text-base max-w-2xl mx-auto">
              {recipe.description}
            </p>
          </CardHeader>
          <CardContent className="p-8 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-center">
                <div className="bg-primary/5 p-4 rounded-lg flex flex-col items-center justify-center">
                    <Clock className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-gray-700">Tempo</p>
                    <p className="text-gray-600">{recipe.prepTime}</p>
                </div>
                 <div className="bg-primary/5 p-4 rounded-lg flex flex-col items-center justify-center">
                    <Flame className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-gray-700">Calorias</p>
                    <p className="text-gray-600">{recipe.calories}</p>
                </div>
                 <div className="bg-primary/5 p-4 rounded-lg flex flex-col items-center justify-center">
                    <Award className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-gray-700">Dificuldade</p>
                    <p className="text-gray-600">{recipe.difficulty}</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg flex flex-col items-center justify-center">
                    <BookText className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-gray-700">Rendimento</p>
                    <p className="text-gray-600">{recipe.servings}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-headline font-bold text-gray-800 mb-4 flex items-center gap-3"><Utensils className="h-6 w-6 text-primary" /> Ingredientes</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 bg-gray-50 p-6 rounded-lg border">
                        {recipe.ingredients.map((item, index) => (
                            <li key={index} className="leading-relaxed">{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="md:col-span-2">
                    <h2 className="text-2xl font-headline font-bold text-gray-800 mb-4 flex items-center gap-3"><ChefHat className="h-6 w-6 text-primary" /> Modo de Preparo</h2>
                     <ol className="list-decimal list-inside space-y-4 text-gray-700 bg-gray-50 p-6 rounded-lg border">
                        {recipe.instructions.map((item, index) => (
                            <li key={index} className="leading-relaxed pl-2">{item}</li>
                        ))}
                    </ol>
                </div>
            </div>
            
            {recipe.notes && (
                 <div className="mt-8">
                    <h3 className="text-xl font-headline font-bold text-gray-800 mb-3 flex items-center gap-3"><Info className="h-5 w-5 text-primary" /> Dicas do Chef</h3>
                    <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-r-lg">
                        <p className="text-sm leading-relaxed">{recipe.notes}</p>
                    </div>
                </div>
            )}

            {prepTimeInMinutes > 0 && (
              <div className="mt-12 text-center">
                  <h2 className="text-2xl font-headline font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                      <TimerIcon className="h-6 w-6 text-primary" />
                      Cronômetro da Receita
                  </h2>
                  <Timer durationInMinutes={prepTimeInMinutes} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
