
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
    // Se o timer está sendo retomado, use o tempo que já restava.
    // Se está começando do zero, use a duração total.
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
  
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-sm mx-auto text-white">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full" viewBox="0 0 100 100" transform="rotate(-90)">
          {/* Background Circle */}
          <circle
            className="text-gray-700/50 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
          ></circle>
          {/* Progress Circle */}
          <circle
            className="text-primary stroke-current"
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            strokeDasharray="282.74" // 2 * PI * 45
            strokeDashoffset={282.74 - (progress / 100) * 282.74}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          ></circle>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isFinished ? (
                 <span className="text-3xl font-bold text-primary animate-pulse">Pronto!</span>
            ) : (
                <div className="text-center">
                  <span className="text-5xl font-bold text-white tabular-nums tracking-tighter">
                      {String(minutes).padStart(2, '0')}:<span className={cn(isActive && "text-primary transition-colors duration-500")}>{String(seconds).padStart(2, '0')}</span>
                  </span>
                  <p className="text-gray-400 text-sm mt-2">Cozinhando</p>
                </div>
            )}
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-4 mt-8 w-full">
        <Button 
          onClick={handleToggle} 
          size="icon" 
          className={cn(
            "h-20 w-20 rounded-full shadow-lg transition-all duration-300",
            isActive ? "bg-primary/20 text-primary hover:bg-primary/30" : "bg-primary text-primary-foreground",
            isFinished && "bg-gray-600 hover:bg-gray-500"
          )}
        >
          {isFinished ? <RotateCcw className="h-8 w-8" /> : isActive ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </Button>
        
        {(!isActive && timeRemaining < durationInSeconds && !isFinished) && (
            <Button 
              onClick={resetTimer} 
              variant="ghost" 
              size="icon" 
              className="h-16 w-16 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white" 
              aria-label="Resetar Cronômetro"
            >
              <RotateCcw className="h-6 w-6"/>
            </Button>
        )}
      </div>
    </div>
  );
}
