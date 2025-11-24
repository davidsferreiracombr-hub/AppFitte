'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { type Recipe, getRecipes } from '@/lib/recipes';
import { Button } from '@/components/ui/button';
import { ArrowUp, SignalHigh, SignalLow, SignalMedium, ListFilter } from 'lucide-react';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import { AppLayout } from '@/components/app-layout';
import { cn } from '@/lib/utils';

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

  const loader = useRef<HTMLDivElement | null>(null);

  const filteredRecipes = useMemo(() => {
    const filtered = allRecipes.filter(recipe => {
      const matchesDifficulty =
        selectedDifficulty === 'Todos' || recipe.difficulty === selectedDifficulty;
      
      return matchesDifficulty;
    });
    return filtered;
  }, [allRecipes, selectedDifficulty]);

  useEffect(() => {
    setVisibleRecipes(filteredRecipes.slice(0, BATCH_SIZE));
    setPage(1);
    setHasMore(filteredRecipes.length > BATCH_SIZE);
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
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, hasMore, loadMoreRecipes]);

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
            className="fixed bottom-20 right-6 h-12 w-12 rounded-full shadow-lg z-50 bg-primary text-primary-foreground hover:bg-primary/90"
            size="icon"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        )}

        <div className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Bem-vindo ao <span className="text-primary">Fitte</span>, seu novo <span className="text-primary">universo de receitas.</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-base md:text-lg">
                Que alegria ter você aqui! O Fitte é o seu novo cantinho para descobrir que é possível comer doces deliciosos e ainda assim manter uma vida saudável e equilibrada. Navegue pelas categorias, use a busca para encontrar algo específico ou simplesmente explore nossas sugestões diárias. Cada receita foi pensada para ser fácil, nutritiva e, claro, muito saborosa. Bom apetite!
            </p>
        </div>
        
        <main>
          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto">
              {difficultyOptions.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  onClick={() => setSelectedDifficulty(name)}
                  className={cn(
                    "group flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200",
                    selectedDifficulty === name
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                  )}
                >
                  <Icon className="h-6 w-6 mb-1.5" strokeWidth={selectedDifficulty === name ? 2.5 : 2} />
                  <span className={cn(
                    "text-sm font-semibold",
                    selectedDifficulty === name ? "text-primary" : "text-foreground"
                    )}>{name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-sm mb-6 text-muted-foreground text-center">
            {`Mostrando ${visibleRecipes.length} de ${filteredRecipes.length} receitas.`}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
              <div className="text-center py-8 text-muted-foreground">
                <p>Carregando mais receitas...</p>
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

        </main>
      </div>
    </AppLayout>
  );
}
