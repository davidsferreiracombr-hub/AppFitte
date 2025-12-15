
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { GraduationCap, Cake, Wheat, Cookie } from 'lucide-react';

const courseModules = [
  {
    title: "Módulo 1: Confeitaria Low Carb",
    icon: Wheat,
    description: "Domine as técnicas para criar doces deliciosos com baixo teor de carboidratos."
  },
  {
    title: "Módulo 2: Bolos e Tortas Fit",
    icon: Cake,
    description: "Aprenda a fazer bolos e tortas estruturados em versões saudáveis e funcionais."
  },
  {
    title: "Módulo 3: Doces Veganos",
    icon: GraduationCap,
    description: "Descubra como substituir ingredientes de origem animal sem perder o sabor."
  },
  {
    title: "Módulo 4: Precificação e Vendas",
    icon: Cookie,
    description: "Transforme sua paixão em um negócio lucrativo com estratégias de venda."
  },
];

export default function CoursesPage() {
  return (
    <AppLayout>
      <div className="flex-1 bg-black text-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          
          <div className="mb-12 max-w-3xl mx-auto">
             <div className="inline-block bg-primary/10 text-primary text-sm font-bold px-4 py-1 rounded-full mb-4">
                ✨ FORMAÇÃO COMPLETA ✨
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Escola Fitte de Confeitaria
            </h2>
            <p className="text-slate-300 mt-4 text-lg md:text-xl">
              Tudo que você precisa para sair do zero e lucrar com doces saudáveis.
            </p>
          </div>

          <div className="relative p-8 bg-gray-900/50 rounded-3xl border-2 border-primary/50 shadow-[0_0_30px_theme(colors.primary/0.3)]">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courseModules.map((item) => (
                    <div key={item.title} className="group relative p-6 bg-gray-900 rounded-2xl border border-white/10 transition-all duration-300 hover:border-primary/80 hover:bg-primary/5 hover:-translate-y-2">
                        <div className="relative flex items-center justify-center h-24">
                           <div className="absolute inset-0 bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all duration-300"></div>
                           <item.icon className="h-12 w-12 text-primary relative" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-white uppercase tracking-wider">{item.title}</h3>
                        <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                    </div>
                ))}
             </div>
             
             <div className="mt-12 text-center py-8 px-6 bg-black/30 backdrop-blur-sm rounded-xl border-2 border-dashed border-primary/30 max-w-lg mx-auto">
                <GraduationCap className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-4 text-2xl font-bold text-white">Lançamento em Breve</h3>
                <p className="mt-2 text-base text-slate-400">
                    Estamos finalizando os últimos detalhes da nossa formação completa. Fique de olho para não perder a abertura das vagas!
                </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
