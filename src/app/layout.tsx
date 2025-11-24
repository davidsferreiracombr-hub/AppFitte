import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { Inter, Nunito_Sans } from 'next/font/google';

const nunito_sans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-headline',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Fitte - Receitas Saudáveis',
  description: 'Mais de 700 receitas de doces fit para você emagrecer sem abrir mão do sabor.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen font-body antialiased", inter.variable, nunito_sans.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
