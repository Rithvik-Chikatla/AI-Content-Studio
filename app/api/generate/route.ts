import { streamText } from 'ai'
import { NextResponse } from 'next/server'
import { openrouter } from '@/lib/ai'
import { buildPrompt } from '@/lib/prompts'
import { generateSchema } from '@/lib/validations'

// Allow streaming responses up to 120 seconds (free models can be slow)
export const maxDuration = 120

export async function POST(req: Request) {
  // Guard: ensure API key is configured
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json(
      {
        error:
          'OpenRouter API key is not configured. Add OPENROUTER_API_KEY to your .env.local file.',
      },
      { status: 500 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsed = generateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? 'Invalid request.' },
      { status: 400 },
    )
  }

  const { prompt: topic, voice, format, model } = parsed.data

  try {
    const result = await streamText({
      model: openrouter(model),
      system: buildPrompt(format, voice),
      prompt: `Write content about: ${topic}`,
      maxTokens: 1500,
      maxRetries: 0,
    })

    return result.toDataStreamResponse({
      getErrorMessage: (err) => {
        const msg = err instanceof Error ? err.message : String(err)
        if (msg.includes('429') || msg.includes('rate') || msg.includes('Rate')) {
          return 'This model is temporarily rate-limited. Please wait a moment and try again, or switch to a different model.'
        }
        if (msg.includes('404') || msg.includes('No endpoints')) {
          return 'This model is not currently available on OpenRouter. Please select a different model.'
        }
        return msg || 'Failed to generate content. Please try again.'
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to generate content.'
    console.error('[generate]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
