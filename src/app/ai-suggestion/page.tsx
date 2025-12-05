
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AiSuggestionPage() {
  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="text-center py-16 px-6 bg-background rounded-xl border border-dashed max-w-lg mx-auto">
            <Bot className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">Sugestão do Chef IA</h3>
            <p className="mt-2 text-base text-muted-foreground">
                Em breve, nossa Inteligência Artificial irá sugerir receitas incríveis com base no seu paladar. Fique de olho!
            </p>
            <Button asChild className="mt-6">
                <Link href="/">Ver todas as receitas</Link>
            </Button>
        </div>
      </div>
    </AppLayout>
  );
}
