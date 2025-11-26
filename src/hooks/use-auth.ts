'use client';

import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { useFirebase } from '@/firebase';
import { collection, query, where, getDocs, writeBatch, doc, serverTimestamp, addDoc } from 'firebase/firestore';

const MASTER_PASSWORD = '045622';

export function useAuth() {
  const { auth, firestore } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const manageSession = async (email: string) => {
    if (!firestore) return;
    const sessionsRef = collection(firestore, 'user_sessions');
    
    // 1. Find and delete old sessions for this user
    const q = query(sessionsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(firestore);
    querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    // 2. Create a new session document
    await addDoc(sessionsRef, {
        email: email,
        lastLogin: serverTimestamp(),
        deviceInfo: navigator.userAgent, // Basic device info
    });
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    // Primeiro, verifique se a senha é a senha mestra.
    if (password !== MASTER_PASSWORD) {
        setIsLoading(false);
        // Lança um erro específico para ser pego pela UI.
        throw { code: 'auth/invalid-credential', message: 'Senha incorreta.' };
    }

    try {
      // Garante a persistência local da sessão.
      await setPersistence(auth, browserLocalPersistence);
      
      try {
        // Tenta fazer o login primeiro.
        await signInWithEmailAndPassword(auth, email, MASTER_PASSWORD);
      } catch (error: any) {
        // Se o usuário não for encontrado, crie um novo.
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          await createUserWithEmailAndPassword(auth, email, MASTER_PASSWORD);
        } else {
          // Para qualquer outro erro (problemas de rede, etc.), lance-o novamente.
          throw error;
        }
      }
      
      // Após o login ou criação bem-sucedida, gerencie a sessão.
      await manageSession(email);

    } catch (error: any) {
      setError(error.message);
      throw error; // Relança o erro para ser tratado pelo formulário.
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (auth.currentUser && firestore) {
        // Opcional: Limpa o documento de sessão no logout explícito.
        const sessionsRef = collection(firestore, 'user_sessions');
        const q = query(sessionsRef, where("email", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(firestore);
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
      }
      await signOut(auth);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, logout, isLoading, error };
}
