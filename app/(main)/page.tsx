'use client'

import { useCallback, useState } from 'react'
import { useCompletion } from 'ai/react'
import { AnimatePresence, motion } from 'framer-motion'
import { DEFAULT_MODEL } from '@/lib/ai'
import type { BrandVoice, ContentFormat } from '@/types'
import ContentEditor from '@/components/ContentEditor'
import StageTopic from '@/components/stages/StageTopic'
import StageFormat from '@/components/stages/StageFormat'
import StageVoice from '@/components/stages/StageVoice'
import StageGenerate from '@/components/stages/StageGenerate'
import PageIntro from '@/components/PageIntro'

type Stage = 'topic' | 'format' | 'voice' | 'generate' | 'result'

const stageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
}

export default function Home() {
  const [stage, setStage] = useState<Stage>('topic')
  const [direction, setDirection] = useState(1)

  const [topic, setTopic] = useState('')
  const [voice, setVoice] = useState<BrandVoice>('professional')
  const [format, setFormat] = useState<ContentFormat>('blog')
  const [model, setModel] = useState(DEFAULT_MODEL)
  const [editedContent, setEditedContent] = useState('')
  const [error, setError] = useState('')

  const { completion, complete, isLoading, stop } = useCompletion({
    api: '/api/generate',
    onFinish: (_prompt, completion) => {
      setEditedContent(completion)
      setStage('result')
    },
    onError: (err) => {
      const msg = err.message || ''
      if (msg.includes('timeout') || msg.includes('Timeout') || msg.includes('Socket connection') || msg.includes('ETIMEDOUT') || msg.includes('Cannot connect') || msg.includes('timed out')) {
        setError('Connection timed out. OpenRouter may be slow — try a lighter model like Llama 3.2 3B, or wait a moment and retry.')
      } else if (msg.includes('rate-limited') || msg.includes('rate') || msg.includes('429') || msg.includes('Provider returned error') || msg.includes('Failed after')) {
        setError('This model is temporarily rate-limited. Please wait a moment and try again, or switch to a different model.')
      } else if (msg.includes('not currently available') || msg.includes('No endpoints') || msg.includes('404')) {
        setError('This model is not currently available. Please select a different model.')
      } else if (msg.includes('401') || msg.includes('API key') || msg.includes('Unauthorized')) {
        setError('Invalid API key. Please check your OPENROUTER_API_KEY in .env.local.')
      } else {
        setError(msg || 'Something went wrong. Please try again.')
      }
    },
  })

  const handleNext = () => {
    setDirection(1)
    if (stage === 'topic') setStage('format')
    else if (stage === 'format') setStage('voice')
    else if (stage === 'voice') setStage('generate')
  }

  const handleBack = () => {
    setDirection(-1)
    if (stage === 'format') setStage('topic')
    else if (stage === 'voice') setStage('format')
    else if (stage === 'generate') setStage('voice')
  }

  const handleGenerate = useCallback(async () => {
    setError('')
    setEditedContent('')
    try {
      await complete(topic.trim(), { body: { format, voice, model } })
    } catch {
      // onError callback handles error state
    }
  }, [topic, format, voice, model, complete])

  const handleStartOver = () => {
    setTopic('')
    setVoice('professional')
    setFormat('blog')
    setModel(DEFAULT_MODEL)
    setEditedContent('')
    setError('')
    setStage('topic')
  }

  const topicLength = topic.length
  const isOverLimit = topicLength > 500

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center max-w-2xl w-full mx-auto px-4 pb-20">
        {stage === 'topic' && <PageIntro />}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={stage}
            custom={direction}
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {stage === 'topic' && (
              <StageTopic
                topic={topic}
                setTopic={setTopic}
                onNext={handleNext}
                isOverLimit={isOverLimit}
                topicLength={topicLength}
              />
            )}
            {stage === 'format' && (
              <StageFormat
                format={format}
                setFormat={setFormat}
                onNext={handleNext}
                onBack={handleBack}
                topic={topic}
              />
            )}
            {stage === 'voice' && (
              <StageVoice voice={voice} setVoice={setVoice} onNext={handleNext} onBack={handleBack} />
            )}
            {stage === 'generate' && (
              <StageGenerate
                topic={topic}
                format={format}
                voice={voice}
                model={model}
                setModel={setModel}
                onGenerate={handleGenerate}
                onBack={handleBack}
                isLoading={isLoading}
              />
            )}
            {stage === 'result' && (
              <ContentEditor
                completion={completion}
                isLoading={isLoading}
                editedContent={editedContent}
                setEditedContent={setEditedContent}
                onRegenerate={handleGenerate}
                onStop={stop}
                onStartOver={handleStartOver}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <div
            role="alert"
            className="w-full mt-4 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-destructive/8 border border-destructive/20 text-destructive text-sm"
          >
            <span className="text-base leading-none mt-0.5" aria-hidden="true">⚠️</span>
            <span>{error}</span>
          </div>
        )}
      </main>
    </div>
  )
}
