'use client';

import {useState, useRef, useCallback, useEffect} from 'react';
import {generateSpeech} from '@/ai/actions';
import {Button} from './ui/button';
import {Play, Pause, Loader2} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';

interface RecipeAudioPlayerProps {
  textToRead: string;
}

export function RecipeAudioPlayer({textToRead}: RecipeAudioPlayerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {toast} = useToast();

  useEffect(() => {
    // Inicializa o elemento de áudio apenas uma vez
    if (!audioRef.current) {
      audioRef.current = new Audio();
      const audio = audioRef.current;

      const handleAudioEnd = () => setIsPlaying(false);
      audio.addEventListener('ended', handleAudioEnd);

      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
        audio.pause();
      };
    }
  }, []);

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error('Error playing audio:', err);
          toast({
            variant: 'destructive',
            title: 'Erro de Áudio',
            description: 'Não foi possível reproduzir o áudio.',
          });
          setIsPlaying(false);
        });
    }
  }, [audioSrc, toast]);

  const handlePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Se estiver tocando, pausa.
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    // Se já tiver áudio carregado e estiver pausado, apenas toca.
    if (audio.src && audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error resuming audio:', error);
        toast({
          variant: 'destructive',
          title: 'Erro de Áudio',
          description: 'Não foi possível continuar a reprodução.',
        });
      }
      return;
    }

    // Se não tem áudio, gera um novo.
    setIsLoading(true);
    try {
      const response = await generateSpeech({text: textToRead});
      if (response?.audio) {
        setAudioSrc(response.audio);
      } else {
        throw new Error('A resposta da IA não continha áudio.');
      }
    } catch (error) {
      console.error('Erro ao gerar áudio:', error);
      toast({
        variant: 'destructive',
        title: 'Erro de Áudio',
        description:
          'Não foi possível gerar a narração. Tente novamente mais tarde.',
      });
      setAudioSrc(null);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, textToRead, toast, audioSrc]);

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={handlePlayPause}
        size="lg"
        className="w-full justify-center gap-3 transition-all duration-300 h-14 text-lg font-bold rounded-2xl"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-semibold">Gerando...</span>
          </>
        ) : isPlaying ? (
          <>
            <Pause className="h-6 w-6" />
            <span className="font-extrabold text-xl">Fitte</span>
          </>
        ) : (
          <>
            <Play className="h-6 w-6" />
            <span className="font-extrabold text-xl">Fitte</span>
          </>
        )}
      </Button>
    </div>
  );
}
