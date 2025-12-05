
'use client';

import React, { useState, useMemo } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Input } from '@/components/ui/input';
import { getRecipes, type Recipe, createSlug } from '@/lib/recipes';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import { Search } from 'lucide-react';

// Função de busca "fuzzy"
function fuzzySearch(query: string, recipes: Recipe[]): Recipe[] {
  if (!query) {
    return [];
  }

  const normalizedQuery = createSlug(query);
  const queryWords = normalizedQuery.split('-');

  return recipes.filter(recipe => {
    const normalizedTitle = createSlug(recipe.title);
    const normalizedDescription = createSlug(recipe.description);
    const normalizedTags = recipe.tags.map(tag => createSlug(tag)).join(' ');

    const fullText = `${normalizedTitle} ${normalizedDescription} ${normalizedTags}`;

    // Verifica se todas as palavras da busca estão no texto da receita
    return queryWords.every(word => fullText.includes(word));
  });
}


export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const allRecipes = useMemo(() => getRecipes(), []);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const filteredRecipes = useMemo(() => {
    return fuzzySearch(searchTerm, allRecipes);
  }, [searchTerm, allRecipes]);

  const handleToggleFavorite = (slug: string) => {
    if (favorites.includes(slug)) {
      removeFavorite(slug);
    } else {
      addFavorite(slug);
    }
  };

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="mb-8 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground text-center">
            Busque sua <span className="text-primary">Receita</span>
          </h2>
          <div className="relative mt-6">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Digite o nome da receita ou ingrediente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-14 pl-12 rounded-2xl bg-secondary border-none text-base w-full"
            />
          </div>
        </div>

        <main>
          {searchTerm && filteredRecipes.length > 0 && (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {filteredRecipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={favorites.includes(recipe.slug)}
                  onToggleFavorite={() => handleToggleFavorite(recipe.slug)}
                  priority={index < 5}
                />
              ))}
            </div>
          )}

          {searchTerm && filteredRecipes.length === 0 && (
            <div className="text-center py-16 px-6 bg-background rounded-xl border border-dashed max-w-lg mx-auto">
                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold text-foreground">Nenhum resultado encontrado</h3>
                <p className="mt-2 text-base text-muted-foreground">
                    Tente buscar por outros termos ou ingredientes.
                </p>
            </div>
          )}

          {!searchTerm && (
             <div className="text-center py-16 px-6 bg-background rounded-xl border border-dashed max-w-lg mx-auto">
                <Search className="mx-auto h-12 w-12 text-primary/50" />
                <h3 className="mt-4 text-xl font-semibold text-foreground">O que você quer cozinhar hoje?</h3>
                <p className="mt-2 text-base text-muted-foreground">
                    Use a barra de busca acima para encontrar sua próxima receita favorita.
                </p>
            </div>
          )}
        </main>
      </div>
    </AppLayout>
  );
}

