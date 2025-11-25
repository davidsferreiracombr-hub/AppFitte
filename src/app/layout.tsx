'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { SidebarProvider } from '@/components/app-layout';
import { WelcomeScreenProvider, useWelcomeScreen } from '@/hooks/use-welcome-screen';
import { WelcomeScreen } from '@/components/welcome-screen';
import React from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

// A metadata não pode ser exportada de um client component.
// Ela será tratada em um nível superior se necessário ou pode ser omitida por agora.
/*
export const metadata: Metadata = {
  title: 'Fitte - Receitas Saudáveis',
  description: 'Mais de 500 receitas de doces fit para você emagrecer sem abrir mão do sabor.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};
*/

function AppContent({ children }: { children: React.ReactNode }) {
  const { animationEnded } = useWelcomeScreen();

  if (!animationEnded) {
    return null;
  }
  
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  );
}

function RootContent({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <head>
                <title>Fitte - Receitas Saudáveis</title>
                <meta name="description" content="Mais de 500 receitas de doces fit para você emagrecer sem abrir mão do sabor." />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </head>
            <body className={cn("min-h-screen font-body antialiased", inter.variable)}>
                <WelcomeScreenProvider>
                    <WelcomeScreen />
                    <AppContent>{children}</AppContent>
                </WelcomeScreenProvider>
                <Toaster />
            </body>
        </html>
    )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootContent>{children}</RootContent>
  );
}
