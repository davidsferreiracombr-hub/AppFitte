
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function FloatingBackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="default"
      size="icon"
      className="fixed bottom-6 right-4 z-50 h-14 w-14 rounded-full shadow-lg"
      aria-label="Voltar para a página anterior"
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  );
}
