"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  durationInMinutes: number;
}

export function Timer({ durationInMinutes }: TimerProps) {
  const durationInSeconds = durationInMinutes * 60;
  const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Carregar o áudio apenas no cliente
    setAudio(new Audio('https://media.jpk.superfastech.com/notification/notification_1.mp3'));
  }, []);

  const toggleTimer = () => {
    if (isFinished) {
      resetTimer();
    } else {
      setIsActive(!isActive);
    }
  };

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsFinished(false);
    setTimeRemaining(durationInSeconds);
  }, [durationInSeconds]);

  useEffect(() => {
    resetTimer();
  }, [durationInMinutes, resetTimer]);
  

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      if (audio) {
        audio.play().catch(e => console.error("Erro ao tocar o som de notificação:", e));
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeRemaining, audio]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const getButtonLabel = () => {
    if (isFinished) return "Recomeçar Cronômetro";
    if (isActive) return "Pausar Cronômetro";
    return "Começar Cronômetro";
  };
  
  const getButtonIcon = () => {
      if (isFinished) return <RotateCcw />;
      if (isActive) return <Pause />;
      return <Play />;
  }

  const progress = (timeRemaining / durationInSeconds) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md border w-full max-w-sm mx-auto">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="42"
            fill="transparent"
          ></circle>
          {/* Progress circle */}
          <circle
            className="text-primary stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="42"
            fill="transparent"
            strokeDasharray="264"
            strokeDashoffset={264 - (progress / 100) * 264}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          ></circle>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isFinished ? (
                 <span className="text-2xl font-bold text-primary">Pronto!</span>
            ) : (
                <span className="text-5xl font-bold text-gray-800 tabular-nums">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
            )}
        </div>
      </div>
      
      <div className="flex items-center gap-4 mt-6">
        <Button onClick={toggleTimer} size="lg" className="min-w-[240px]">
          {getButtonIcon()}
          {getButtonLabel()}
        </Button>
        {!isActive && !isFinished && timeRemaining < durationInSeconds && (
            <Button onClick={resetTimer} variant="outline" size="icon" aria-label="Resetar Cronômetro">
              <RotateCcw className="h-5 w-5"/>
            </Button>
        )}
      </div>
    </div>
  );
}
