'use client';

import {useState, useRef, useCallback, useEffect} from 'react';
import {generateSpeech} from '@/ai/actions';
import {Button} from './ui/button';
import {Play, Pause, Loader2, Volume2} from 'lucide-react';
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
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const handleAudioEnd = () => setIsPlaying(false);
    audio.addEventListener('ended', handleAudioEnd);

    return () => {
      audio.removeEventListener('ended', handleAudioEnd);
      audio.pause();
    };
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

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (audio.src && !isPlaying) {
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
          'Não foi possível gerar a narração da receita. Tente novamente mais tarde.',
      });
      setAudioSrc(null);
      setIsPlaying(false);
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
