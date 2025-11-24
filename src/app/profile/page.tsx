import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecipes } from "@/lib/recipes";
import RecipeCard from "@/components/recipe-card";
import { User, Settings } from "lucide-react";
import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: 'Your Profile | Fit Sweet Delights',
    description: 'Manage your profile and view your favorite recipes.'
};

export default async function ProfilePage() {
  const allRecipes = await getRecipes();
  const favoriteRecipes = allRecipes.slice(0, 2); // Mock favorite recipes

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Avatar className="h-32 w-32 border-4 border-primary">
          <AvatarImage src="https://picsum.photos/seed/user/200/200" alt="User Name" data-ai-hint="person portrait" />
          <AvatarFallback>
            <User className="h-16 w-16" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-4xl font-headline font-bold">Jane Doe</h1>
          <p className="text-muted-foreground mt-2">Joined March 2023</p>
          <p className="mt-4 max-w-xl">Lover of all things chocolate and fitness. Trying to find the perfect balance, one healthy dessert at a time!</p>
        </div>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">My Favorite Recipes</CardTitle>
          <CardDescription>Your collection of go-to healthy treats.</CardDescription>
        </CardHeader>
        <CardContent>
          {favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {favoriteRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h3 className="text-xl font-semibold">No Favorites Yet</h3>
              <p className="text-muted-foreground mt-2">Explore recipes and save the ones you love!</p>
              <Button asChild className="mt-4">
                <Link href="/recipes">Find Recipes</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
