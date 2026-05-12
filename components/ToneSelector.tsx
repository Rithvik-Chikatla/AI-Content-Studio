'use client'

import type { BrandVoice } from '@/types'
import { cn } from '@/lib/utils'

const VOICES: {
  id: BrandVoice
  label: string
  description: string
  emoji: string
}[] = [
  { id: 'professional', label: 'Professional', description: 'Authoritative & clear', emoji: '💼' },
  { id: 'casual', label: 'Casual', description: 'Friendly & approachable', emoji: '😊' },
  { id: 'bold', label: 'Bold', description: 'Punchy & direct', emoji: '🔥' },
]

interface ToneSelectorProps {
  voice: BrandVoice
  setVoice: (voice: BrandVoice) => void
}

export default function ToneSelector({ voice, setVoice }: ToneSelectorProps) {
  return (
    <div className="flex gap-2">
      {VOICES.map((v) => (
        <button
          key={v.id}
          onClick={() => setVoice(v.id)}
          className={cn(
            'flex-1 py-2.5 px-3 rounded-lg text-sm transition-all duration-150 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            voice === v.id
              ? 'bg-primary/10 border-primary/30'
              : 'bg-background border-border text-muted-foreground hover:bg-secondary hover:text-foreground',
          )}
        >
          <div className="text-base mb-1">{v.emoji}</div>
          <div className={cn('font-medium', voice === v.id ? 'text-primary' : 'text-foreground/80')}>
            {v.label}
          </div>
          <div className={cn('text-xs mt-0.5', voice === v.id ? 'text-primary/60' : 'text-muted-foreground')}>
            {v.description}
          </div>
        </button>
      ))}
    </div>
  )
}
