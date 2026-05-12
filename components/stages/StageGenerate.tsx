'use client'

import ModelSelector from '@/components/ModelSelector'
import { Button } from '@/components/ui/button'
import type { BrandVoice, ContentFormat } from '@/types'

interface StageGenerateProps {
  topic: string
  format: ContentFormat
  voice: BrandVoice
  model: string
  setModel: (model: string) => void
  onGenerate: () => void
  onBack: () => void
  isLoading: boolean
}

const formatLabels: Record<ContentFormat, string> = {
  blog: 'Blog Post',
  social: 'Social Media',
  email: 'Email',
  image: 'Image Prompt',
}

const voiceLabels: Record<BrandVoice, string> = {
  professional: 'Professional',
  casual: 'Casual',
  bold: 'Bold',
}

export default function StageGenerate({
  topic,
  format,
  voice,
  model,
  setModel,
  onGenerate,
  onBack,
  isLoading,
}: StageGenerateProps) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-6 w-full">
      <p className="text-sm font-medium text-foreground mb-4">Review your choices</p>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-start">
          <span className="text-muted-foreground">Topic:</span>
          <span className="text-right font-medium text-foreground ml-4">“{topic}”</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Format:</span>
          <span className="font-medium text-foreground">{formatLabels[format]}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Voice:</span>
          <span className="font-medium text-foreground">{voiceLabels[voice]}</span>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-border">
        <ModelSelector model={model} setModel={setModel} />
      </div>

      <div className="flex items-center justify-between mt-5">
        <Button variant="ghost" onClick={onBack} disabled={isLoading}>
          ← Back
        </Button>
        <Button onClick={onGenerate} disabled={isLoading} className="w-36">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating…
            </span>
          ) : (
            'Generate'
          )}
        </Button>
      </div>
    </div>
  )
}