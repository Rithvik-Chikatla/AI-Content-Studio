import MarkdownRenderer from './MarkdownRenderer'

interface StreamingTextProps {
  text: string
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-5">
      {/* Title skeleton */}
      <div className="h-6 rounded-md bg-muted w-2/3" />
      {/* Paragraph 1 */}
      <div className="space-y-2.5">
        <div className="h-3.5 rounded bg-muted w-full" />
        <div className="h-3.5 rounded bg-muted w-[92%]" />
        <div className="h-3.5 rounded bg-muted w-[96%]" />
        <div className="h-3.5 rounded bg-muted w-[78%]" />
      </div>
      {/* Paragraph 2 */}
      <div className="space-y-2.5">
        <div className="h-3.5 rounded bg-muted w-full" />
        <div className="h-3.5 rounded bg-muted w-[88%]" />
        <div className="h-3.5 rounded bg-muted w-[94%]" />
        <div className="h-3.5 rounded bg-muted w-[60%]" />
      </div>
      {/* Paragraph 3 */}
      <div className="space-y-2.5">
        <div className="h-3.5 rounded bg-muted w-[97%]" />
        <div className="h-3.5 rounded bg-muted w-[85%]" />
        <div className="h-3.5 rounded bg-muted w-[72%]" />
      </div>
      <p className="text-xs text-muted-foreground/70 pt-1">Generating your content…</p>
    </div>
  )
}

export default function StreamingText({ text }: StreamingTextProps) {
  if (!text) return <Skeleton />

  return (
    <div className="relative">
      <MarkdownRenderer content={text} />
      <span
        className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-text-bottom animate-pulse"
        aria-hidden="true"
      />
    </div>
  )
}
