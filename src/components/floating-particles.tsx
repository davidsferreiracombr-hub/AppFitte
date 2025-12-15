
'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Helper function to generate a random value within a range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const numParticles = isMobile ? 15 : 30; // Fewer particles on mobile
    const newParticles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        id: i,
        left: `${random(0, 100)}%`,
        top: `${random(0, 100)}%`,
        size: random(1, 4),
        animationDuration: `${random(20, 40)}s`,
        animationDelay: `${random(0, 20)}s`,
        opacity: random(0.1, 0.5),
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/50 animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
