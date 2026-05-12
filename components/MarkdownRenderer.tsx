'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold text-foreground mt-6 mb-3 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-semibold text-foreground mt-5 mb-2.5">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-semibold text-foreground mt-4 mb-2">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-sm leading-7 text-foreground mb-4 last:mb-0">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-outside ml-5 mb-4 space-y-1.5 text-sm text-foreground">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside ml-5 mb-4 space-y-1.5 text-sm text-foreground">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-7">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary/40 pl-4 my-4 italic text-muted-foreground text-sm">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes('language-')
          if (isBlock) {
            return (
              <code className="block bg-muted rounded-lg px-4 py-3 text-xs font-mono overflow-x-auto my-3 text-foreground">
                {children}
              </code>
            )
          }
          return (
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs font-mono text-foreground">
              {children}
            </code>
          )
        },
        pre: ({ children }) => <pre className="my-3">{children}</pre>,
        hr: () => <hr className="border-border my-5" />,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-border px-3 py-2 bg-muted text-left font-semibold text-foreground text-xs uppercase tracking-wide">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-3 py-2 text-foreground">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
