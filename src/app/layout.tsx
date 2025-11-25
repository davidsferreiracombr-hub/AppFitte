import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { SidebarProvider } from '@/components/app-layout';
import { WelcomeScreenProvider } from '@/hooks/use-welcome-screen';
import { WelcomeScreen } from '@/components/welcome-screen';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Fitte - Receitas Saudáveis',
  description: 'Mais de 500 receitas de doces fit para você emagrecer sem abrir mão do sabor.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body className={cn("min-h-screen font-body antialiased", inter.variable)}>
        <WelcomeScreenProvider>
          <WelcomeScreen />
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </WelcomeScreenProvider>
        <Toaster />
      </body>
    </html>
  );
}
