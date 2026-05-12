'use client'

import type { BrandVoice } from '@/types'
import ToneSelector from '@/components/ToneSelector'
import { Button } from '@/components/ui/button'

interface StageVoiceProps {
  voice: BrandVoice
  setVoice: (voice: BrandVoice) => void
  onNext: () => void
  onBack: () => void
}

export default function StageVoice({ voice, setVoice, onNext, onBack }: StageVoiceProps) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-6 w-full">
      <p className="text-sm font-medium text-foreground mb-1">How do you want it to sound?</p>
      <p className="text-xs text-muted-foreground mb-3">Pick a voice that matches your style.</p>
      <ToneSelector voice={voice} setVoice={setVoice} />
      <div className="flex items-center justify-between mt-5">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={onNext}>Review & Generate →</Button>
      </div>
    </div>
  )
}