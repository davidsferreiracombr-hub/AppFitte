
'use client';

import React, { useMemo } from 'react';
import { AppLayout } from '@/components/app-layout';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import { getRecipes, type Recipe } from '@/lib/recipes';

const categoryDefinitions = [
  {
    name: 'Bolos e Tortas',
    keywords: ['bolo', 'torta', 'cuca', 'rocambole', 'cheesecake', 'floresta negra'],
  },
  {
    name: 'Doces e Sobremesas',
    keywords: ['doce', 'sobremesa', 'pudim', 'mousse', 'creme', 'pave', 'sorvete', 'gelatina', 'manjar', 'bombom', 'trufa', 'paçoca', 'brigadeiro', 'quindim', 'cocada', 'ambrosia', 'suspiro', 'sagu'],
  },
  {
    name: 'Pães e Salgados',
    keywords: ['pão', 'salgado', 'empada', 'quibe', 'waffle', 'panqueca', 'esfiha', 'coxinha', 'petisco', 'pastel', 'croquete', 'nhoque', 'risoto', 'sopa', 'caldo', 'dadinho de tapioca', 'cuscuz'],
  },
  {
    name: 'Biscoitos e Cookies',
    keywords: ['cookie', 'biscoito', 'sequilho', 'donut', 'rosquinha', 'alfajor', 'goiabinha', 'casadinho'],
  },
  {
    name: 'Saudáveis e Fit',
    keywords: ['fit', 'low carb', 'integral', 'proteico', 'vegano', 'sem glúten', 'detox', 'saudavel', 'funcional', 'barra de cereal', 'vitamina', 'mingau', 'crepioca'],
  },
];


export default function CategoryPage({ params }: { params: { categoryName: string } }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const allRecipes = useMemo(() => getRecipes(), []);
  
  const categoryName = decodeURIComponent(params.categoryName);

  const filteredRecipes = useMemo(() => {
    const categoryDef = categoryDefinitions.find(c => c.name === categoryName);
    if (!categoryDef) return [];

    const finalFilteredList: Recipe[] = [];
    const addedRecipeIds = new Set<number>();

    // This logic ensures a recipe is only added to the first category it matches,
    // preventing duplicates across category pages.
    categoryDefinitions.forEach(catDef => {
      allRecipes.forEach(recipe => {
        if(addedRecipeIds.has(recipe.id)) return;
        
        let match = false;
        // Prioritize tags for more accurate categorization
        if (recipe.tags && Array.isArray(recipe.tags)) {
            if (catDef.keywords.some(keyword => recipe.tags.includes(keyword))) {
              match = true;
            }
        }
          
        // Fallback to title search if no tag matches
        if (!match) {
            match = catDef.keywords.some(keyword => recipe.title.toLowerCase().includes(keyword));
        }

        if (match) {
          if (catDef.name === categoryName) {
            finalFilteredList.push(recipe);
          }
          addedRecipeIds.add(recipe.id);
        }
      });
    });

    return finalFilteredList;

  }, [allRecipes, categoryName]);

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Receitas de <span className="text-primary">{categoryName}</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
                {`Encontramos ${filteredRecipes.length} receitas deliciosas na categoria ${categoryName}.`}
            </p>
        </div>

        <main>
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredRecipes.map(recipe => (
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
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>Nenhuma receita encontrada nesta categoria.</p>
            </div>
          )}
        </main>
      </div>
    </AppLayout>
  );
}
