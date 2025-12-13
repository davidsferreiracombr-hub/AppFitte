
'use client';

import { cn } from '@/lib/utils';
import { ThermometerSnowflake, ThermometerSun } from 'lucide-react';

interface SalePriceMeterProps {
  value: number; // Value from 0 to 100
}

export function SalePriceMeter({ value }: SalePriceMeterProps) {
  const percentage = Math.max(0, Math.min(100, value));
  
  // Mapeia o valor para uma cor dentro do gradiente
  // 0 = azul (HSL 221), 50 = amarelo (HSL 60), 100 = vermelho (HSL 0)
  let hue;
  if (percentage <= 50) {
    // Interpola de Azul (221) para Amarelo (60)
    hue = 221 - (percentage / 50) * (221 - 60);
  } else {
    // Interpola de Amarelo (60) para Vermelho (0)
    hue = 60 - ((percentage - 50) / 50) * 60;
  }
  const color = `hsl(${hue}, 80%, 55%)`;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 via-yellow-400 to-red-600 border-2 border-border">
        {/* Indicador */}
        <div 
          className="absolute top-0 h-full w-1 bg-white shadow-lg"
          style={{ left: `${percentage}%` }}
        >
          <div className="absolute -top-1 -left-[5px] h-3 w-3 border-2 border-white bg-inherit rounded-full" style={{ backgroundColor: color }}></div>
           <div className="absolute -bottom-1 -left-[5px] h-3 w-3 border-2 border-white bg-inherit rounded-full" style={{ backgroundColor: color }}></div>
        </div>
      </div>
      <div className="w-full flex justify-between mt-2 text-xs font-semibold text-muted-foreground">
        <div className="flex items-center gap-1">
            <ThermometerSnowflake className="h-3 w-3 text-blue-500" />
            <span>Preço Baixo</span>
        </div>
        <div className="flex items-center gap-1">
            <ThermometerSun className="h-3 w-3 text-red-600" />
            <span>Preço Alto</span>
        </div>
      </div>
    </div>
  );
}
