'use client'

import { useEffect, useState } from 'react'

const PROMPTS = [
  "Drop your topic — we'll handle the rest.",
  'What story do you want to tell today?',
  "Got an idea? Let's turn it into words.",
  'What do you want the world to read?',
  "What's been on your mind lately?",
  'Ready to create something great?',
  'What topic deserves great content today?',
]

function getGreeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Good morning'
  if (h >= 12 && h < 17) return 'Good afternoon'
  if (h >= 17 && h < 21) return 'Good evening'
  return 'Hey, night owl'
}

export default function PageIntro() {
  const [greeting, setGreeting] = useState('')
  const [promptIdx, setPromptIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  // Set greeting once on mount (client only to avoid hydration mismatch)
  useEffect(() => {
    setGreeting(getGreeting())
  }, [])

  // Cycle through prompts every 3.5s with a fade
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setPromptIdx((i) => (i + 1) % PROMPTS.length)
        setVisible(true)
      }, 400)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center space-y-2 px-2 mb-8">
      <div className="space-y-0.5">
        <h2 className="text-3xl font-semibold text-foreground tracking-tight">
          {greeting ? `${greeting}! ` : ''}
          <span className="text-primary">✦</span>
        </h2>
        <p
          className="text-base text-muted-foreground transition-opacity duration-400"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
        >
          {PROMPTS[promptIdx]}
        </p>
      </div>
    </div>
  )
}
