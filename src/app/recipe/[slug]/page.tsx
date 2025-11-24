'use client';

import { getRecipeBySlug } from '@/lib/recipes';
import { ArrowLeft, ChefHat, Clock, Flame, Utensils, Info, BookText, Award, TimerIcon, Heart, CakeSlice } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Timer } from '@/components/Timer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();
  const isFavorite = recipe ? favorites.includes(recipe.slug) : false;

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
        <h1 className="text-3xl font-bold text-foreground mb-2">Receita não encontrada</h1>
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
  
  const prepTimeInMinutes = recipe?.prepTime ? parseInt(recipe.prepTime.split(' ')[0]) : 0;

  return (
    <div className="min-h-screen font-body bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-12">
        <div className="mb-8 flex justify-between items-center">
            <Link href="/" legacyBehavior>
                <a className="inline-flex items-center text-primary hover:text-primary/90 transition-colors font-semibold">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                </a>
            </Link>
            <Button onClick={handleFavoriteClick} variant="ghost" size="icon" className="text-primary hover:text-primary/90">
                <Heart className={cn("h-6 w-6", isFavorite && "fill-current text-primary")} />
                <span className="sr-only">{isFavorite ? 'Desfavoritar' : 'Favoritar'}</span>
            </Button>
        </div>

        <Card className="overflow-hidden shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center p-8 md:p-12">
            <CakeSlice className="h-14 w-14 text-primary mx-auto mb-4"/>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
              {recipe.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-base max-w-2xl mx-auto">
              {recipe.description}
            </p>
          </CardHeader>
          <CardContent className="px-6 py-8 md:px-10 md:py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
                <div className="bg-background/50 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <Clock className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-foreground">Tempo</p>
                    <p className="text-muted-foreground">{recipe.prepTime}</p>
                </div>
                 <div className="bg-background/50 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <Flame className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-foreground">Calorias</p>
                    <p className="text-muted-foreground">{recipe.calories}</p>
                </div>
                 <div className="bg-background/50 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <Award className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-foreground">Dificuldade</p>
                    <p className="text-muted-foreground">{recipe.difficulty}</p>
                </div>
                <div className="bg-background/50 p-4 rounded-lg flex flex-col items-center justify-center border">
                    <BookText className="h-7 w-7 text-primary mb-2" />
                    <p className="font-semibold text-sm text-foreground">Rendimento</p>
                    <p className="text-muted-foreground">{recipe.servings}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-2xl font-headline font-bold text-foreground mb-4 flex items-center gap-3"><Utensils className="h-6 w-6 text-primary" /> Ingredientes</h2>
                            <ul className="list-disc list-inside space-y-3 text-muted-foreground bg-background/70 p-6 rounded-lg border">
                                {recipe.ingredients.map((item, index) => (
                                    <li key={index} className="leading-relaxed">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-headline font-bold text-foreground mb-4 flex items-center gap-3"><ChefHat className="h-6 w-6 text-primary" /> Modo de Preparo</h2>
                             <ol className="list-decimal list-inside space-y-4 text-muted-foreground bg-background/70 p-6 rounded-lg border">
                                {recipe.instructions.map((item, index) => (
                                    <li key={index} className="leading-relaxed pl-2">{item}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {prepTimeInMinutes > 0 && (
                      <div className="sticky top-28">
                          <h2 className="text-2xl font-headline font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                              <TimerIcon className="h-6 w-6 text-primary" />
                              Cronômetro
                          </h2>
                          <Timer durationInMinutes={prepTimeInMinutes} />
                      </div>
                    )}
                </div>
            </div>
            
            {recipe.notes && (
                 <div className="mt-12">
                    <h3 className="text-xl font-headline font-bold text-foreground mb-3 flex items-center gap-3"><Info className="h-5 w-5 text-primary" /> Dicas do Chef</h3>
                    <div className="bg-primary/10 border-l-4 border-primary text-primary-foreground p-5 rounded-r-lg">
                        <p className="text-sm leading-relaxed text-foreground/80">{recipe.notes}</p>
                    </div>
                </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
