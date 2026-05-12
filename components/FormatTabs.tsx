'use client'

import type { ContentFormat } from '@/types'
import { cn } from '@/lib/utils'

const FORMATS: {
  id: ContentFormat
  label: string
  icon: string
  description: string
}[] = [
  { id: 'blog', label: 'Blog Post', icon: '📝', description: '600–900 words' },
  { id: 'social', label: 'Social', icon: '📱', description: '3 platform captions' },
  { id: 'email', label: 'Email', icon: '✉️', description: 'Marketing copy' },
  { id: 'image', label: 'Image Prompts', icon: '🖼️', description: '3 AI prompts' },
]

interface FormatTabsProps {
  format: ContentFormat
  setFormat: (format: ContentFormat) => void
}

export default function FormatTabs({ format, setFormat }: FormatTabsProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {FORMATS.map((f) => (
        <button
          key={f.id}
          onClick={() => setFormat(f.id)}
          className={cn(
            'p-3 rounded-lg text-left transition-all duration-150 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            format === f.id
              ? 'bg-primary/10 border-primary/30'
              : 'bg-background border-border text-muted-foreground hover:bg-secondary hover:text-foreground',
          )}
        >
          <div className="text-xl mb-1.5">{f.icon}</div>
          <div className={cn('text-sm font-medium', format === f.id ? 'text-primary' : 'text-foreground/80')}>
            {f.label}
          </div>
          <div className={cn('text-xs mt-0.5', format === f.id ? 'text-primary/60' : 'text-muted-foreground')}>
            {f.description}
          </div>
        </button>
      ))}
    </div>
  )
}
