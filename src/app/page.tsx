
'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { type Recipe, getRecipes } from '@/lib/recipes';
import { Button } from '@/components/ui/button';
import { ArrowUp, SignalHigh, SignalLow, SignalMedium, ListFilter } from 'lucide-react';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import { AppLayout } from '@/components/app-layout';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/loading-spinner';

const BATCH_SIZE = 20;

type Difficulty = 'Todos' | 'Fácil' | 'Média' | 'Difícil';

const difficultyOptions: { name: Difficulty, icon: React.ElementType }[] = [
  { name: 'Todos', icon: ListFilter },
  { name: 'Fácil', icon: SignalLow },
  { name: 'Média', icon: SignalMedium },
  { name: 'Difícil', icon: SignalHigh },
];

export default function Home() {
  const allRecipes = useMemo(() => getRecipes(), []);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Todos');
  const [showScroll, setShowScroll] = useState(false);
  const [visibleRecipes, setVisibleRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const loader = useRef<HTMLDivElement | null>(null);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => {
      const matchesDifficulty =
        selectedDifficulty === 'Todos' || recipe.difficulty === selectedDifficulty;
      
      return matchesDifficulty;
    });
  }, [allRecipes, selectedDifficulty]);

  useEffect(() => {
    setIsLoading(true);
    const initialRecipes = filteredRecipes.slice(0, BATCH_SIZE);
    setVisibleRecipes(initialRecipes);
    setPage(1);
    setHasMore(filteredRecipes.length > BATCH_SIZE);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [filteredRecipes]);

  const loadMoreRecipes = useCallback(() => {
    if (!hasMore) return;
    const nextPage = page + 1;
    const newRecipes = filteredRecipes.slice(0, nextPage * BATCH_SIZE);
    setVisibleRecipes(newRecipes);
    setPage(nextPage);
    if (newRecipes.length >= filteredRecipes.length) {
      setHasMore(false);
    }
  }, [page, hasMore, filteredRecipes]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreRecipes();
        }
      },
      { rootMargin: '200px' }
    );
    if (loader.current && !isLoading) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, hasMore, loadMoreRecipes, isLoading]);

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

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 relative pb-24 md:pb-8">
        {showScroll && (
          <Button 
            onClick={scrollTop} 
            className="fixed bottom-24 right-6 h-12 w-12 rounded-full shadow-lg z-50 bg-primary/90 text-primary-foreground hover:bg-primary"
            size="icon"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        )}

        <div className="mb-10 text-left">
            <p className="text-muted-foreground text-lg">Olá,</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
              O que vamos cozinhar hoje?
            </h2>
        </div>
        
        <main>
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4 text-foreground">Filtrar por Dificuldade</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-lg">
              {difficultyOptions.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  onClick={() => setSelectedDifficulty(name)}
                  className={cn(
                    "group flex items-center justify-start p-3 rounded-xl border-2 transition-all duration-200",
                    selectedDifficulty === name
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" strokeWidth={selectedDifficulty === name ? 2.5 : 2} />
                  <span className={cn(
                    "text-sm font-semibold",
                    selectedDifficulty === name ? "text-primary" : "text-foreground"
                    )}>{name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {isLoading ? (
            <LoadingSpinner text="Preparando as melhores receitas para você..." />
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-foreground">Receitas para você</h3>
                <div className="text-sm text-muted-foreground">
                  {`${allRecipes.length} receitas encontradas`}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {visibleRecipes.map(recipe => {
                    return (
                      <RecipeCard 
                        key={recipe.id} 
                        recipe={recipe} 
                        isFavorite={favorites.includes(recipe.slug)}
                        onToggleFavorite={() => {
                          if (favorites.includes(recipe.slug)) {
                            removeFavorite(recipe.slug);
                          } else {
                            addFavorite(recipe.slug);
                          }
                        }}
                      />
                    );
                  })}
                </div>
                
                <div ref={loader} className="h-10" />

                {hasMore && (
                  <div className="text-center py-8">
                    <LoadingSpinner text="Carregando mais..."/>
                  </div>
                )}
                {!hasMore && visibleRecipes.length > 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Você chegou ao fim!</p>
                  </div>
                )}
                {visibleRecipes.length === 0 && (
                  <div className="text-center py-16 text-muted-foreground">
                    <p>Nenhuma receita encontrada com esses filtros.</p>
                  </div>
                )}
            </>
          )}
        </main>
      </div>
    </AppLayout>
  );
}
