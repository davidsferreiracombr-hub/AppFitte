
'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { SidebarProvider } from '@/components/app-layout';
import { WelcomeScreenProvider, useWelcomeScreen } from '@/hooks/use-welcome-screen';
import { WelcomeScreen } from '@/components/welcome-screen';
import React from 'react';
import { FirebaseClientProvider, useFirebase } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/loading-spinner';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800', '900']
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

const PUBLIC_ROUTES = ['/login', '/signup']; // Add any other public routes here

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useFirebase();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (isUserLoading) return; // Don't do anything while loading

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (!user && !isPublicRoute) {
      // If user is not logged in and not on a public route, redirect to login
      router.push('/login');
    } else if (user && isPublicRoute) {
      // If user is logged in and tries to access a public route, redirect to home
      router.push('/');
    }
  }, [user, isUserLoading, router, pathname]);

  // While loading, or if redirecting, show a spinner
  const isPublic = PUBLIC_ROUTES.includes(pathname);
  if (isUserLoading || (!user && !isPublic) || (user && isPublic)) {
    const message = isUserLoading ? "Verificando sessão..." : "Redirecionando...";
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <LoadingSpinner text={message} />
      </div>
    );
  }

  // If on a public route and not logged in, render the page (e.g., login page)
  if (!user && isPublic) {
    return <>{children}</>;
  }

  // If user is logged in and on a protected route, render the app layout
  return (
    <SidebarProvider>
      <SessionWatcher />
      {children}
    </SidebarProvider>
  );
}

function RootClientLayout({ children }: { children: React.ReactNode }) {
  const { animationEnded } = useWelcomeScreen();

  if (!animationEnded) {
    return <WelcomeScreen />;
  }
  
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
      <body className={cn("min-h-screen font-body antialiased pb-20 lg:pb-0", poppins.variable)}>
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
