import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getRecipes } from '@/lib/recipes';
import RecipeCard from '@/components/recipe-card';
import { ArrowRight, Leaf, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default async function Home() {
  const allRecipes = await getRecipes();
  const featuredRecipes = allRecipes.slice(0, 3);
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-image');

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg">
              Indulge Guilt-Free
            </h1>
            <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto drop-shadow-md font-body">
              Discover over 500 delicious and healthy dessert recipes to satisfy
              your sweet tooth.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/recipes">Explore Recipes</Link>
            </Button>
          </div>
        </section>

        {/* AI Recommendation Section */}
        <section id="ai-recommender" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Personalized Sweet Suggestions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Let our AI find the perfect fit dessert for you based on your
                preferences.
              </p>
            </div>
            <Card className="max-w-3xl mx-auto shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Tell us what you like
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Dietary Goal</Label>
                    <Select>
                      <SelectTrigger id="goal">
                        <SelectValue placeholder="Select a goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="low-carb">Low Carb</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Select>
                      <SelectTrigger id="allergies">
                        <SelectValue placeholder="Any allergies?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                        <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                        <SelectItem value="nut-free">Nut-Free</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="flavors">Preferred Flavors</Label>
                    <Input
                      id="flavors"
                      placeholder="e.g., chocolate, vanilla, fruity"
                    />
                  </div>
                  <div className="md:col-span-2 text-center">
                    <Button type="submit" size="lg" className="w-full md:w-auto">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Find My Treat
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Featured Recipes Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Leaf className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Featured Desserts
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get a taste of our most popular healthy sweets.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/recipes">
                  View All Recipes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
