
'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { SidebarProvider } from '@/components/app-layout';
import { WelcomeScreenProvider, useWelcomeScreen } from '@/hooks/use-welcome-screen';
import { WelcomeScreen } from '@/components/welcome-screen';
import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (!user || !firestore || !auth) return;

    const sessionsRef = collection(firestore, 'user_sessions');
    const q = query(sessionsRef, where("email", "==", user.email));

    // Get initial docs to know our current session ID
    let currentSessionId: string | null = null;
    getDocs(q).then(snapshot => {
      // There should only be one doc, but handle multiple just in case
      if (!snapshot.empty) {
        // The most recent doc should be the current session
        const latestDoc = snapshot.docs.sort((a, b) => b.data().lastLogin - a.data().lastLogin)[0];
        currentSessionId = latestDoc.id;
      }
    });

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const isSessionActive = snapshot.docs.some(doc => doc.id === currentSessionId);
      // If there are no docs for this email, or if the current session doc was deleted
      // it means a new session has started elsewhere.
       if (snapshot.docs.length > 0 && currentSessionId && !isSessionActive) {
         signOut(auth);
       } else if (snapshot.empty && currentSessionId) {
         signOut(auth);
       }
    });

    return () => unsubscribe();
  }, [user, firestore, auth]);

  return null; // This component does not render anything
}


function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useFirebase();
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

  if (isUserLoading || !animationEnded) {
    return <LoadingSpinner text="Carregando..." className="h-screen" />;
  }
  
  if (!user && pathname !== '/login') {
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

  // Do not wrap login page with SidebarProvider
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Wait for the welcome animation to finish before rendering the main layout
  if (!animationEnded) {
    return null;
  }

  // Wrap authenticated pages with the sidebar and session watcher
  return (
    <SidebarProvider>
      <SessionWatcher />
      {children}
    </SidebarProvider>
  );
}

function RootClientLayout({ children }: { children: React.ReactNode }) {
  const { animationEnded } = useWelcomeScreen();
  return (
    <FirebaseClientProvider>
        <WelcomeScreen />
        {animationEnded && (
          <AuthGuard>
            <AppContent>{children}</AppContent>
          </AuthGuard>
        )}
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
        <WelcomeScreenProvider>
            <RootClientLayout>{children}</RootClientLayout>
        </WelcomeScreenProvider>
        <Toaster />
      </body>
    </html>
  );
}
