import Link from 'next/link';
import Image from 'next/image';
import { type Recipe } from '@/lib/recipes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Utensils } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={recipe.image.imageUrl}
              alt={recipe.description}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={recipe.image.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="font-headline text-xl mb-2 group-hover:text-primary transition-colors">{recipe.title}</CardTitle>
          <CardDescription>{recipe.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 flex flex-col items-start space-y-4">
          <div className="flex justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{recipe.prepTime} Prep</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span>{recipe.cookTime} Cook</span>
            </div>
          </div>
           <div className="flex flex-wrap gap-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
