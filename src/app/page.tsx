'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { type Recipe, getRecipes } from '@/lib/recipes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Heart, ChefHat, CakeSlice, IceCream, Vegan, Lollipop, Soup, Wheat, Clock, Flame, Info, ArrowUp, ArrowRight, Loader, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";


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

const INITIAL_LOAD_COUNT = 12;
const LOAD_MORE_COUNT = 8;
const CATEGORIES_PER_PAGE_MOBILE = 8;

export default function Home() {
  const recipes = useMemo(() => getRecipes(), []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Todos' | 'Fácil' | 'Média' | 'Difícil'>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [categoryPage, setCategoryPage] = useState(0);

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

  useEffect(() => {
    setVisibleCount(INITIAL_LOAD_COUNT);
  }, [searchTerm, selectedDifficulty, selectedCategory]);

  const visibleRecipes = useMemo(() => {
    return filteredRecipes.slice(0, visibleCount);
  }, [filteredRecipes, visibleCount]);
  
  const totalCategoryPages = Math.ceil(categories.length / CATEGORIES_PER_PAGE_MOBILE);

  const visibleCategoriesMobile = useMemo(() => {
    const start = categoryPage * CATEGORIES_PER_PAGE_MOBILE;
    const end = start + CATEGORIES_PER_PAGE_MOBILE;
    return categories.slice(start, end);
  }, [categories, categoryPage]);


  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prevCount => prevCount + LOAD_MORE_COUNT);
      setIsLoadingMore(false);
    }, 500); // Small delay to show loader
  }, [isLoadingMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && visibleCount < filteredRecipes.length) {
          handleLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleLoadMore, visibleCount, filteredRecipes.length]);


  if (showWelcome || showIntro) {
    return (
      <>
        <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
          <DialogContent className="sm:max-w-[425px] text-center bg-card border-border rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold flex items-center justify-center gap-3 mx-auto text-foreground">
                <img src="https://i.imgur.com/Phh9w5C.png" alt="Fitte Logo" className="h-9 w-auto"/> Fitte
              </DialogTitle>
              <DialogDescription className="pt-3 text-lg text-muted-foreground">
                Sua jornada para uma vida mais doce e saudável começa agora.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
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
                    <img src="https://i.imgur.com/Phh9w5C.png" alt="Fitte Logo" className="h-9 w-auto"/>
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
                    className="capitalize px-5 py-2 h-auto text-sm font-medium rounded-full transition-transform duration-200 hover:scale-105"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Navegue por Categoria</h3>
                
                {/* Mobile Carousel */}
                <div className="md:hidden">
                    <div className="grid grid-cols-2 gap-3">
                        {visibleCategoriesMobile.map(category => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'default' : 'secondary'}
                                onClick={() => setSelectedCategory(category)}
                                className="capitalize text-base font-medium rounded-full transition-transform duration-200 hover:scale-105 w-full"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-4 gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCategoryPage(p => Math.max(0, p - 1))}
                            disabled={categoryPage === 0}
                            className="rounded-full"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            {categoryPage + 1} / {totalCategoryPages}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCategoryPage(p => Math.min(totalCategoryPages - 1, p + 1))}
                            disabled={categoryPage === totalCategoryPages - 1}
                            className="rounded-full"
                        >
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {categories.map(category => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'secondary'}
                            onClick={() => setSelectedCategory(category)}
                            className="capitalize text-base font-medium rounded-full transition-transform duration-200 hover:scale-105 w-full"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

          </div>
          
          <div className="text-sm text-muted-foreground mb-6 text-center">
            Mostrando {visibleRecipes.length} de {filteredRecipes.length} receitas.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleRecipes.map(recipe => {
              const Icon = getCategoryIcon(recipe.tags);
              return (
                <Link href={`/recipe/${recipe.slug}`} key={recipe.id} legacyBehavior>
                  <a className="block group">
                    <Card className="h-full flex flex-col rounded-xl shadow-md transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                      <CardHeader className="flex-row items-center gap-4 pb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                           <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-base font-headline leading-tight flex-1 text-foreground">{recipe.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-between pt-0">
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{recipe.description}</p>
                        <div className="text-xs text-muted-foreground space-y-2 pt-4 border-t border-border/50 mt-auto">
                           <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4"/> <span>{recipe.prepTime}</span>
                           </div>
                           <div className="flex items-center gap-2">
                            <Flame className="h-4 w-4"/> <span>{recipe.calories}</span>
                           </div>
                           <div className="flex items-center gap-2">
                            <Info className="h-4 w-4"/> <span>Dificuldade: {recipe.difficulty}</span>
                           </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              );
            })}
          </div>

           {visibleCount < filteredRecipes.length && (
            <div ref={loaderRef} className="mt-12 text-center">
              <div className="flex justify-center items-center gap-2 text-muted-foreground">
                <Loader className="h-5 w-5 animate-spin" />
                <span>Carregando mais receitas...</span>
              </div>
            </div>
          )}

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
