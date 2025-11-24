'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { type Recipe, getRecipes } from '@/lib/recipes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Heart, ChefHat, Cookie, CakeSlice, IceCream, Vegan, Lollipop, Soup, Wheat, Clock, Flame, Info, ArrowUp, ArrowRight } from 'lucide-react';
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
  'brownie': Cookie,
  'cookie': Cookie,
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
  for (const key in categoryIcons) {
    if (lowerCaseTags.includes(key)) {
      return categoryIcons[key];
    }
  }
  for (const tag of lowerCaseTags) {
     for (const key in categoryIcons) {
        if (tag.includes(key)) {
            return categoryIcons[key];
        }
     }
  }
  return categoryIcons['default'];
};

export default function Home() {
  const recipes = useMemo(() => getRecipes(), []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Todos' | 'Fácil' | 'Média' | 'Difícil'>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedFitte');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisitedFitte', 'true');
    } else {
      setIsAppReady(true);
    }
  }, []);
  
  const handleWelcomeContinue = () => {
    setShowWelcome(false);
    setShowIntro(true);
  };
  
  const handleIntroFinish = () => {
    setShowIntro(false);
    setIsAppReady(true);
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

  if (!isAppReady) {
    return (
      <>
        <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
          <DialogContent className="sm:max-w-md text-center">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold flex items-center justify-center gap-3 mx-auto">
                <ChefHat className="h-8 w-8 text-primary" /> Bem-vindo(a) ao Fitte!
              </DialogTitle>
              <DialogDescription className="pt-3 text-lg">
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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
                Como funciona o App
              </DialogTitle>
               <DialogDescription className="text-center pt-2">
                 É muito fácil encontrar e fazer sua receita fit!
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-sm text-gray-600 space-y-4 text-left">
              <p className="flex items-start gap-3"><Search className="h-5 w-5 text-primary mt-0.5 shrink-0"/> <div><strong className="text-gray-800">Explore:</strong> Use a barra de busca para encontrar sua receita favorita.</div></p>
              <p className="flex items-start gap-3"><Info className="h-5 w-5 text-primary mt-0.5 shrink-0"/> <div><strong className="text-gray-800">Filtre:</strong> Navegue pelas categorias e dificuldades para encontrar a receita perfeita.</div></p>
              <p className="flex items-start gap-3"><Clock className="h-5 w-5 text-primary mt-0.5 shrink-0"/> <div><strong className="text-gray-800">Cozinhe com Precisão:</strong> Dentro de cada receita, você encontrará um cronômetro para te ajudar com o tempo de preparo.</div></p>
            </div>
            <Button onClick={handleIntroFinish}>Vamos Cozinhar!</Button>
          </DialogContent>
        </Dialog>
        <div className="bg-gray-50 min-h-screen" />
      </>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen font-body">
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

      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                    <ChefHat className="h-9 w-9 text-primary" />
                    <h1 className="text-3xl font-headline font-bold text-gray-800">
                        Fitte
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                     <Button variant="ghost" className="text-primary hover:text-primary/90 hidden sm:inline-flex">
                        <Heart className="mr-2 h-4 w-4" />
                        Minhas Receitas
                    </Button>
                    <Button>Comece a Cozinhar</Button>
                </div>
            </div>
        </div>
      </header>

       <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 text-center">
            <h2 className="text-5xl md:text-6xl font-headline font-extrabold text-gray-900 tracking-tight animate-title-glow">
                Receitas Saudáveis, Sabor Irresistível.
            </h2>
            <p className="text-gray-600 mt-8 text-lg max-w-3xl mx-auto">
                Explore mais de 700 receitas de doces fit para uma vida mais gostosa e equilibrada. Perfeito para quem treina, busca saúde ou simplesmente ama um bom doce sem culpa.
            </p>
             <div className="mt-10 flex justify-center">
                <div className="relative w-full max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Encontre sua receita favorita..."
                        className="pl-12 w-full h-12 rounded-full bg-gray-100 border-transparent focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        <main>
          <div className="mb-12 space-y-10">
            <div>
              <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">Navegue por Dificuldade</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {difficulties.map(difficulty => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`capitalize rounded-full px-5 py-2 h-auto text-sm font-medium transition-all duration-200 ${selectedDifficulty === difficulty ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">Navegue por Categoria</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={`capitalize rounded-full px-5 py-2 h-auto text-sm font-medium transition-all duration-200 ${selectedCategory === category ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mb-8 text-center">
            Mostrando {filteredRecipes.length} de {recipes.length} receitas.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 [perspective:1000px]">
            {filteredRecipes.map(recipe => {
              const Icon = getCategoryIcon(recipe.tags);
              return (
                <Link href={`/recipe/${recipe.slug}`} key={recipe.id} legacyBehavior>
                  <a className="block group">
                    <Card className="h-full flex flex-col bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden transform-gpu group-hover:[transform:rotateY(10deg)_translateZ(20px)] hover:!transform-none hover:shadow-2xl">
                      <CardHeader className="flex-row items-center gap-4 pb-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                           <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg font-headline leading-tight flex-1 text-gray-800">{recipe.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-between pt-0">
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{recipe.description}</p>
                        <div className="text-xs text-gray-500 space-y-2 pt-4 border-t mt-auto">
                           <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400"/> <span>{recipe.prepTime}</span>
                           </div>
                           <div className="flex items-center gap-2">
                            <Flame className="h-4 w-4 text-gray-400"/> <span>{recipe.calories}</span>
                           </div>
                           <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-gray-400"/> <span>Dificuldade: {recipe.difficulty}</span>
                           </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
