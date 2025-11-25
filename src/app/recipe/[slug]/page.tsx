
import { getRecipes, getRecipeBySlug, type Recipe } from '@/lib/recipes';
import { AppLayout } from '@/components/app-layout';
import { RecipeClientPage } from './recipe-client-page';
import { ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  const recipes = getRecipes();
  return recipes.map(recipe => ({
    slug: recipe.slug,
  }));
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);

  if (!recipe) {
    return (
      <AppLayout>
        <div className="flex flex-col justify-center items-center h-full text-center px-4">
          <ChefHat className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-3xl font-bold mb-2">Receita não encontrada</h1>
          <p className="text-muted-foreground mb-6">A receita que você está procurando não existe ou foi movida.</p>
          <Button asChild variant="link">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para todas as receitas
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
        <RecipeClientPage recipe={recipe} />
    </AppLayout>
  );
}
