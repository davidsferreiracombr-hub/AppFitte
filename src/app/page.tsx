'use client';

import React, { useState, useMemo } from 'react';
import { type Recipe, getRecipes } from '@/lib/recipes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Heart, ChefHat, Cookie, CakeSlice, IceCream, Vegan, Lollipop, Soup, Wheat, Utensils, Clock, Flame, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl py-8">
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
            <div className="relative max-w-md mx-auto">
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
            <h2 className="text-center text-lg font-semibold text-gray-700 mb-4 sr-only">Categorias</h2>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRecipes.map(recipe => {
              const Icon = getCategoryIcon(recipe.tags);
              return (
                <Link href={`/recipe/${recipe.slug}`} key={recipe.id} legacyBehavior>
                  <a className="block group">
                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="flex-row items-center gap-4 pb-2">
                        <div className="bg-primary/10 p-3 rounded-full">
                           <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg font-headline leading-tight flex-1">{recipe.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-between">
                        <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
                        <div className="text-xs text-gray-500 space-y-2 pt-2 border-t mt-auto">
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
