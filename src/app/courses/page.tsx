
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const memberModules = [
  {
    subtitle: 'MÓDULO 01',
    title: 'Introdução à Imersão',
    imageUrl: 'https://picsum.photos/seed/m1/400/500',
    aiHint: 'man thinking',
    moduleNumber: '01',
  },
  {
    subtitle: 'MÓDULO 02',
    title: 'Pilares da Atração',
    imageUrl: 'https://picsum.photos/seed/m2/400/500',
    aiHint: 'couple talking',
    moduleNumber: '02',
  },
  {
    subtitle: 'MÓDULO 03',
    title: 'Magnetismo Pessoal',
    imageUrl: 'https://picsum.photos/seed/m3/400/500',
    aiHint: 'man suit',
    moduleNumber: '03',
  },
  {
    subtitle: 'MÓDULO 04',
    title: 'Desapego Emocional',
    imageUrl: 'https://picsum.photos/seed/m4/400/500',
    aiHint: 'man shadow',
    moduleNumber: '04',
  },
  {
    subtitle: 'MÓDULO 05',
    title: 'Poder e Elegância',
    imageUrl: 'https://picsum.photos/seed/m5/400/500',
    aiHint: 'man wine',
    moduleNumber: '05',
  },
  {
    subtitle: 'MÓDULO 06',
    title: 'Solitude e Confiança',
    imageUrl: 'https://picsum.photos/seed/m6/400/500',
    aiHint: 'man walking alone',
    moduleNumber: '06',
  },
  {
    subtitle: 'MÓDULO 07',
    title: 'Estilo Pessoal',
    imageUrl: 'https://picsum.photos/seed/m7/400/500',
    aiHint: 'man fixing clothes',
    moduleNumber: '07',
  },
  {
    subtitle: 'MÓDULO 08',
    title: 'Conversas',
    imageUrl: 'https://picsum.photos/seed/m8/400/500',
    aiHint: 'couple sunset',
    moduleNumber: '08',
  },
];


export default function MembersPage() {
  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-black">
        <div className="container mx-auto pt-24">
          <div className="text-center mb-12 max-w-3xl mx-auto">
             <div className="inline-block bg-primary/10 text-primary text-sm font-bold px-4 py-1 rounded-full mb-4">
                ✨ CONTEÚDO EXCLUSIVO ✨
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Área de Membros
            </h2>
            <p className="text-muted-foreground mt-4 text-lg md:text-xl">
              Sua jornada de desenvolvimento começa aqui. Acesse os módulos e transforme-se.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {memberModules.map((item) => (
              <div 
                key={item.title} 
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg border border-border/10 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-primary/30"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  data-ai-hint={item.aiHint}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">{item.subtitle}</p>
                  <h3 className="text-xl lg:text-2xl font-bold tracking-tight mt-1" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-white/50 mt-2">{`MÓDULO ${item.moduleNumber}`}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
