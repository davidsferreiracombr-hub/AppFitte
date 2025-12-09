'use server';
/**
 * @fileOverview A Text-to-Speech (TTS) flow using Genkit.
 *
 * This file defines a flow that converts a given text string into speech audio.
 * It uses a specified voice model and returns the audio as a Base64 encoded WAV file.
 *
 * - textToSpeech: The main function to convert text to speech.
 * - TextToSpeechInput: The input type for the textToSpeech function.
 * - TextToSpeechOutput: The return type for the textToSpeech function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';

// Define the schema for the input, which is a simple text string.
const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

// Define the schema for the output, which will be the audio data URI.
const TextToSpeechOutputSchema = z.object({
  audio: z
    .string()
    .describe(
      "The generated audio as a data URI in WAV format (e.g., 'data:audio/wav;base64,...')."
    ),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

/**
 * Converts a PCM audio buffer to a WAV audio buffer encoded in Base64.
 * @param pcmData - The raw PCM audio data.
 * @returns A promise that resolves with the Base64 encoded WAV string.
 */
async function toWav(pcmData: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels: 1,
      sampleRate: 24000,
      bitDepth: 16,
    });

    const buffers: any[] = [];
    writer.on('data', chunk => buffers.push(chunk));
    writer.on('end', () => resolve(Buffer.concat(buffers).toString('base64')));
    writer.on('error', reject);

    writer.write(pcmData);
    writer.end();
  });
}

/**
 * Public function to invoke the text-to-speech flow.
 * @param input - The text to be converted.
 * @returns A promise that resolves to the generated audio data.
 */
export async function textToSpeech(
  input: TextToSpeechInput
): Promise<TextToSpeechOutput> {
  return textToSpeechFlow(input);
}

// Define the Genkit flow for text-to-speech conversion.
const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async ({ text }) => {
    // Generate the audio using the specified TTS model and voice.
    const { media } = await ai.generate({
      model: 'gemini-2.5-flash-preview-tts',
      prompt: text,
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: 'Mira', // A calm, female voice
            },
          },
        },
      },
    });

    if (!media || !media.url) {
      throw new Error('Audio generation failed: no media was returned.');
    }

    // The returned audio is raw PCM in a data URI. We need to extract and convert it.
    const pcmBase64 = media.url.substring(media.url.indexOf(',') + 1);
    const pcmBuffer = Buffer.from(pcmBase64, 'base64');

    // Convert the PCM buffer to a WAV buffer (Base64 encoded).
    const wavBase64 = await toWav(pcmBuffer);

    return {
      audio: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);
