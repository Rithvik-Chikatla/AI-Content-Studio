import type { ContentFormat, BrandVoice } from '@/types'

const VOICE_MAP: Record<BrandVoice, string> = {
  professional: 'authoritative, clear, and concise',
  casual: 'conversational, friendly, and approachable',
  bold: 'punchy, direct, and opinionated',
}

const FORMAT_MAP: Record<ContentFormat, string> = {
  blog: `Write a structured blog post (600–900 words) with a compelling title, an engaging introduction, 3 main sections with descriptive subheadings, and a conclusion with a call-to-action.`,

  social: `Write 3 distinct social media captions for the topic:
1. LinkedIn (professional, 150–200 characters, no hashtags)
2. X / Twitter (punchy, under 280 characters, 1–2 relevant hashtags)
3. Instagram (engaging, with 3–5 relevant emoji, under 200 characters, 3–5 hashtags)

Label each platform clearly.`,

  email: `Write a complete marketing email with the following clearly labeled sections:
SUBJECT LINE: (compelling, under 60 characters)
PREVIEW TEXT: (under 90 characters)
BODY: (2–3 short paragraphs, conversational)
CTA BUTTON: (action-oriented label, 2–5 words)`,

  image: `Write 3 detailed image generation prompts for this topic. Number each prompt and include:
- Main subject and scene
- Visual style (e.g. photorealistic, flat illustration, 3D render)
- Lighting and color palette
- Mood and composition
- Technical details (e.g. lens, aspect ratio)`,
}

export function buildPrompt(format: ContentFormat, voice: BrandVoice): string {
  return `You are an expert brand content writer. Write in a ${VOICE_MAP[voice]} tone.\n\n${FORMAT_MAP[format]}\n\nFormat your response cleanly with clear structure.`
}
