
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { GraduationCap, Cake, Wheat, Cookie, Camera, Package, BarChart } from 'lucide-react';
import Image from 'next/image';

const courseModules = [
  {
    title: "Curso de Economia do Fitte",
    imageUrl: "https://i.imgur.com/mIojegW.jpg",
    description: "Aprenda a precificar, gerenciar custos e transformar sua paixão em um negócio de sucesso."
  },
  {
    title: "Bolos e Tortas Saudáveis",
    icon: Cake,
    description: "Aprenda a fazer bolos e tortas estruturados em versões saudáveis e com muito sabor."
  },
  {
    title: "Doces e Sobremesas Veganas",
    icon: Cookie,
    description: "Descubra como substituir ingredientes de origem animal sem perder a textura e o sabor."
  },
  {
    title: "Precificação e Vendas",
    icon: BarChart,
    description: "Transforme sua paixão em um negócio lucrativo com estratégias de precificação e venda."
  },
   {
    title: "Fotografia e Marketing de Alimentos",
    icon: Camera,
    description: "Crie fotos incríveis dos seus pratos e aprenda a divulgá-los nas redes sociais."
  },
  {
    title: "Embalagens e Apresentação",
    icon: Package,
    description: "Encante seus clientes com embalagens que valorizam seu produto e sua marca."
  },
];

export default function CoursesPage() {
  return (
    <AppLayout>
      <div className="flex-1 bg-black text-white">
        <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          
          <div className="mb-12 max-w-3xl mx-auto">
             <div className="inline-block bg-primary/10 text-primary text-sm font-bold px-4 py-1 rounded-full mb-4">
                ✨ FORMAÇÃO COMPLETA ✨
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Escola Fitte
            </h2>
            <p className="text-slate-300 mt-4 text-lg md:text-xl">
              Tudo que você precisa para transformar suas receitas em um negócio lucrativo.
            </p>
          </div>

          <div className="relative p-8 bg-gray-900/50 rounded-3xl border-2 border-primary/50 shadow-[0_0_30px_theme(colors.primary/0.3)] max-w-7xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courseModules.map((item, index) => {
                  if (index === 0 && item.imageUrl) {
                    return (
                      <div key={item.title} className="group relative rounded-2xl overflow-hidden shadow-lg h-80 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-end md:col-span-2 lg:col-span-1">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="relative p-6 text-white text-left">
                          <h3 className="text-2xl font-bold tracking-tight" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm font-medium opacity-90 max-w-xs">{item.description}</p>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div key={item.title} className="group relative p-6 bg-gray-900 rounded-2xl border border-white/10 transition-all duration-300 hover:border-primary/80 hover:bg-primary/5 hover:-translate-y-2 flex flex-col h-80">
                        <div className="relative flex items-center justify-center h-32 mb-4 flex-shrink-0">
                           <div className="absolute inset-0 bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all duration-300"></div>
                           {item.icon && <item.icon className="h-12 w-12 text-primary relative" />}
                        </div>
                        <div className="flex flex-col flex-grow text-left">
                          <h3 className="mt-4 text-lg font-bold text-white uppercase tracking-wider">{item.title}</h3>
                          <p className="mt-2 text-sm text-slate-400 flex-grow">{item.description}</p>
                        </div>
                    </div>
                  );
                })}
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
