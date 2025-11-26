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
    
    if (password !== MASTER_PASSWORD) {
        setIsLoading(false);
        throw { code: 'auth/invalid-credential', message: 'Senha incorreta.' };
    }

    try {
      await setPersistence(auth, browserLocalPersistence);
      
      try {
        // First, try to sign in.
        await signInWithEmailAndPassword(auth, email, MASTER_PASSWORD);
      } catch (error: any) {
        // If the user is not found, create a new one.
        if (error.code === 'auth/user-not-found') {
          await createUserWithEmailAndPassword(auth, email, MASTER_PASSWORD);
        } else {
          // For any other login error (e.g., network issues, or even invalid-credential for a *different* reason), re-throw it.
          throw error;
        }
      }
      
      // After successful login or creation, manage the session.
      await manageSession(email);

    } catch (error: any) {
      // Set a generic error for the UI, but rethrow the original error for form handling.
      if(error.code !== 'auth/invalid-credential') { // Avoid duplicating the specific message
        setError(error.message);
      }
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (auth.currentUser && firestore) {
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
