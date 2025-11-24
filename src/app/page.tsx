'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { type Recipe, getRecipes } from '@/lib/recipes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Heart, ChefHat, CakeSlice, IceCream, Vegan, Lollipop, Soup, Wheat, Clock, Flame, Info, ArrowUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from '@/hooks/use-mobile';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


const categoryIcons: { [key: string]: React.ElementType } = {
  'brownie': CakeSlice,
  'cookie': CakeSlice,
  'bolo': CakeSlice,
  'torta': CakeSlice,
  'cheesecake': CakeSlice,
  'mousse': IceCream,
  'pudim': IceCream,
  'manjar': IceCream,
  'creme': IceCream,
  'vegano': Vegan,
  'doce': Lollipop,
  'brigadeiro': Lollipop,
  'panqueca': Soup,
  'sem glúten': Wheat,
  'default': ChefHat,
};

const getCategoryIcon = (tags: string[]) => {
  const lowerCaseTags = tags.map(tag => tag.toLowerCase());
  // Exact match first
  for (const tag of lowerCaseTags) {
    if (categoryIcons[tag]) {
      return categoryIcons[tag];
    }
  }
  // Partial match if no exact match is found
  for (const tag of lowerCaseTags) {
     for (const key in categoryIcons) {
        if (key !== 'default' && tag.includes(key)) {
            return categoryIcons[key];
        }
     }
  }
  return categoryIcons['default'];
};

const CATEGORIES_PER_PAGE_MOBILE = 12;

