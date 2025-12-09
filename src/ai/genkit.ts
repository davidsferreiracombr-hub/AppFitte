'use client';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import next from '@genkit-ai/next';

export const ai = genkit({
  plugins: [next(), googleAI()],
  // An optional model reference.
  // model: 'googleai/gemini-1.5-flash',
  // Log all traces to the console.
  // logWriter: console.log.bind(console),
});
