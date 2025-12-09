'use server';
/**
 * @fileOverview A Genkit flow for converting text to speech.
 *
 * This file defines a flow that takes a string of text and returns a
 * base64-encoded WAV audio file as a data URI. It uses the Gemini 2.5 Flash TTS model.
 * The flow includes a utility function to convert the raw PCM audio output from the
 * model into the WAV format, which is required for browser playback.
 */

import {ai} from '@/ai/genkit-config';
import {z} from 'zod';
import wav from 'wav';
import {googleAI} from '@genkit-ai/google-genai';

const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
});

const TextToSpeechOutputSchema = z.object({
  audio: z
    .string()
    .describe(
      "The generated audio as a data URI in WAV format. Example: 'data:audio/wav;base64,...'"
    ),
});

export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

/**
 * Converts raw PCM audio data to a base64-encoded WAV string.
 * @param pcmData The raw audio buffer from the AI model.
 * @returns A promise that resolves to the base64-encoded WAV string.
 */
async function toWav(pcmData: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels: 1,
      sampleRate: 24000,
      bitDepth: 16,
    });

    const chunks: Buffer[] = [];
    writer.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(chunks).toString('base64'));
    });
    writer.on('error', reject);

    writer.write(pcmData);
    writer.end();
  });
}

const textToSpeechFlowRunner = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async ({text}) => {
    const {media} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'},
          },
        },
      },
      prompt: text,
    });

    if (!media?.url) {
      throw new Error('AI did not return audio data.');
    }

    // The data URI is base64-encoded PCM, which needs to be converted to WAV
    const pcmBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await toWav(pcmBuffer);

    return {
      audio: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);

export async function textToSpeech(
  input: TextToSpeechInput
): Promise<TextToSpeechOutput> {
  return textToSpeechFlowRunner(input);
}
