import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
             <Link href="/" className="flex items-center space-x-2">
                <UtensilsCrossed className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline text-lg">Fit Sweet Delights</span>
             </Link>
             <p className="text-muted-foreground text-sm">Healthy desserts for a fit lifestyle.</p>
          </div>
          <div>
            <h3 className="font-semibold font-headline">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/recipes" className="text-sm text-muted-foreground hover:text-primary">Recipes</Link></li>
              <li><Link href="/forum" className="text-sm text-muted-foreground hover:text-primary">Community</Link></li>
              <li><Link href="/profile" className="text-sm text-muted-foreground hover:text-primary">My Profile</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
             <h3 className="font-semibold font-headline">Follow Us</h3>
              <p className="text-sm text-muted-foreground mt-4">Social media links go here.</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Fit Sweet Delights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
