
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { GraduationCap } from 'lucide-react';
import { FloatingParticles } from '@/components/floating-particles';

export default function CoursesPage() {
  return (
    <AppLayout>
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-hidden">
        {/* Fundo Gradiente e Partículas */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-950 via-slate-900 to-black" />
        <FloatingParticles />

        <div className="max-w-2xl mx-auto text-center z-10">
          <div className="mb-12">
            <GraduationCap className="mx-auto h-16 w-16 text-primary mb-4" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Nossos Cursos <span className="text-primary">Exclusivos</span>
            </h2>
            <p className="text-slate-300 mt-4 text-lg">
              Aprenda a criar doces saudáveis e deliciosos com nossos cursos passo a passo.
            </p>
          </div>

           <div className="text-center py-16 px-6 bg-black/30 backdrop-blur-sm rounded-xl border-2 border-dashed border-primary/30 max-w-lg mx-auto">
                <GraduationCap className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-4 text-2xl font-bold text-white">Em Breve</h3>
                <p className="mt-2 text-base text-slate-400">
                    Estamos preparando cursos incríveis para você se tornar um(a) mestre na confeitaria fit. Fique de olho!
                </p>
            </div>

        </div>
      </div>
    </AppLayout>
  );
}
