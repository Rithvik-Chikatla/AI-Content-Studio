'use client'

import type { ContentFormat } from '@/types'
import FormatTabs from '@/components/FormatTabs'
import { Button } from '@/components/ui/button'

interface StageFormatProps {
  format: ContentFormat
  setFormat: (format: ContentFormat) => void
  onNext: () => void
  onBack: () => void
  topic: string
}

export default function StageFormat({ format, setFormat, onNext, onBack, topic }: StageFormatProps) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-6 w-full">
      <div className="mb-4">
        <p className="text-xs text-muted-foreground">Topic</p>
        <p className="text-foreground font-medium line-clamp-2">“{topic}”</p>
      </div>
      <p className="text-sm font-medium text-foreground mb-3">What format do you need?</p>
      <FormatTabs format={format} setFormat={setFormat} />
      <div className="flex items-center justify-between mt-5">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={onNext}>Continue →</Button>
      </div>
    </div>
  )
}