export default function Home() {
  const recipes = useMemo(() => getRecipes(), []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Todos' | 'Fácil' | 'Média' | 'Difícil'>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const isMobile = useIsMobile();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

  useEffect(() => {
    try {
      const hasSeenIntro = sessionStorage.getItem('fitte_intro_seen');
      if (!hasSeenIntro) {
        setShowWelcome(true);
      }
    } catch (error) {
      console.warn("Could not access sessionStorage. Welcome screen may appear on every visit.");
      setShowWelcome(true);
    }
  }, []);
  
  const handleWelcomeContinue = () => {
    setShowWelcome(false);
    setShowIntro(true);
  };
  
  const handleIntroFinish = () => {
    setShowIntro(false);
     try {
      sessionStorage.setItem('fitte_intro_seen', 'true');
    } catch (error) {
       console.warn("Could not write to sessionStorage.");
    }
  }

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)
    return () => window.removeEventListener('scroll', checkScrollTop)
  }, [showScroll]);

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const difficulties: Array<'Todos' | 'Fácil' | 'Média' | 'Difícil'> = ['Todos', 'Fácil', 'Média', 'Difícil'];

  const categories = useMemo(() => {
    const allTags = recipes.flatMap(r => r.tags);
    const uniqueTags = ['Todos', ...Array.from(new Set(allTags))];
    return uniqueTags;
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTermLower) ||
        recipe.description.toLowerCase().includes(searchTermLower) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTermLower));

      const matchesDifficulty =
        selectedDifficulty === 'Todos' || recipe.difficulty === selectedDifficulty;
      const matchesCategory = 
        selectedCategory === 'Todos' || recipe.tags.map(t => t.toLowerCase()).includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [recipes, searchTerm, selectedDifficulty, selectedCategory]);

  const mobileCategoryChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < categories.length; i += CATEGORIES_PER_PAGE_MOBILE) {
      chunks.push(categories.slice(i, i + CATEGORIES_PER_PAGE_MOBILE));
    }
    return chunks;
  }, [categories]);

  if (showWelcome || showIntro) {
    return (
      <>
        <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
          <DialogContent className="sm:max-w-md bg-card border-border rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold flex items-center justify-center gap-3 mx-auto text-foreground">
                <CakeSlice className="h-9 w-9 text-primary"/> Fitte
              </DialogTitle>
              <DialogDescription className="pt-3 text-lg text-muted-foreground text-center">
                Sua jornada para uma vida mais doce e saudável começa agora.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-center">
              <Button size="lg" onClick={handleWelcomeContinue}>
                Continuar <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Dialog open={showIntro} onOpenChange={setShowIntro}>
          <DialogContent className="max-w-sm sm:max-w-md bg-card border-border rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2 text-foreground">
                Como funciona o App
              </DialogTitle>
               <DialogDescription className="text-center pt-2 text-muted-foreground">
                 É muito fácil encontrar e fazer sua receita fit!
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-sm text-muted-foreground space-y-4 text-left">
              <p className="flex items-start gap-3"><Search className="h-5 w-5 text-primary mt-0.5 shrink-0"/> <div><strong className="text-foreground">Explore:</strong> Use a busca para encontrar sua receita favorita.</div></p>
              <p className="flex items-start gap-3"><Info className="h-5 w-5 text-primary mt-0.5 shrink-0"/> <div><strong className="text-foreground">Filtre:</strong> Navegue por categorias e dificuldades.</div></p>
              <p className="flex items-start gap-3"><Heart className="h-5 w-5 text-primary mt-0.5 shrink-0"/> <div><strong className="text-foreground">Favorite:</strong> Salve suas receitas preferidas para acessá-las rapidamente.</div></p>
              <p className="flex items-start gap-3"><Clock className="h-5 w-5 text-primary mt-0.5 shrink-0"/> <div><strong className="text-foreground">Cozinhe com Precisão:</strong> Use o cronômetro para controlar o tempo de preparo.</div></p>
            </div>
            <Button onClick={handleIntroFinish}>Vamos Cozinhar!</Button>
          </DialogContent>
        </Dialog>
        <div className="min-h-screen bg-background" />
      </>
    )
  }

  return (
    <div className="min-h-screen font-body relative overflow-x-hidden bg-background">
        <div className="background-animation">
            <div className="circle xxl shade1"></div>
            <div className="circle xl shade2"></div>
            <div className="circle l shade3"></div>
            <div className="circle m shade4"></div>
            <div className="circle s shade5"></div>
            <div className="circle xs shade1" style={{animationDelay: '-1s', animationDuration: '20s'}}></div>
            <div className="circle xxl shade2" style={{animationDelay: '-5s', animationDuration: '30s', right: '5%', left: 'auto'}}></div>
            <div className="circle xl shade3" style={{animationDelay: '-10s', right: '15%', left: 'auto'}}></div>
        </div>

      {showScroll && (
        <Button 
          onClick={scrollTop} 
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50"
          size="icon"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}

      <header className="bg-background/80 backdrop-blur-sm shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                    <CakeSlice className="h-9 w-9 text-primary"/>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Fitte
                    </h1>
                </div>
                 <div className="flex items-center gap-4">
                     <Link href="/favorites" passHref>
                        <Button variant="ghost" className="text-primary hover:text-primary/90">
                            <Heart className="mr-2 h-4 w-4" />
                            Minhas Receitas
                        </Button>
                     </Link>
                </div>
            </div>
        </div>
      </header>

       <div className="relative z-10 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 text-center">
            <h2 className="text-5xl md:text-7xl font-headline font-extrabold text-foreground tracking-tight">
                Doces Fit, Sabor sem Culpa.
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-3xl mx-auto">
                Encontre receitas de doces saudáveis para uma vida mais equilibrada.
            </p>
             <div className="mt-8 flex justify-center">
                <div className="relative w-full max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Encontre sua receita favorita..."
                        className="pl-12 w-full h-12 rounded-full bg-card border-transparent focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <main>
          <div className="mb-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Navegue por Dificuldade</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {difficulties.map(difficulty => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? 'default' : 'secondary'}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className="capitalize px-5 py-2 h-auto text-sm font-medium rounded-md transition-transform duration-200 hover:scale-105"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Navegue por Categoria</h3>
                {isMobile ? (
                  <div className="flex flex-col items-center">
                    <Carousel className="w-full max-w-xs mx-auto" setApi={setCarouselApi}>
                      <CarouselContent>
                        {mobileCategoryChunks.map((chunk, index) => (
                          <CarouselItem key={index}>
                            <div className="grid grid-cols-4 gap-3 p-1">
                               {chunk.map(category => (
                                  <Button
                                      key={category}
                                      variant={selectedCategory === category ? 'default' : 'secondary'}
                                      onClick={() => setSelectedCategory(category)}
                                      className="capitalize px-2 py-2 h-auto text-xs font-medium rounded-md whitespace-nowrap overflow-hidden text-ellipsis"
                                  >
                                      {category}
                                  </Button>
                              ))}
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                     <div className="flex justify-center items-center gap-4 mt-4">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                  </div>
                ) : (
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex space-x-3 p-2">
                      {categories.map(category => (
                          <Button
                              key={category}
                              variant={selectedCategory === category ? 'default' : 'secondary'}
                              onClick={() => setSelectedCategory(category)}
                              className="capitalize px-5 py-2 h-auto text-sm font-medium rounded-md transition-transform duration-200 hover:scale-105"
                          >
                              {category}
                          </Button>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                )}
            </div>

          </div>
          
          <div className="text-sm text-muted-foreground mb-6 text-center">
            {filteredRecipes.length > 0
              ? `Mostrando ${filteredRecipes.length} receitas.`
              : 'Nenhuma receita encontrada.'
            }
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRecipes.map(recipe => {
              const Icon = getCategoryIcon(recipe.tags);
              return (
                <Link href={`/recipe/${recipe.slug}`} key={recipe.id} legacyBehavior>
                  <a className="block group">
                    <Card className="h-full flex flex-col rounded-xl shadow-md transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                      <CardContent className="flex flex-col items-center justify-center text-center p-6 flex-grow">
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                           <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-lg font-headline font-semibold leading-tight text-foreground">{recipe.title}</CardTitle>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
       <footer className="relative z-10 border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Todos os direitos reservados por @davidifly.</p>
        </div>
      </footer>
    </div>
  );
}
