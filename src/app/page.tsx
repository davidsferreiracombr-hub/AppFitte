
import { getRecipes } from '@/lib/recipes';
import { HomeView } from './home-view';

export default function Home() {
  const allRecipes = getRecipes();

  return <HomeView allRecipes={allRecipes} />;
}
