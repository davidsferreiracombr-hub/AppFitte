'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending recipes based on user preferences.
 *
 * The flow takes dietary goals, allergies, preferred flavors, and past recipe interactions as input
 * and returns a list of recommended recipes.
 *
 * @interface AIRecipeRecommendationInput - The input type for the aiRecipeRecommendation function.
 * @interface AIRecipeRecommendationOutput - The output type for the aiRecipeRecommendation function.
 * @function aiRecipeRecommendation - A function that takes AIRecipeRecommendationInput and returns a Promise of AIRecipeRecommendationOutput.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRecipeRecommendationInputSchema = z.object({
  dietaryGoals: z
    .string()
    .describe('The dietary goals of the user (e.g., weight loss, muscle gain).'),
  allergies: z
    .string()
    .describe('Any allergies the user has (e.g., peanuts, gluten).'),
  preferredFlavors: z
    .string()
    .describe('The user’s preferred flavors (e.g., sweet, savory, spicy).'),
  pastRecipeInteractions: z
    .string()
    .describe(
      'A summary of the user’s past interactions with recipes (e.g., liked, disliked, frequently made).'      
    ),
});

export type AIRecipeRecommendationInput = z.infer<
  typeof AIRecipeRecommendationInputSchema
>;

const AIRecipeRecommendationOutputSchema = z.object({
  recommendedRecipes: z
    .string()
    .describe('A list of recommended recipes based on the user’s preferences.'),
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
  prompt: `You are an AI recipe recommendation engine. Given the following user preferences, recommend a list of recipes:

Dietary Goals: {{{dietaryGoals}}}
Allergies: {{{allergies}}}
Preferred Flavors: {{{preferredFlavors}}}
Past Recipe Interactions: {{{pastRecipeInteractions}}}

Recommend recipes that are tailored to the user’s individual needs and preferences.`,
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
