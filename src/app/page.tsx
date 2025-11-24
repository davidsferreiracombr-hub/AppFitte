'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { type Recipe, getRecipes } from '@/lib/recipes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import { AppLayout } from '@/components/app-layout';

const BATCH_SIZE = 20;

export default function Home() {
  const allRecipes = useMemo(() => getRecipes(), []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Todos' | 'Fácil' | 'Média' | 'Difícil'>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [showScroll, setShowScroll] = useState(false);
  const [visibleRecipes, setVisibleRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loader = useRef<HTMLDivElement | null>(null);

  const difficulties: Array<'Todos' | 'Fácil' | 'Média' | 'Difícil'> = ['Todos', 'Fácil', 'Média', 'Difícil'];

  const categories = useMemo(() => {
    const allTags = allRecipes.flatMap(r => r.tags);
    return ['Todos', ...Array.from(new Set(allTags))];
  }, [allRecipes]);

  const filteredRecipes = useMemo(() => {
    const filtered = allRecipes.filter(recipe => {
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
    return filtered;
  }, [allRecipes, searchTerm, selectedDifficulty, selectedCategory]);

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
      <div className="flex-1 p-4 sm:p-6 lg:p-8 relative">
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
                Doces Fit, Sabor sem Culpa.
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
                Encontre receitas de doces saudáveis para uma vida mais equilibrada.
            </p>
        </div>
        
        <main>
          <div className="mb-8 space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {difficulties.map(difficulty => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? 'default' : 'ghost'}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className="capitalize px-5 py-2 h-auto text-sm font-medium rounded-md"
                >
                  {difficulty}
                </Button>
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
