'use client';

import React, { useState, useRef } from 'react';
import { textToSpeech, TextToSpeechInput } from '@/ai/flows/text-to-speech-flow';
import { Button } from '@/components/ui/button';
import { Play, Pause, Loader2, StopCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface RecipeAudioPlayerProps {
  recipeText: string;
}

export function RecipeAudioPlayer({ recipeText }: RecipeAudioPlayerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handlePlayPause = async () => {
    // If audio is already loaded and just paused, play it.
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    // If audio is currently playing, pause it.
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // If no audio is loaded, generate and play it.
    setIsLoading(true);
    try {
      const input: TextToSpeechInput = { text: recipeText };
      const response = await textToSpeech(input);
      
      if (response && response.audio) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        
        const audio = new Audio(response.audio);
        audioRef.current = audio;

        audio.play();
        setIsPlaying(true);
        
        audio.onended = () => {
          setIsPlaying(false);
          audioRef.current = null; // Clear ref when finished
        };
      } else {
        throw new Error('A resposta da IA não contém áudio.');
      }
    } catch (error) {
      console.error("Erro ao gerar áudio:", error);
      toast({
        variant: "destructive",
        title: "Erro ao Tocar Áudio",
        description: "Não foi possível gerar a narração da receita. Tente novamente mais tarde.",
      });
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to the beginning
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsLoading(false);
  };

  const showStopButton = isPlaying || (audioRef.current && audioRef.current.currentTime > 0);

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={handlePlayPause}
        variant="outline"
        size="lg"
        className="flex-1 rounded-full text-base font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="mr-2 h-5 w-5" />
        ) : (
          <Play className="mr-2 h-5 w-5" />
        )}
        {isLoading ? 'Gerando...' : isPlaying ? 'Pausar' : 'Ouvir a Receita'}
      </Button>

      {showStopButton && (
        <Button
          onClick={handleStop}
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Parar áudio"
        >
          <StopCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
