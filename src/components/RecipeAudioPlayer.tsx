'use client';

import { useState, useRef, useCallback } from 'react';
import { textToSpeech } from '@/ai/flows/text-to-speech-flow';
import { Button } from './ui/button';
import { Play, Pause, Loader2, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface RecipeAudioPlayerProps {
  textToRead: string;
}

export function RecipeAudioPlayer({ textToRead }: RecipeAudioPlayerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handlePlayPause = useCallback(async () => {
    // If audio is already loaded and just paused, play it
    if (audioRef.current && !isPlaying && audioRef.current.src) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    // If audio is playing, pause it
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // If no audio is loaded, generate and play it
    setIsLoading(true);
    try {
      const response = await textToSpeech({ text: textToRead });
      if (response && response.audio) {
        if (!audioRef.current) {
          const audio = new Audio(response.audio);
          audioRef.current = audio;
          
          audio.onended = () => {
            setIsPlaying(false);
          };
        } else {
            audioRef.current.src = response.audio;
        }

        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        throw new Error('A resposta da IA não continha áudio.');
      }
    } catch (error) {
      console.error('Erro ao gerar áudio:', error);
      toast({
        variant: 'destructive',
        title: 'Erro de Áudio',
        description:
          'Não foi possível gerar a narração da receita. Tente novamente mais tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, textToRead, toast]);

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={handlePlayPause}
        variant="outline"
        size="lg"
        className="w-full justify-center gap-3 transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Gerando Áudio...</span>
          </>
        ) : isPlaying ? (
          <>
            <Pause className="h-5 w-5" />
            <span>Pausar</span>
          </>
        ) : (
          <>
            <Volume2 className="h-5 w-5" />
            <span>Ouvir a Receita</span>
          </>
        )}
      </Button>
    </div>
  );
}
