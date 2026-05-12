'use client'

import { FREE_MODELS } from '@/lib/ai'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ModelSelectorProps {
  model: string
  setModel: (model: string) => void
}

export default function ModelSelector({ model, setModel }: ModelSelectorProps) {
  return (
    <Select value={model} onValueChange={setModel}>
      <SelectTrigger className="h-9 text-sm border-border bg-background">
        <span className="mr-1.5 text-muted-foreground text-xs">Model:</span>
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {FREE_MODELS.map((m) => (
          <SelectItem key={m.id} value={m.id}>
            {m.name}
            <span className="ml-2 text-xs text-muted-foreground">free</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
