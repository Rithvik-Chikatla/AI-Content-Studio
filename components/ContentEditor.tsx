'use client'

import { useEffect, useRef, useState } from 'react'
import StreamingText from './StreamingText'
import MarkdownRenderer from './MarkdownRenderer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ContentEditorProps {
  completion: string
  isLoading: boolean
  editedContent: string
  setEditedContent: (content: string) => void
  onRegenerate: () => void
  onStop: () => void
  onStartOver: () => void
}

export default function ContentEditor({
  completion,
  isLoading,
  editedContent,
  setEditedContent,
  onRegenerate,
  onStop,
  onStartOver,
}: ContentEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const markdownRef = useRef<HTMLDivElement>(null)
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')
  const [isEditing, setIsEditing] = useState(false)

  // When switching to edit mode, pre-size the textarea to match the rendered markdown height
  const handleToggleEdit = () => {
    if (!isEditing && markdownRef.current && textareaRef.current) {
      const h = markdownRef.current.offsetHeight
      textareaRef.current.style.height = `${h}px`
    }
    setIsEditing((v) => !v)
  }

  // Auto-resize textarea when content changes or edit mode is toggled
  useEffect(() => {
    if (textareaRef.current && !isLoading && isEditing) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [editedContent, isLoading, isEditing])

  // Copy always uses raw markdown text
  const handleCopy = async () => {
    const text = editedContent || completion
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopyState('copied')
    setTimeout(() => setCopyState('idle'), 2000)
  }

  const wordCount = (editedContent || completion)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  const hasContent = isLoading ? completion.length > 0 : editedContent.length > 0

  // Empty state
  if (!isLoading && !editedContent && !completion) {
    return (
      <div className="border border-dashed border-border rounded-2xl p-14 text-center space-y-2 bg-card">
        <div className="text-4xl opacity-20">✦</div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your generated content will appear here.
        </p>
        <p className="text-muted-foreground/50 text-xs">Choose a format, enter a topic, and hit Generate</p>
      </div>
    )
  }

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/40">
        <div className="flex items-center gap-3">
          {isLoading ? (
            <span className="flex items-center gap-2 text-xs text-primary font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Generating…
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <Button onClick={onStop} variant="destructive" size="sm" className="h-7 text-xs px-3">
              ⏹ Stop
            </Button>
          ) : hasContent ? (
            <>
              <Button onClick={handleCopy} variant="outline" size="sm" className="h-7 text-xs px-3">
                {copyState === 'copied' ? '✓ Copied!' : '⎘ Copy'}
              </Button>
              <Button onClick={onRegenerate} variant="outline" size="sm" className="h-7 text-xs px-3">
                ↺ Regenerate
              </Button>
              <Button
                onClick={handleToggleEdit}
                variant="outline"
                size="sm"
                className="h-7 text-xs px-3"
              >
                {isEditing ? '👁 Preview' : '✏️ Edit'}
              </Button>
            </>
          ) : null}
        </div>
      </div>

      {/* Content area */}
      <div className="p-6 min-h-[240px]">
        {isLoading ? (
          <StreamingText text={completion} />
        ) : isEditing ? (
          <Textarea
            ref={textareaRef}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="border-0 shadow-none resize-none outline-none font-mono min-h-[200px] p-0 focus-visible:ring-0 text-sm leading-relaxed bg-transparent"
            placeholder="Your content will appear here…"
            spellCheck
          />
        ) : (
          <div ref={markdownRef}>
            <MarkdownRenderer content={editedContent} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-border bg-muted/20 flex items-center justify-between">
        {!isLoading && editedContent ? (
          <p className="text-xs text-muted-foreground">
            {isEditing ? '✏️ Editing raw markdown — switch to Preview to see it rendered' : '📋 Copy always copies raw markdown'}
          </p>
        ) : (
          <span />
        )}
        <Button variant="ghost" size="sm" onClick={onStartOver} className="h-7 text-xs text-muted-foreground">
          ← Start Over
        </Button>
      </div>
    </div>
  )
}

