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

  const login = async (email: string, masterPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Use local persistence to keep user logged in across browser sessions
      await setPersistence(auth, browserLocalPersistence);
      
      try {
        await signInWithEmailAndPassword(auth, email, masterPassword);
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          // If user does not exist, create them
          await createUserWithEmailAndPassword(auth, email, masterPassword);
        } else {
          // For other errors (like wrong password), re-throw
          throw error;
        }
      }
      
      // After successful login or creation, manage the session
      await manageSession(email);

    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (auth.currentUser && firestore) {
        // Optional: Also clear the session document on explicit logout
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
