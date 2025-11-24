'use client';

import { getRecipeBySlug, getRecipes } from '@/lib/recipes';
import { ArrowLeft, ChefHat, Clock, Flame, Utensils, Info, BookText, Award, TimerIcon, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Timer } from '@/components/Timer';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Função para extrair tempo de cozimento/geladeira das instruções
const extractActionTime = (instructions: string[]): number => {
    const timePatterns = [
      /asse por (\d+)\s*a\s*(\d+)?\s*minutos/i,
      /assar por (\d+)\s*a\s*(\d+)?\s*minutos/i,
      /asse por (\d+)-(\d+)?\s*minutos/i,
      /assar por (\d+)-(\d+)?\s*minutos/i,
      /gele por (\d+)\s*a\s*(\d+)?\s*horas/i,
      /refrigere por (\d+)\s*a\s*(\d+)?\s*horas/i,
      /cozinhe por (\d+)\s*a\s*(\d+)?\s*minutos/i,
      /deixe esfriar por (\d+)\s*a\s*(\d+)?\s*minutos/i,
      /geladeira por pelo menos (\d+)\s*minutos/i,
      /gelar por pelo menos (\d+)\s*horas/i,
      /asse por (\d+)\s*minutos/i,
      /assar por (\d+)\s*minutos/i,
      /gele por (\d+)\s*horas/i,
      /gele por (\d+)\s*minutos/i,
      /refrigere por (\d+)\s*horas/i,
      /refrigere por (\d+)\s*minutos/i,
      /cozinhe por (\d+)\s*minutos/i,
      /deixe esfriar por (\d+)\s*minutos/i,
    ];
  
    for (const instruction of instructions) {
      for (const pattern of timePatterns) {
        const match = instruction.match(pattern);
        if (match && match[1]) {
          let time = parseInt(match[1], 10);
          if (instruction.includes('hora')) {
            time *= 60; // Convert hours to minutes
          }
          return time;
        }
      }
    }
  
    return 0; // Retorna 0 se não encontrar um tempo de ação específico
  };

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();
  const isFavorite = recipe ? favorites.includes(recipe.slug) : false;
  const [timerDuration, setTimerDuration] = useState(0);

  useEffect(() => {
    if (recipe) {
      const actionTime = extractActionTime(recipe.instructions);
      setTimerDuration(actionTime);
    }
  }, [recipe]);

  const handleFavoriteClick = () => {
    if (!recipe) return;
    if (isFavorite) {
      removeFavorite(recipe.slug);
      toast({
        title: "Receita Removida!",
        description: `"${recipe.title}" foi removida dos seus favoritos.`,
      });
    } else {
      addFavorite(recipe.slug);
      toast({
        title: "Receita Adicionada!",
        description: `"${recipe.title}" foi adicionada aos seus favoritos.`,
      });
    }
  };
  
  if (!recipe) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <ChefHat className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold mb-2">Receita não encontrada</h1>
        <p className="text-muted-foreground mb-6">A receita que você está procurando não existe ou foi movida.</p>
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
    <div className="min-h-screen font-body">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
        <div className="mb-8 flex justify-between items-center">
            <Link href="/" legacyBehavior>
                <a className="inline-flex items-center transition-colors font-semibold" style={{ color: "hsl(var(--accent-cocoa))" }}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                </a>
            </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-96 w-full">
            <Image 
                src={`https://picsum.photos/seed/${recipe.id}/800/600`}
                alt={recipe.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
            />
             <div className="absolute top-4 right-4">
                <Button onClick={handleFavoriteClick} variant="ghost" size="icon" className="text-white bg-black/30 hover:bg-black/50 rounded-full h-10 w-10">
                    <Heart className={cn("h-5 w-5", isFavorite ? "fill-white" : "fill-transparent")} />
                    <span className="sr-only">{isFavorite ? 'Desfavoritar' : 'Favoritar'}</span>
                </Button>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <h1 className="text-4xl md:text-5xl font-headline font-bold" style={{ color: "hsl(var(--accent-cocoa))" }}>
              {recipe.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base max-w-2xl">
              {recipe.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 text-center">
                <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <Clock className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm">Tempo</p>
                    <p className="text-muted-foreground">{recipe.prepTime}</p>
                </div>
                 <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <Flame className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm">Calorias</p>
                    <p className="text-muted-foreground">{recipe.calories}</p>
                </div>
                 <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <Award className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm">Dificuldade</p>
                    <p className="text-muted-foreground">{recipe.difficulty}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <BookText className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm">Rendimento</p>
                    <p className="text-muted-foreground">{recipe.servings}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-2xl font-headline font-bold mb-4 flex items-center gap-3" style={{ color: "hsl(var(--accent-cocoa))" }}><Utensils className="h-6 w-6 text-primary" /> Ingredientes</h2>
                            <ul className="list-disc list-inside space-y-3 text-muted-foreground bg-gray-50/70 p-6 rounded-lg border">
                                {recipe.ingredients.map((item, index) => (
                                    <li key={index} className="leading-relaxed">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-headline font-bold mb-4 flex items-center gap-3" style={{ color: "hsl(var(--accent-cocoa))" }}><ChefHat className="h-6 w-6 text-primary" /> Modo de Preparo</h2>
                             <ol className="list-decimal list-inside space-y-4 text-muted-foreground bg-gray-50/70 p-6 rounded-lg border">
                                {recipe.instructions.map((item, index) => (
                                    <li key={index} className="leading-relaxed pl-2">{item}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {timerDuration > 0 && (
                      <div className="sticky top-28">
                          <h2 className="text-2xl font-headline font-bold mb-4 flex items-center justify-center gap-3" style={{ color: "hsl(var(--accent-cocoa))" }}>
                              <TimerIcon className="h-6 w-6 text-primary" />
                              Cronômetro
                          </h2>
                          <Timer durationInMinutes={timerDuration} />
                      </div>
                    )}
                </div>
            </div>
            
            {recipe.notes && (
                 <div className="mt-12">
                    <h3 className="text-xl font-headline font-bold mb-3 flex items-center gap-3" style={{ color: "hsl(var(--accent-cocoa))" }}><Info className="h-5 w-5 text-primary" /> Dicas do Chef</h3>
                    <div className="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg">
                        <p className="text-sm leading-relaxed text-foreground/80">{recipe.notes}</p>
                    </div>
                </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
