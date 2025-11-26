'use client';

import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  inMemoryPersistence,
  setPersistence,
} from 'firebase/auth';
import { useFirebase } from '@/firebase';

export function useAuth() {
  const { auth } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, masterPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await setPersistence(auth, inMemoryPersistence);
      await signInWithEmailAndPassword(auth, email, masterPassword);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, email, masterPassword);
        } catch (creationError: any) {
          setError(creationError.message);
          throw creationError;
        }
      } else {
        setError(error.message);
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, logout, isLoading, error };
}
