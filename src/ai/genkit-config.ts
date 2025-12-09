import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import next from '@genkit-ai/next';

/**
 * This is the Genkit server-side configuration.
 * It is NOT safe to import this file in client-side code.
 */
export const ai = genkit({
  plugins: [next(), googleAI()],
  // An optional model reference.
  // model: 'googleai/gemini-1.5-flash',
  // Log all traces to the console.
  // logWriter: console.log.bind(console),
});
