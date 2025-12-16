
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const memberModules = [
  {
    subtitle: 'FASE 01',
    title: 'Poder da Economia',
    imageUrl: 'https://i.imgur.com/G9yVgsY.jpg',
    aiHint: 'man thinking',
    moduleNumber: '01',
    href: '/courses/power-of-economy',
  },
  {
    subtitle: 'FASE 02',
    title: 'Olho no Olho',
    imageUrl: 'https://i.imgur.com/KzouNnj.jpg',
    aiHint: 'couple talking',
    moduleNumber: '02',
    href: '/courses/olho-no-olho',
  },
  {
    subtitle: 'FASE 03',
    title: 'Vendas Digitais',
    imageUrl: 'https://i.imgur.com/PoAvRtJ.jpg',
    aiHint: 'man suit',
    moduleNumber: '03',
    href: '/courses/vendas-digitais',
  },
  {
    subtitle: 'FASE 04',
    title: 'Escala de Vendas FS',
    imageUrl: 'https://i.imgur.com/JRBhdyc.jpg',
    aiHint: 'man shadow',
    moduleNumber: '04',
    href: '/courses/escala-de-vendas-fs',
  },
  {
    subtitle: 'FASE 05',
    title: 'Escala de Vendas DG',
    imageUrl: 'https://i.imgur.com/yegtRWL.jpg',
    aiHint: 'man wine',
    moduleNumber: '05',
    href: '/courses/escala-de-vendas-dg',
  },
  {
    subtitle: 'FASE 06',
    title: 'Mudança de Ciclo',
    imageUrl: 'https://i.imgur.com/54eawaO.jpg',
    aiHint: 'man walking alone',
    moduleNumber: '06',
    href: '/courses/mudanca-de-ciclo',
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
              Sua jornada de desenvolvimento começa aqui. Acesse as fases e transforme-se.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {memberModules.map((item) => (
              <Link href={item.href} key={item.title}>
                <div 
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
                    <p className="text-sm font-semibold text-white/50 mt-2">{`FASE ${item.moduleNumber}`}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
