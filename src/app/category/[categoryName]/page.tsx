
'use client';

import React, { useMemo } from 'react';
import { AppLayout } from '@/components/app-layout';
import { RecipeCard } from '@/components/recipe-card';
import { useFavorites } from '@/hooks/use-favorites';
import { getRecipes, type Recipe } from '@/lib/recipes';

const mainCategories = ["Bolo", "Torta", "Cookie", "Vitamina", "Barra de Cereal", "Muffin", "Panqueca", "Sorvete", "Pudim", "Gelatina", "Creme", "Paçoca", "Bombom", "Trufa", "Biscoito", "Donut", "Doce", "Salgado", "Pão", "Waffle", "Mingau", "Empada", "Quibe"];

export default function CategoryPage({ params }: { params: { categoryName: string } }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const allRecipes = useMemo(() => getRecipes(), []);
  
  const categoryName = decodeURIComponent(params.categoryName);

  const filteredRecipes = useMemo(() => {
    const categorizedRecipes = new Set<number>();
    
    // First pass: Categorize recipes based on main categories found in tags or title
    allRecipes.forEach(recipe => {
      const normalizedTags = recipe.tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' '));
      let isCategorized = false;
      for (const cat of mainCategories) {
        if (normalizedTags.includes(cat) || recipe.title.toLowerCase().includes(cat.toLowerCase())) {
          categorizedRecipes.add(recipe.id);
          isCategorized = true;
          break;
        }
      }
    });

    if (categoryName === 'Outros') {
      return allRecipes.filter(recipe => !categorizedRecipes.has(recipe.id));
    }

    return allRecipes.filter(recipe => {
      const normalizedTags = recipe.tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' '));
      
      // A recipe belongs to a category if the category name is in its tags
      if (normalizedTags.includes(categoryName)) {
        return true;
      }
      
      // If not in tags, check if it's in the title, but only if it doesn't belong to another primary category via tags
      const hasOtherMainCategoryInTags = mainCategories.some(cat => cat !== categoryName && normalizedTags.includes(cat));

      if (!hasOtherMainCategoryInTags && recipe.title.toLowerCase().includes(categoryName.toLowerCase())) {
          return true;
      }

      return false;
    });
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
