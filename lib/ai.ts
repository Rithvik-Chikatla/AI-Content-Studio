import { createOpenAI } from '@ai-sdk/openai'

export const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY ?? '',
  headers: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    'X-Title': 'AI Content Studio',
  },
})

export const FREE_MODELS = [
  { id: 'nvidia/nemotron-nano-9b-v2:free', name: 'Nemotron 9B' },
  { id: 'openai/gpt-oss-20b:free', name: 'GPT OSS 20B (Fast)' },
  { id: 'openai/gpt-oss-120b:free', name: 'GPT OSS 120B' },
  { id: 'z-ai/glm-4.5-air:free', name: 'GLM 4.5 Air' },
  { id: 'liquid/lfm-2.5-1.2b-instruct:free', name: 'Liquid 1.2B (Fastest)' },
]

export const DEFAULT_MODEL = 'nvidia/nemotron-nano-9b-v2:free'
