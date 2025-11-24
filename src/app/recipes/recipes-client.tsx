"use client";

import React, { useState, useMemo } from 'react';
import { type Recipe } from '@/lib/recipes';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RecipeCard from '@/components/recipe-card';
import { Search } from 'lucide-react';

export default function RecipesClient({ recipes }: { recipes: Recipe[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all');

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        dietaryFilter === 'all' || (recipe.tags && recipe.tags.includes(dietaryFilter));
      return matchesSearch && matchesFilter;
    });
  }, [recipes, searchTerm, dietaryFilter]);

  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    recipes.forEach((recipe) => recipe.tags?.forEach((tag) => tags.add(tag)));
    return ['all', ...Array.from(tags).sort()];
  }, [recipes]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search recipes by name or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={dietaryFilter} onValueChange={setDietaryFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by diet" />
          </SelectTrigger>
          <SelectContent>
            {uniqueTags.map((tag) => (
              <SelectItem key={tag} value={tag} className="capitalize">
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-headline">No Recipes Found</h2>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
