
'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { SidebarProvider } from '@/components/app-layout';
import { WelcomeScreenProvider, useWelcomeScreen } from '@/hooks/use-welcome-screen';
import { WelcomeScreen } from '@/components/welcome-screen';
import React, from 'react';
import { FirebaseClientProvider, useFirebase } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/loading-spinner';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

function SessionWatcher() {
  const { user, firestore, auth } = useFirebase();

  React.useEffect(() => {
    if (!user || !firestore || !auth) return;

    const sessionsRef = collection(firestore, 'user_sessions');
    const q = query(sessionsRef, where("email", "==", user.email));

    let currentSessionId: string | null = null;
    getDocs(q).then(snapshot => {
      if (!snapshot.empty) {
        const latestDoc = snapshot.docs.sort((a, b) => b.data().lastLogin - a.data().lastLogin)[0];
        currentSessionId = latestDoc.id;
      }
    });

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const isSessionActive = snapshot.docs.some(doc => doc.id === currentSessionId);
      if (snapshot.docs.length > 0 && currentSessionId && !isSessionActive) {
         signOut(auth);
       } else if (snapshot.empty && currentSessionId) {
         signOut(auth);
       }
    });

    return () => unsubscribe();
  }, [user, firestore, auth]);

  return null;
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useFirebase();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (isUserLoading) return;

    const isLoginPage = pathname === '/login';

    if (!user && !isLoginPage) {
      router.push('/login');
    } else if (user && isLoginPage) {
      router.push('/');
    }
  }, [user, isUserLoading, router, pathname]);

  if (isUserLoading || (!user && pathname !== '/login') || (user && pathname === '/login')) {
    const message = isUserLoading ? "Carregando..." : "Redirecionando...";
    return <LoadingSpinner text={message} className="h-screen" />;
  }

  // Renderiza o conteúdo do aplicativo ou a página de login
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Se estiver autenticado e não estiver na página de login, mostra o layout do app
  return (
    <SidebarProvider>
      <SessionWatcher />
      {children}
    </SidebarProvider>
  );
}

function RootClientLayout({ children }: { children: React.ReactNode }) {
  const { animationEnded } = useWelcomeScreen();

  // 1. Sempre mostra a WelcomeScreen primeiro se a animação não tiver terminado.
  if (!animationEnded) {
    return <WelcomeScreen />;
  }

  // 2. Somente depois que a animação termina, o AuthGuard assume.
  return <AuthGuard>{children}</AuthGuard>;
}

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
        <WelcomeScreenProvider>
          <FirebaseClientProvider>
            <RootClientLayout>{children}</RootClientLayout>
          </FirebaseClientProvider>
        </WelcomeScreenProvider>
        <Toaster />
      </body>
    </html>
  );
}
