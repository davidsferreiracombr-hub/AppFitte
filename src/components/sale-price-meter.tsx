
'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface SalePriceMeterProps {
  value: number; // Value from 0 to 100
  onValueChange: (newValue: number) => void;
}

export function SalePriceMeter({ value, onValueChange }: SalePriceMeterProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const percentage = Math.max(0, Math.min(100, value));
  
  let hue;
  if (percentage <= 50) {
    hue = 221 - (percentage / 50) * (221 - 60);
  } else {
    hue = 60 - ((percentage - 50) / 50) * 60;
  }
  const color = `hsl(${hue}, 80%, 55%)`;

  const minPrice = 1;
  const maxPrice = 25;
  const currentPrice = minPrice + (percentage / 100) * (maxPrice - minPrice);

  const handleInteraction = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const newPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    onValueChange(newPercentage);
  };
  
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-2">
        <span className="text-2xl font-bold text-foreground" style={{color: color}}>R$ {currentPrice.toFixed(2).replace('.', ',')}</span>
        <p className="text-xs text-muted-foreground">Preço de Venda Sugerido (Unidade)</p>
      </div>
      <div 
        ref={barRef}
        className="relative w-full h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 via-yellow-400 to-red-600 border-2 border-border cursor-pointer"
        onClick={handleInteraction}
        onMouseDown={(e) => {
            const onMouseMove = (moveEvent: MouseEvent) => handleInteraction(moveEvent as any);
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            e.preventDefault();
        }}
        onTouchMove={handleInteraction}
      >
        <div 
          className="absolute top-0 h-full w-1 bg-white shadow-lg pointer-events-none"
          style={{ left: `${percentage}%` }}
        >
          <div className="absolute -top-1 -left-[5px] h-3 w-3 border-2 border-white bg-inherit rounded-full" style={{ backgroundColor: color }}></div>
           <div className="absolute -bottom-1 -left-[5px] h-3 w-3 border-2 border-white bg-inherit rounded-full" style={{ backgroundColor: color }}></div>
        </div>
      </div>
      <div className="w-full flex justify-between mt-2 text-xs font-semibold text-muted-foreground">
        <div className="flex flex-col items-start gap-1">
            <span className="font-bold text-blue-500">R$ {minPrice.toFixed(2).replace('.', ',')}</span>
            <span className='text-xs'>Preço Baixo</span>
        </div>
        <div className="flex flex-col items-end gap-1">
            <span className="font-bold text-red-600">R$ {maxPrice.toFixed(2).replace('.', ',')}</span>
            <span className='text-xs'>Preço Alto</span>
        </div>
      </div>
    </div>
  );
}
