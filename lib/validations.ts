import { z } from 'zod'
import { DEFAULT_MODEL } from '@/lib/ai'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be under 72 characters'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>

export const generateSchema = z.object({
  prompt: z
    .string()
    .min(3, 'Topic must be at least 3 characters')
    .max(500, 'Topic must be under 500 characters'),
  voice: z.enum(['professional', 'casual', 'bold']),
  format: z.enum(['blog', 'social', 'email', 'image']),
  model: z.string().default(DEFAULT_MODEL),
})

export type GenerateInput = z.infer<typeof generateSchema>
