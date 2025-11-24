'use client';

import { AppLayout } from '@/components/app-layout';
import { LayoutGrid } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Categorias de Receitas
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
                Explore receitas por categorias.
            </p>
        </div>

        <main>
          <div className="text-center py-16 px-6 bg-background rounded-xl border border-dashed max-w-lg mx-auto">
              <LayoutGrid className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold text-foreground">Em Breve</h3>
              <p className="mt-2 text-base text-muted-foreground">
                  A seção de categorias está sendo preparada. Volte em breve!
              </p>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
