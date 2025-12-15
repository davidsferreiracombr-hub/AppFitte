
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { GraduationCap } from 'lucide-react';

export default function CoursesPage() {
  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 lg:max-w-7xl lg:mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <GraduationCap className="mx-auto h-16 w-16 text-primary mb-4" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Nossos Cursos <span className="text-primary">Exclusivos</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Aprenda a criar doces saudáveis e deliciosos com nossos cursos passo a passo.
            </p>
          </div>

           <div className="text-center py-16 px-6 bg-background rounded-xl border-4 border-dashed border-primary/20 max-w-lg mx-auto">
                <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-2xl font-bold text-foreground">Em Breve</h3>
                <p className="mt-2 text-base text-muted-foreground">
                    Estamos preparando cursos incríveis para você se tornar um(a) mestre na confeitaria fit. Fique de olho!
                </p>
            </div>

        </div>
      </div>
    </AppLayout>
  );
}
