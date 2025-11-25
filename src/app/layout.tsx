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

// This is the Client Component
function RootClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <WelcomeScreenProvider>
      <WelcomeScreen />
      <AppContent>{children}</AppContent>
    </WelcomeScreenProvider>
  );
}

// This remains a Server Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>Fitte - Receitas Saudáveis</title>
        <meta name="description" content="Mais de 500 receitas de doces fit para você emagrecer sem abrir mão do sabor." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={cn("min-h-screen font-body antialiased", inter.variable)}>
        <RootClientLayout>{children}</RootClientLayout>
        <Toaster />
      </body>
    </html>
  );
}