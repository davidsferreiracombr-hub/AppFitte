'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending recipes based on user preferences.
 *
 * The flow takes a conversational text input from the user
 * and returns a list of recommended recipes.
 *
 * @interface AIRecipeRecommendationInput - The input type for the aiRecipeRecommendation function.
 * @interface AIRecipeRecommendationOutput - The output type for the aiRecipeRecommendation function.
 * @function aiRecipeRecommendation - A function that takes AIRecipeRecommendationInput and returns a Promise of AIRecipeRecommendationOutput.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRecipeRecommendationInputSchema = z.object({
  request: z
    .string()
    .describe('The user’s conversational request for a recipe suggestion (e.g., "I want something sweet and sour", "a healthy dessert for after dinner").'),
});

export type AIRecipeRecommendationInput = z.infer<
  typeof AIRecipeRecommendationInputSchema
>;

const AIRecipeRecommendationOutputSchema = z.object({
  recommendedRecipes: z
    .string()
    .describe('A recipe suggestion based on the user’s conversational request.'),
});

export type AIRecipeRecommendationOutput = z.infer<
  typeof AIRecipeRecommendationOutputSchema
>;

export async function aiRecipeRecommendation(
  input: AIRecipeRecommendationInput
): Promise<AIRecipeRecommendationOutput> {
  return aiRecipeRecommendationFlow(input);
}

const aiRecipeRecommendationPrompt = ai.definePrompt({
  name: 'aiRecipeRecommendationPrompt',
  input: {schema: AIRecipeRecommendationInputSchema},
  output: {schema: AIRecipeRecommendationOutputSchema},
  prompt: `You are an AI Chef specializing in healthy and delicious desserts. A user will describe what they feel like eating. Based on their request, suggest a single, creative, and appealing recipe.

User's Request: {{{request}}}

Respond with a suggestion that fits the user's mood and preferences. Be friendly and conversational in your recommendation text. Just return the recipe suggestion text.`,
});

const aiRecipeRecommendationFlow = ai.defineFlow(
  {
    name: 'aiRecipeRecommendationFlow',
    inputSchema: AIRecipeRecommendationInputSchema,
    outputSchema: AIRecipeRecommendationOutputSchema,
  },
  async input => {
    const {output} = await aiRecipeRecommendationPrompt(input);
    return output!;
  }
);
