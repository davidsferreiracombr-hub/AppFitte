'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { SidebarProvider } from '@/components/app-layout';
import { WelcomeScreenProvider, useWelcomeScreen } from '@/hooks/use-welcome-screen';
import { WelcomeScreen } from '@/components/welcome-screen';
import React, { useEffect, useMemo } from 'react';
import { FirebaseClientProvider, useFirebase, useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/loading-spinner';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

function SessionWatcher() {
  const { user, firestore, auth } = useFirebase();

  useEffect(() => {
    if (!user || !firestore) return;

    const sessionsRef = collection(firestore, 'user_sessions');
    const q = query(sessionsRef, where("email", "==", user.email));

    // Get initial docs to know our current session ID
    let currentSessionId: string | null = null;
    getDocs(q).then(snapshot => {
      if (!snapshot.empty) {
        // Assuming there is only one session doc per user as per our login logic
        currentSessionId = snapshot.docs[0].id;
      }
    });

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // If there are no docs, or if our current session doc was deleted, logout.
      if (snapshot.empty || (currentSessionId && !snapshot.docs.some(doc => doc.id === currentSessionId))) {
         if (auth) {
            signOut(auth);
         }
      }
    });

    return () => unsubscribe();
  }, [user, firestore, auth]);

  return null; // This component does not render anything
}


function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { animationEnded } = useWelcomeScreen();

  useEffect(() => {
    if (!animationEnded || isUserLoading) return;

    const isLoginPage = pathname === '/login';

    if (!user && !isLoginPage) {
      router.push('/login');
    } else if (user && isLoginPage) {
      router.push('/');
    }
  }, [user, isUserLoading, router, pathname, animationEnded]);

  if (!animationEnded || isUserLoading) {
    return <LoadingSpinner text="Carregando..." className="h-screen" />;
  }

  if (!user && pathname !== '/login') {
    // Still loading or redirecting
    return <LoadingSpinner text="Verificando acesso..." className="h-screen" />;
  }
  
  if (user && pathname === '/login') {
     return <LoadingSpinner text="Redirecionando..." className="h-screen" />;
  }


  return <>{children}</>;
}


function AppContent({ children }: { children: React.ReactNode }) {
  const { animationEnded } = useWelcomeScreen();
  const pathname = usePathname();

  if (!animationEnded) {
    return null;
  }
  
  // Do not wrap login page with SidebarProvider
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <SessionWatcher />
      {children}
    </SidebarProvider>
  );
}

function RootClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <WelcomeScreenProvider>
        <WelcomeScreen />
        <AuthGuard>
          <AppContent>{children}</AppContent>
        </AuthGuard>
      </WelcomeScreenProvider>
    </FirebaseClientProvider>
  );
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
        <RootClientLayout>{children}</RootClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
