
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  aiRecipeRecommendation,
  type AIRecipeRecommendationOutput,
} from '@/ai/ai-recipe-recommendation';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Bot, Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const suggestionSchema = z.object({
  dietaryGoals: z.string().min(3, 'Descreva seu objetivo (ex: perder peso).'),
  allergies: z.string().optional(),
  preferredFlavors: z
    .string()
    .min(3, 'Conte-nos um sabor que você gosta (ex: doce, cítrico).'),
  pastRecipeInteractions: z
    .string()
    .min(10, 'Descreva um pouco sobre o que você costuma comer ou gostar.'),
});

type SuggestionFormValues = z.infer<typeof suggestionSchema>;

export default function AiSuggestionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] =
    useState<AIRecipeRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      dietaryGoals: '',
      allergies: '',
      preferredFlavors: '',
      pastRecipeInteractions: '',
    },
  });

  const onSubmit = async (data: SuggestionFormValues) => {
    setIsLoading(true);
    setRecommendation(null);
    setError(null);
    try {
      const result = await aiRecipeRecommendation(data);
      setRecommendation(result);
    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao buscar sua sugestão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
             <Bot className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Sugestão do Chef IA
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Preencha suas preferências e deixe nossa Inteligência Artificial criar uma recomendação de receita exclusiva para você.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="dietaryGoals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Qual seu principal objetivo?</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Emagrecer, ganhar massa, comer menos açúcar..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Possui alguma alergia ou restrição?</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Glúten, lactose, amendoim..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredFlavors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Quais sabores você mais gosta?</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Doce, salgado, azedo, amargo, picante..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="pastRecipeInteractions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">O que você gosta de comer? </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex: Adoro bolos de chocolate, não gosto muito de peixe, como bastante frutas no café da manhã..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                    {isLoading ? (
                      <LoadingSpinner text="Criando sua receita..." className="py-0"/>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Gerar Sugestão
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {isLoading && (
            <div className="mt-8">
                 <LoadingSpinner text="Nossa IA está cozinhando algo especial para você..." />
            </div>
          )}

          {error && (
            <p className="mt-8 text-center text-destructive">{error}</p>
          )}

          {recommendation && (
            <Card className="mt-12 animate-fade-in-scale">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Sparkles />
                  Aqui está sua sugestão!
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none text-foreground">
                 <p>{recommendation.recommendedRecipes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
