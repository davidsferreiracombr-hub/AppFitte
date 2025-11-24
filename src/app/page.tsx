'use client';

import React, { useState, useMemo } from 'react';
import { type Recipe, getRecipes } from '@/lib/recipes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Heart, ChefHat, Cookie, CakeSlice, IceCream, Vegan, Lollipop, Soup, Wheat } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(() => {
    const allCategories = recipes.flatMap(recipe => recipe.tags);
    return ['Todos', ...Array.from(new Set(allCategories)).sort()];
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Todos' || recipe.tags.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, selectedCategory]);

  return (
    <div className="bg-white min-h-screen font-body">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8">
        <header className="text-center mb-10">
          <ChefHat className="mx-auto h-12 w-12 text-primary mb-3" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-gray-800">
            FitDoce - Receitas Saudáveis
          </h1>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            Mais de 500 receitas de doces fit para você emagrecer sem abrir mão do sabor. Perfeito para quem treina e busca uma alimentação saudável.
          </p>
        </header>

        <main>
          <div className="mb-8 sticky top-0 bg-white/80 backdrop-blur-sm py-4 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar receitas..."
                className="pl-10 w-full bg-gray-50 border-gray-200 focus:ring-primary focus:border-primary text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-center mt-4">
               <Button variant="link" className="text-primary hover:text-primary/90">
                <Heart className="mr-2 h-4 w-4" />
                Minhas Receitas Favoritas
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">Categorias</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize rounded-full px-4 py-1 h-auto text-sm transition-all duration-200 ${selectedCategory === category ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mb-4 text-center">
            {filteredRecipes.length} de {recipes.length} receitas encontradas
          </div>

          <div className="space-y-4">
            {filteredRecipes.map(recipe => {
              const Icon = getCategoryIcon(recipe.tags);
              return (
                <div key={recipe.id} className="p-4 border rounded-lg bg-gray-50/50 hover:bg-accent transition-colors cursor-pointer shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-4">
                     <div className="bg-primary/10 p-3 rounded-full">
                       <Icon className="h-6 w-6 text-primary" />
                     </div>
                     <div className="flex-1">
                       <h3 className="font-semibold font-headline text-lg text-gray-800">{recipe.title}</h3>
                       <p className="text-gray-600 text-sm">{recipe.description}</p>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
