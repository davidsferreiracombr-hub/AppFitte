
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
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
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
      
      <div className="w-full max-w-sm z-10">
        <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
                <h1 className="text-5xl font-extrabold tracking-tight text-primary">Fitte</h1>
            </Link>
            <p className="text-muted-foreground mt-2 text-lg">Bem-vindo(a) de volta! Acesse sua conta.</p>
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
                        <Input placeholder="seu-email@exemplo.com" {...field} className="h-14 pl-12 rounded-2xl bg-secondary border-none text-base"/>
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
              {isLoading ? <LoadingSpinner text="Entrando..." className="py-0"/> : 'Entrar'}
              {!isLoading && <LogIn className="ml-2 h-5 w-5" />}
            </Button>
          </form>
        </Form>
        <p className="text-xs text-muted-foreground text-center mt-8 font-medium max-w-xs mx-auto">
            Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  );
}
