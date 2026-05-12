'use client'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface StageTopicProps {
  topic: string
  setTopic: (topic: string) => void
  onNext: () => void
  isOverLimit: boolean
  topicLength: number
}

export default function StageTopic({ topic, setTopic, onNext, isOverLimit, topicLength }: StageTopicProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      if (topic.trim().length >= 3 && !isOverLimit) onNext()
    }
  }

  return (
    <div className="w-full">
      <div className="bg-card border border-border rounded-2xl shadow-sm p-6 w-full">
        <label htmlFor="topic-input" className="text-sm font-medium text-foreground mb-2 block">
          What do you want to write about?
        </label>
        <Textarea
          id="topic-input"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. The future of AI in healthcare, productivity tips for remote workers…"
          rows={4}
          maxLength={510}
          className="resize-none text-base focus-visible:ring-1 bg-background placeholder:text-muted-foreground/50"
        />
        <div className="flex items-center justify-between mt-3">
          <span className={cn('text-xs tabular-nums', isOverLimit ? 'text-destructive' : 'text-muted-foreground/60')}>
            {topicLength}/500
          </span>
          <Button onClick={onNext} disabled={topic.trim().length < 3 || isOverLimit}>
            Continue →
          </Button>
        </div>
      </div>
    </div>
  )
}
