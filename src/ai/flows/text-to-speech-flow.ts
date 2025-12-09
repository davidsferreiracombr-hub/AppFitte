'use server';

/**
 * @fileOverview This file provides a text-to-speech service using Genkit.
 * - textToSpeech: A function that converts a given string of text into an audio data URI.
 * - TextToSpeechInput: The input type for the textToSpeech function.
 * - TextToSpeechOutput: The return type for the textToSpeech function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

// Define Zod schemas for input and output, but do not export them.
const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
});

const TextToSpeechOutputSchema = z.object({
  audio: z
    .string()
    .describe(
      "The generated audio as a data URI. Expected format: 'data:audio/wav;base64,<encoded_data>'"
    ),
});

// Export TypeScript types inferred from the schemas.
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

/**
 * Converts PCM audio data to WAV format and returns it as a Base64 string.
 * The sample rate is crucial and must match the output of the TTS model.
 */
async function toWav(
  pcmData: Buffer,
  channels = 1,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: 24000, // Correct sample rate for gemini-2.5-flash-preview-tts
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d: Buffer) => {
      bufs.push(d);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

// Define the Genkit flow for text-to-speech conversion.
const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async ({ text }) => {
    const { media } = await ai.generate({
      model: 'gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Mira' }, // Using a compatible voice
          },
        },
      },
      prompt: text,
    });

    if (!media || !media.url) {
      throw new Error('No audio media was returned from the AI model.');
    }

    // The audio data is Base64 encoded inside the data URI.
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    // Convert the raw PCM audio buffer to WAV format.
    const wavBase64 = await toWav(audioBuffer);

    return {
      audio: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);

// Export an async wrapper function to be used as the Server Action.
export async function textToSpeech(
  input: TextToSpeechInput
): Promise<TextToSpeechOutput> {
  return textToSpeechFlow(input);
}
