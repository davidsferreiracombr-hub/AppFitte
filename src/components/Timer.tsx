
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    if (!audioRef.current && typeof window !== 'undefined') {
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
    
    const startTime = Date.now();
    const remaining = (endTimeRef.current && timeRemaining < durationInSeconds) ? timeRemaining : durationInSeconds;
    endTimeRef.current = startTime + remaining * 1000;
    
    const tick = () => {
      if (endTimeRef.current) {
        const remainingSeconds = Math.round((endTimeRef.current - Date.now()) / 1000);
        if (remainingSeconds <= 0) {
          setTimeRemaining(0);
          setIsFinished(true);
          setIsActive(false);
          stopTimer();
          playFinishSound();
        } else {
          setTimeRemaining(remainingSeconds);
        }
      }
    };
    
    stopTimer(); 
    timerIdRef.current = setInterval(tick, 1000);
    tick();
  }, [timeRemaining, durationInSeconds, stopTimer, playFinishSound]);

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
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isActive && endTimeRef.current) {
         const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);
         if (remaining > 0) {
           setTimeRemaining(remaining);
         } else {
           setTimeRemaining(0);
           setIsFinished(true);
           setIsActive(false);
           stopTimer();
         }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopTimer();
    };
  }, [isActive, stopTimer]);

  const handleToggle = () => {
    if (isFinished) {
      resetTimer();
    } else if (isActive) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-sm mx-auto text-white">
      <div className="text-center mb-8">
        {isFinished ? (
           <span className="text-5xl font-bold text-primary animate-pulse">Pronto!</span>
        ) : (
            <div className="flex items-end justify-center font-mono" style={{fontVariantNumeric: 'tabular-nums'}}>
                {hours > 0 && (
                    <>
                        <span className="text-6xl font-bold text-white tracking-tighter">{String(hours).padStart(2, '0')}</span>
                        <span className="text-2xl font-medium text-gray-400 ml-1 mr-3">h</span>
                    </>
                )}
                <span className={cn("text-6xl font-bold tracking-tighter", isActive ? "text-primary" : "text-white")}>
                    {String(minutes).padStart(2, '0')}
                </span>
                <span className="text-2xl font-medium text-gray-400 ml-1 mr-3">m</span>
                <span className="text-6xl font-bold text-white tracking-tighter">
                    {String(seconds).padStart(2, '0')}
                </span>
                <span className="text-2xl font-medium text-gray-400 ml-1">s</span>
            </div>
        )}
      </div>
      
      <div className="flex items-center justify-center gap-4 w-full">
        <Button 
          onClick={handleToggle} 
          className={cn(
            "w-32 py-3 text-base font-semibold rounded-lg transition-all duration-300",
            isActive ? "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30" : "bg-primary text-primary-foreground",
            isFinished && "bg-gray-600 hover:bg-gray-500"
          )}
        >
          {isFinished ? 'Recomeçar' : isActive ? 'Pausar' : 'Começar'}
        </Button>
        
        {(!isActive && timeRemaining < durationInSeconds && !isFinished) && (
            <Button 
              onClick={resetTimer} 
              variant="ghost" 
              className="w-32 py-3 text-base font-semibold rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white" 
              aria-label="Resetar Cronômetro"
            >
              Resetar
            </Button>
        )}
      </div>
    </div>
  );
}
