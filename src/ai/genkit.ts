import {genkit} from 'genkit';
import next from '@genkit-ai/next';

/**
 * This is the Genkit client library.
 * It is safe to import this file in client-side code.
 */
export const ai = genkit({
  plugins: [next()],
});
