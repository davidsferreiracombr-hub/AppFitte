
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  durationInMinutes: number;
}

export function Timer({ durationInMinutes }: TimerProps) {
  const durationInSeconds = durationInMinutes * 60;
  
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);

  const endTimeRef = useRef<number | null>(null);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Carregar o áudio apenas no cliente
    if (!audioRef.current) {
        audioRef.current = new Audio('https://media.jpk.superfastech.com/notification/notification_1.mp3');
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, []);

  const playFinishSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Erro ao tocar o som de notificação:", e));
    }
  }, []);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setIsFinished(false);
    
    // Se for um "resume", use o tempo restante. Senão, comece do zero.
    const startTime = Date.now();
    endTimeRef.current = startTime + timeRemaining * 1000;
    
    const tick = () => {
      if (endTimeRef.current) {
        const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);
        if (remaining <= 0) {
          setTimeRemaining(0);
          setIsFinished(true);
          setIsActive(false);
          stopTimer();
          playFinishSound();
        } else {
          setTimeRemaining(remaining);
        }
      }
    };
    
    stopTimer(); // Limpa qualquer timer anterior
    timerIdRef.current = setInterval(tick, 1000);
  }, [timeRemaining, stopTimer, playFinishSound]);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
    stopTimer();
  }, [stopTimer]);

  const resetTimer = useCallback(() => {
    stopTimer();
    setIsActive(false);
    setIsFinished(false);
    setTimeRemaining(durationInSeconds);
    endTimeRef.current = null;
  }, [durationInSeconds, stopTimer]);

  useEffect(() => {
    resetTimer();
  }, [durationInMinutes, resetTimer]);
  
  // Efeito para lidar com a visibilidade da página
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isActive && endTimeRef.current) {
         const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);
         if (remaining > 0) {
           setTimeRemaining(remaining);
         } else {
           // O tempo acabou enquanto a aba estava inativa
           setTimeRemaining(0);
           setIsFinished(true);
           setIsActive(false);
           stopTimer();
           // Não podemos tocar som automaticamente em todos os navegadores,
           // mas o estado visual estará correto.
         }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive, stopTimer]);


  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const progress = (timeRemaining / durationInSeconds) * 100;
  
  const handleToggle = () => {
    if (isFinished) {
      resetTimer();
    } else if (isActive) {
      pauseTimer();
    } else {
      startTimer();
    }
  };
  
  const getButtonIcon = () => {
      if (isFinished) return <RotateCcw className="h-8 w-8" />;
      if (isActive) return <Pause className="h-8 w-8" />;
      return <Play className="h-8 w-8" />;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg border w-full max-w-sm mx-auto">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
          ></circle>
          <circle
            className="text-primary stroke-current"
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            strokeDasharray="283"
            strokeDashoffset={283 - (progress / 100) * 283}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
          ></circle>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isFinished ? (
                 <span className="text-4xl font-bold text-primary animate-pulse">Pronto!</span>
            ) : (
                <span className="text-6xl font-bold text-gray-800 tabular-nums tracking-tighter">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
            )}
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-4 mt-8 w-full">
        <Button onClick={handleToggle} size="icon" className="h-20 w-20 rounded-full shadow-lg">
          {getButtonIcon()}
        </Button>
        {(!isActive && timeRemaining < durationInSeconds && !isFinished) && (
            <Button onClick={resetTimer} variant="outline" size="icon" className="h-16 w-16 rounded-full" aria-label="Resetar Cronômetro">
              <RotateCcw className="h-6 w-6"/>
            </Button>
        )}
      </div>
    </div>
  );
}
