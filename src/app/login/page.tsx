'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Mail, Lock, LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string()
    .email('E-mail inválido.')
    .refine(email => email.endsWith('@gmail.com') || email.endsWith('@gmail.com.br'), 'Use um e-mail @gmail.com ou @gmail.com.br.'),
  password: z.string()
    .min(1, 'A senha é obrigatória.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      router.push('/');
    } catch (error: any) {
      const errorMessage = error.code === 'auth/invalid-credential' 
        ? 'E-mail ou senha incorretos.' 
        : 'Ocorreu um erro. Tente novamente.';
      form.setError('root', { type: 'manual', message: errorMessage });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden p-4">
      <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-primary/0 rounded-full opacity-50 animate-float"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-tl from-primary/20 to-primary/0 rounded-full opacity-50 animate-float [animation-delay:-12s]"></div>

      <div className="w-full max-w-sm z-10">
        <div className="text-left mb-10">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground">Login</h1>
            <p className="text-muted-foreground mt-2">Bem-vindo(a) de volta! Acesse sua conta.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">E-mail</FormLabel>
                  <FormControl>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="seu-email@gmail.com" {...field} className="h-14 pl-12 rounded-2xl bg-secondary border-none text-base"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                       <Input type="password" placeholder="Senha" {...field} className="h-14 pl-12 rounded-2xl bg-secondary border-none text-base"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive text-center">{form.formState.errors.root.message}</p>
            )}

            <Button type="submit" className="w-full h-14 text-lg font-bold rounded-2xl" disabled={isLoading}>
              {isLoading ? <LoadingSpinner text={null} className="py-0"/> : 'Entrar'}
              {!isLoading && <LogIn className="ml-2 h-5 w-5" />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
