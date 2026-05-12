export type ContentFormat = 'blog' | 'social' | 'email' | 'image'

export type BrandVoice = 'professional' | 'casual' | 'bold'

export interface GenerateRequest {
  topic: string
  voice: BrandVoice
  format: ContentFormat
  model: string
}
