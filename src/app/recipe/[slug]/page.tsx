
'use client';

import { getRecipeBySlug } from '@/lib/recipes';
import { ArrowLeft, ChefHat, Clock, Flame, Utensils, Info, BookText, Award, TimerIcon, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Timer } from '@/components/Timer';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/app-layout';

type TimerInfo = {
  duration: number;
  context: string;
};

// Função para extrair tempo de cozimento/geladeira das instruções
const extractActionTime = (instructions: string[]): TimerInfo | null => {
    const timePatterns = [
      {
        pattern: /(?:forno|assar|asse)(?:.*?) por (?:cerca de |pelo menos )?(\d+)(?:(?: a |-| até )(\d+))? (minutos|horas)/i,
        context: "Tempo de forno"
      },
      {
        pattern: /(?:geladeira|refrigere|gelar)(?:.*?) por (?:cerca de |pelo menos )?(\d+)(?:(?: a |-| até )(\d+))? (minutos|horas)/i,
        context: "Tempo de geladeira"
      },
      {
        pattern: /(?:fogo|cozinhe|mexendo)(?:.*?) por (?:cerca de |pelo menos )?(\d+)(?:(?: a |-| até )(\d+))? (minutos|horas)/i,
        context: "Continue mexendo"
      },
       {
        pattern: /por (?:cerca de |aproximadamente |pelo menos )?(\d+)\s*(?:a|-)\s*(\d+)\s*(minutos|horas)/i,
        context: "Tempo de ação"
      },
      {
        pattern: /por (?:cerca de |aproximadamente |pelo menos )?(\d+)\s*(minutos|horas)/i,
        context: "Tempo de ação"
      },
      {
        pattern: /(?:deixe|descansar) por (\d+)\s*(minutos|horas)/i,
        context: "Tempo de descanso"
      },
    ];
  
    for (const instruction of instructions) {
      for (const { pattern, context } of timePatterns) {
        const match = instruction.match(pattern);
        if (match) {
          const timeValue1 = match[1] ? parseInt(match[1], 10) : 0;
          const timeValue2 = match[2] ? parseInt(match[2], 10) : 0;
          
          let timeValue = Math.max(timeValue1, timeValue2);
          if (timeValue === 0) timeValue = timeValue1;

          const unit = match[3] || 'minutos';

          let durationInMinutes = timeValue;
          if (unit.toLowerCase().startsWith('hora')) {
            durationInMinutes = timeValue * 60;
          }
          
          if (!isNaN(durationInMinutes) && durationInMinutes > 0) {
            return { duration: durationInMinutes, context };
          }
        }
      }
    }
  
    return null;
  };

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();
  const isFavorite = recipe ? favorites.includes(recipe.slug) : false;
  const [timerInfo, setTimerInfo] = useState<TimerInfo | null>(null);

  useEffect(() => {
    if (recipe) {
      const info = extractActionTime(recipe.instructions);
      setTimerInfo(info);
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
      <AppLayout>
        <div className="flex flex-col justify-center items-center h-full text-center px-4">
          <ChefHat className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-3xl font-bold mb-2">Receita não encontrada</h1>
          <p className="text-muted-foreground mb-6">A receita que você está procurando não existe ou foi movida.</p>
          <Button asChild variant="link">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para todas as receitas
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
    <div className="min-h-screen font-body bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-12 pb-24 lg:pb-12">
        
        <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-6 md:p-10">
            <div className="flex justify-between items-start mb-4">
              <Link href="/" passHref>
                  <Button variant="outline" className="inline-flex items-center transition-colors font-semibold">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar
                  </Button>
              </Link>
               <Button onClick={handleFavoriteClick} variant="ghost" size="icon" className="group rounded-full h-10 w-10">
                    <Heart className={cn(
                        "h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-200 group-active:scale-125", 
                        isFavorite ? "fill-primary text-primary" : "fill-transparent"
                    )} />
                    <span className="sr-only">{isFavorite ? 'Desfavoritar' : 'Favoritar'}</span>
                </Button>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
              {recipe.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl">
              {recipe.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 text-center">
                <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <Clock className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm">Tempo</p>
                    <p className="text-muted-foreground">{recipe.prepTime}</p>
                </div>
                 <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <Flame className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm">Calorias</p>
                    <p className="text-muted-foreground">{recipe.calories}</p>
                </div>
                 <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <Award className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm">Dificuldade</p>
                    <p className="text-muted-foreground">{recipe.difficulty}</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <BookText className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm">Rendimento</p>
                    <p className="text-muted-foreground">{recipe.servings}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-foreground"><Utensils className="h-6 w-6 text-primary" /> Ingredientes</h2>
                            <ul className="list-disc list-inside space-y-3 text-muted-foreground bg-muted/30 p-6 rounded-lg border">
                                {recipe.ingredients.map((item, index) => (
                                    <li key={index} className="leading-relaxed">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-foreground"><ChefHat className="h-6 w-6 text-primary" /> Modo de Preparo</h2>
                             <ol className="list-decimal list-inside space-y-4 text-muted-foreground bg-muted/30 p-6 rounded-lg border">
                                {recipe.instructions.map((item, index) => (
                                    <li key={index} className="leading-relaxed pl-2">{item}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {timerInfo && (
                      <div className="sticky top-28 pt-8">
                          <Timer durationInMinutes={timerInfo.duration} context={timerInfo.context} />
                      </div>
                    )}
                </div>
            </div>
            
            {recipe.notes && (
                 <div className="mt-12">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-3 text-foreground"><Info className="h-5 w-5 text-primary" /> Dicas do Chef</h3>
                    <div className="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg">
                        <p className="text-sm leading-relaxed text-foreground/80">{recipe.notes}</p>
                    </div>
                </div>
            )}

          </div>
        </div>
      </div>
    </div>
    </AppLayout>
  );
}
