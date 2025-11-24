"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TimerIcon } from 'lucide-react';

interface TimerProps {
  durationInMinutes: number;
  context: string;
}

export function Timer({ durationInMinutes, context }: TimerProps) {
  const durationInSeconds = durationInMinutes * 60;
  
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);

  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
        audioRef.current = new Audio('https://media.jpk.superfastech.com/notification/notification_1.mp3');
    }
  }, []);

  const playFinishSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Erro ao tocar o som de notificação:", e));
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isActive && !isFinished) {
      timerIdRef.current = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerIdRef.current!);
            setIsActive(false);
            setIsFinished(true);
            playFinishSound();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      stopTimer();
    }

    return () => {
      stopTimer();
    };
  }, [isActive, isFinished, stopTimer, playFinishSound]);

  const startTimer = () => {
    if (isFinished) {
        resetTimer();
    }
    setIsActive(prev => !prev);
  };

  const resetTimer = useCallback(() => {
    stopTimer();
    setIsActive(false);
    setIsFinished(false);
    setTimeRemaining(durationInSeconds);
  }, [durationInSeconds, stopTimer]);

  useEffect(() => {
    resetTimer();
  }, [durationInMinutes, resetTimer]);

  const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, '0');
  const seconds = String(timeRemaining % 60).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div className="flex items-center justify-center gap-2 text-primary mb-4">
        <TimerIcon className="h-5 w-5" />
        <p className="text-base font-semibold">{context}</p>
      </div>
      
      <div className="text-center my-2">
        <div className="font-mono tabular-nums text-foreground">
          <span className="text-7xl sm:text-8xl font-bold tracking-tighter">
              {minutes}{seconds}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 w-full mt-4">
        <Button 
          onClick={startTimer} 
          className={cn(
            "w-full py-3 text-base font-semibold rounded-lg transition-all duration-300",
             isActive ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
        >
          {isFinished ? 'De novo!' : isActive ? 'Pausar' : (timeRemaining < durationInSeconds ? 'Continuar' : 'Começar')}
        </Button>
        
        <Button 
          onClick={resetTimer}
          variant="outline" 
          className="w-full py-3 text-base font-semibold rounded-lg" 
          aria-label="Cancelar Cronômetro"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
