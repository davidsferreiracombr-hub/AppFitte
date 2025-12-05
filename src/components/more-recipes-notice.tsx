
'use client';

import { Sparkles } from 'lucide-react';

export function MoreRecipesNotice() {
  return (
    <div className="text-center py-16 px-6 bg-background rounded-xl border border-dashed max-w-lg mx-auto mt-12">
        <Sparkles className="mx-auto h-12 w-12 text-primary/80" />
        <h3 className="mt-4 text-xl font-semibold text-foreground">Novas Receitas em Breve!</h3>
        <p className="mt-2 text-base text-muted-foreground">
            Nosso livro de receitas está sempre crescendo. Volte em breve para descobrir novas delícias saudáveis.
        </p>
    </div>
  );
}
