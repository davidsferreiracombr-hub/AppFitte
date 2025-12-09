'use server';

import {
  textToSpeech,
  type TextToSpeechInput,
  type TextToSpeechOutput,
} from './flows/text-to-speech-flow';

/**
 * Server Action to generate speech from text.
 * This acts as a safe bridge between client components and server-side AI flows.
 * @param input The text to be converted to speech.
 * @returns A promise that resolves to the audio data URI.
 */
export async function generateSpeech(
  input: TextToSpeechInput
): Promise<TextToSpeechOutput> {
  return textToSpeech(input);
}
