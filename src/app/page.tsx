'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { type Recipe, getRecipes } from '@/lib/recipes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';

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
    <div className="min-h-screen font-body relative overflow-x-hidden">
      {showScroll && (
        <Button 
          onClick={scrollTop} 
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50 bg-accent-cocoa text-white hover:bg-accent-cocoa/90"
          size="icon"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}

      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold" style={{color: "hsl(var(--accent-cocoa))"}}>
                        Fitte
                    </h1>
                </div>
                 <div className="flex items-center gap-4">
                     <Link href="/favorites" passHref>
                        <Button variant="ghost" className="text-accent-cocoa hover:text-accent-cocoa/90">
                            Favoritos
                        </Button>
                     </Link>
                </div>
            </div>
        </div>
      </header>

       <div className="relative z-10 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 text-center">
            <h2 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tight" style={{color: "hsl(var(--accent-cocoa))"}}>
                Doces Fit, Sabor sem Culpa.
            </h2>
            <p style={{color: "hsl(var(--text-primary))"}} className="opacity-70 mt-4 text-lg max-w-3xl mx-auto">
                Encontre receitas de doces saudáveis para uma vida mais equilibrada.
            </p>
             <div className="mt-8 flex justify-center">
                <div className="relative w-full max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Encontre sua receita favorita..."
                        className="pl-12 w-full h-12 rounded-full bg-white border-gray-200 focus:ring-2 focus:ring-accent-caramel focus:border-transparent text-base shadow-sm"
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
              <h3 className="text-lg font-semibold mb-3 text-center" style={{color: "hsl(var(--accent-cocoa))"}}>Navegue por Dificuldade</h3>
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
              <h3 className="text-lg font-semibold mb-3 text-center" style={{color: "hsl(var(--accent-cocoa))"}}>Navegue por Categoria</h3>
              <div className="flex flex-wrap justify-center gap-3">
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
            </div>

          </div>
          
          <div className="text-sm text-center mb-6" style={{color: "hsl(var(--text-primary))", opacity: 0.8}}>
            {`Mostrando ${visibleRecipes.length} de ${filteredRecipes.length} receitas.`}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                <p>Carregando mais receitas...</p>
              </div>
            )}
            {!hasMore && visibleRecipes.length > 0 && (
              <div className="text-center py-8">
                <p>Você chegou ao fim!</p>
              </div>
            )}
             {visibleRecipes.length === 0 && (
              <div className="text-center py-16">
                <p>Nenhuma receita encontrada com esses filtros.</p>
              </div>
            )}

        </main>
      </div>
       <footer className="relative z-10 border-t border-gray-200/50 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 text-center" style={{color: "hsl(var(--text-primary))", opacity: 0.7}}>
          <p>&copy; {new Date().getFullYear()} Todos os direitos reservados por @davidifly.</p>
        </div>
      </footer>
    </div>
  );
}
