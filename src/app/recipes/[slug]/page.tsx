import { getRecipeBySlug, getRecipes, type Recipe } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, PieChart, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { type Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found",
    };
  }

  return {
    title: `${recipe.title} | Fit Sweet Delights`,
    description: recipe.description,
  };
}


export async function generateStaticParams() {
  const recipes = await getRecipes();
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <article>
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{recipe.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{recipe.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="capitalize">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-3 relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
             <Image
                src={recipe.image.imageUrl}
                alt={recipe.description}
                fill
                className="object-cover"
                data-ai-hint={recipe.image.imageHint}
             />
          </div>
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Recipe Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-4">
                  <Clock className="h-6 w-6 text-primary"/>
                  <div>
                    <p className="font-semibold text-foreground">Prep Time</p>
                    <p>{recipe.prepTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-6 w-6 text-primary"/>
                  <div>
                    <p className="font-semibold text-foreground">Cook Time</p>
                    <p>{recipe.cookTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="h-6 w-6 text-primary"/>
                  <div>
                    <p className="font-semibold text-foreground">Servings</p>
                    <p>{recipe.servings}</p>
                  </div>
                </div>
                <Separator/>
                <div className="flex items-center gap-4">
                  <PieChart className="h-6 w-6 text-primary"/>
                  <div>
                    <p className="font-semibold text-foreground">Nutrition (per serving)</p>
                    <p>{recipe.nutritionalInfo.calories}, {recipe.nutritionalInfo.protein} Protein, {recipe.nutritionalInfo.carbs} Carbs, {recipe.nutritionalInfo.fat} Fat</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold font-headline mb-4">Ingredients</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span><strong>{ing.quantity}</strong> {ing.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
             <h2 className="text-2xl font-bold font-headline mb-4">Instructions</h2>
             <ol className="space-y-6">
                {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary text-primary-foreground h-8 w-8 rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                        <p className="pt-1">{step}</p>
                    </li>
                ))}
             </ol>
          </div>
        </div>

      </article>
    </div>
  );
}
