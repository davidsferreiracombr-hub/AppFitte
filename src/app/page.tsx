'use client';

import React, { useState, useMemo } from 'react';
import { type Recipe, getRecipes } from '@/lib/recipes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Heart, ChefHat, Cookie, CakeSlice, IceCream, Vegan, Lollipop, Soup, Wheat, Clock, Flame, Info } from 'lucide-react';
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
    <div className="bg-gray-50 min-h-screen font-body">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center gap-3">
                    <ChefHat className="h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-headline font-bold text-gray-800">
                        FitDoce
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

       <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-gray-900 tracking-tight">
                Receitas Saudáveis, Sabor Irresistível.
            </h2>
            <p className="text-gray-600 mt-6 text-lg max-w-3xl mx-auto">
                Explore mais de 500 receitas de doces fit para uma vida mais gostosa e equilibrada. Perfeito para quem treina, busca saúde ou simplesmente ama um bom doce sem culpa.
            </p>
             <div className="mt-8 flex justify-center">
                <div className="relative w-full max-w-md">
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
        <main>
          <div className="mb-10">
            <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">Navegue por Categorias</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize rounded-full px-4 py-1.5 h-auto text-sm font-medium transition-all duration-200 ${selectedCategory === category ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mb-6 text-center">
            Mostrando {filteredRecipes.length} de {recipes.length} receitas.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredRecipes.map(recipe => {
              const Icon = getCategoryIcon(recipe.tags);
              return (
                <Link href={`/recipe/${recipe.slug}`} key={recipe.id} legacyBehavior>
                  <a className="block group">
                    <Card className="h-full flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
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
