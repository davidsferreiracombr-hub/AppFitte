"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimerProps {
  durationInMinutes: number;
}

export function Timer({ durationInMinutes }: TimerProps) {
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

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card rounded-2xl shadow-sm border w-full max-w-sm mx-auto">
      <div className="text-center my-4">
        <div className="flex items-baseline justify-center font-mono tabular-nums text-foreground">
          <span className="text-8xl font-bold tracking-tighter">
              {String(minutes).padStart(2, '0')}
          </span>
          <span className="text-8xl font-bold tracking-tighter pb-2">:</span>
          <span className="text-8xl font-bold tracking-tighter">
              {String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 w-full mt-4">
        <Button 
          onClick={startTimer} 
          className={cn(
            "w-32 py-3 text-base font-semibold rounded-lg transition-all duration-300",
             isActive ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
          )}
        >
          {isFinished ? 'De novo!' : isActive ? 'Pausar' : (timeRemaining < durationInSeconds ? 'Continuar' : 'Começar')}
        </Button>
        
        <Button 
          onClick={resetTimer}
          variant="secondary" 
          className="w-32 py-3 text-base font-semibold rounded-lg" 
          aria-label="Cancelar Cronômetro"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
