
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { type Recipe } from '@/lib/recipes';
import { useFavorites } from '@/hooks/use-favorites';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, Clock, Flame, Info, BookText, Award, Heart, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Timer } from '@/components/Timer';
import { cn } from '@/lib/utils';


type TimerInfo = {
  duration: number;
  context: string;
};

// Função para extrair TODOS os tempos de cozimento/geladeira das instruções
const extractActionTimes = (instructions: string[]): TimerInfo[] => {
    const timers: TimerInfo[] = [];
    const timePatterns = [
      {
        pattern: /(?:forno|assar|asse)(?:.*?) por (?:cerca de |pelo menos |aproximadamente )?(\d+)(?:(?: a |-| até )(\d+))? (minutos|horas)/i,
        context: "Tempo de forno"
      },
      {
        pattern: /(?:geladeira|refrigere|gelar)(?:.*?) por (?:cerca de |pelo menos |aproximadamente )?(\d+)(?:(?: a |-| até )(\d+))? (minutos|horas)/i,
        context: "Tempo de geladeira"
      },
      {
        pattern: /(?:fogo|cozinhe|mexendo)(?:.*?) por (?:cerca de |pelo menos |aproximadamente )?(\d+)(?:(?: a |-| até )(\d+))? (minutos|horas)/i,
        context: "Tempo de fogo"
      },
       {
        pattern: /bata(?:.*?) por (?:cerca de |aproximadamente |pelo menos )?(\d+)\s*(?:a|-)?\s*(\d+)?\s*(minutos|horas)/i,
        context: "Tempo de batedeira"
      },
      {
        pattern: /(?:deixe|descansar|de molho) por (?:cerca de |pelo menos |aproximadamente )?(\d+)\s*(minutos|horas)/i,
        context: "Tempo de descanso"
      },
      {
        pattern: /por (?:cerca de |aproximadamente |pelo menos )?(\d+)\s*(?:a|-)\s*(\d+)\s*(minutos|horas)/i,
        context: "Tempo de ação"
      },
      {
        pattern: /por (?:cerca de |aproximadamente |pelo menos )?(\d+)\s*(minutos|horas)/i,
        context: "Tempo de ação"
      },
    ];
  
    instructions.forEach(instruction => {
      for (const { pattern, context } of timePatterns) {
        const match = instruction.match(pattern);
        if (match) {
          const timeValue1 = match[1] ? parseInt(match[1], 10) : 0;
          // Capture potential second value for ranges (e.g., 20-30 minutos)
          const timeValue2 = match[2] ? parseInt(match[2], 10) : 0;
          
          let timeValue = Math.max(timeValue1, timeValue2);
          if (timeValue === 0) timeValue = timeValue1;

          const unit = match[3] || 'minutos';

          let durationInMinutes = timeValue;
          if (unit.toLowerCase().startsWith('hora')) {
            durationInMinutes = timeValue * 60;
          }
          
          if (!isNaN(durationInMinutes) && durationInMinutes > 0) {
            timers.push({ duration: durationInMinutes, context });
            return; // Move to the next instruction once a time is found
          }
        }
      }
    });
  
    return timers;
  };

export function RecipeClientPage({ recipe }: { recipe: Recipe }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();
  const isFavorite = favorites.includes(recipe.slug);
  const [timerInfos, setTimerInfos] = useState<TimerInfo[]>([]);

  useEffect(() => {
    const infos = extractActionTimes(recipe.instructions);
    setTimerInfos(infos);
  }, [recipe]);

  const handleFavoriteClick = () => {
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

  return (
    <div className="min-h-screen font-body bg-background">
      {recipe.imageUrl && (
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={recipe.imageUrl}
            alt={`Imagem da receita ${recipe.title}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
           <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <div className="max-w-4xl mx-auto flex justify-between items-end">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                            {recipe.title}
                        </h1>
                        <p className="mt-2 text-lg opacity-90" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
                            {recipe.description}
                        </p>
                    </div>
                    <Button onClick={handleFavoriteClick} variant="ghost" size="icon" className="group rounded-full h-12 w-12 flex-shrink-0 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Heart className={cn(
                            "h-6 w-6 text-white group-hover:text-red-400 transition-all duration-300 group-active:scale-125", 
                            isFavorite ? "fill-red-500 text-red-500" : "fill-transparent"
                        )} />
                        <span className="sr-only">{isFavorite ? 'Desfavoritar' : 'Favoritar'}</span>
                    </Button>
                </div>
           </div>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8 md:py-12">

        <div className="bg-card rounded-2xl shadow-lg border p-6 md:p-8 -mt-16 relative z-10">
          
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-center border-b pb-8">
                <div className="flex flex-col items-center justify-center">
                    <Clock className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-foreground">Tempo</p>
                    <p className="text-muted-foreground">{recipe.prepTime}</p>
                </div>
                 <div className="flex flex-col items-center justify-center">
                    <Flame className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-foreground">Calorias</p>
                    <p className="text-muted-foreground">{recipe.calories}</p>
                </div>
                 <div className="flex flex-col items-center justify-center">
                    <Award className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-foreground">Dificuldade</p>
                    <p className="text-muted-foreground">{recipe.difficulty}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <BookText className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-foreground">Rendimento</p>
                    <p className="text-muted-foreground">{recipe.servings}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-10">
                <div className="lg:col-span-3 space-y-10">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-foreground"><Utensils className="h-6 w-6 text-primary" /> Ingredientes</h2>
                        <ul className="list-none space-y-3 text-foreground">
                            {recipe.ingredients.map((item, index) => (
                                <li key={index} className="leading-relaxed flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-foreground"><ChefHat className="h-6 w-6 text-primary" /> Modo de Preparo</h2>
                         <ol className="list-none space-y-6 text-foreground">
                            {recipe.instructions.map((item, index) => (
                                <li key={index} className="leading-relaxed flex items-start gap-4">
                                  <div className="flex-shrink-0 h-8 w-8 bg-primary/10 text-primary font-bold text-sm rounded-full flex items-center justify-center border border-primary/20">
                                    {index + 1}
                                  </div>
                                  <span className="pt-1">{item}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <aside className="lg:col-span-2">
                    <div className="sticky top-28 space-y-8">
                       {recipe.notes && (
                            <div>
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-3 text-foreground"><Info className="h-5 w-5 text-primary" /> Dicas do Chef</h3>
                                <div className="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg">
                                    <p className="text-sm leading-relaxed text-foreground/80">{recipe.notes}</p>
                                </div>
                            </div>
                        )}

                        {timerInfos.map((info, index) => (
                            <Timer key={index} durationInMinutes={info.duration} context={info.context} />
                        ))}
                    </div>
                </aside>
            </div>
        </div>
      </div>
    </div>
  );
}
