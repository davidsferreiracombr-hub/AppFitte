'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 lg:max-w-7xl lg:mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Star className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Avaliações
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Em breve, aqui você poderá ver e deixar avaliações para as receitas!
            </p>
          </div>

           <div className="text-center py-16 px-6 bg-background rounded-xl border border-dashed max-w-lg mx-auto">
                <Star className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold text-foreground">Funcionalidade em Construção</h3>
                <p className="mt-2 text-base text-muted-foreground">
                    Estamos trabalhando para trazer um sistema de feedback e avaliações completo para você.
                </p>
            </div>

        </div>
      </div>
    </AppLayout>
  );
}
