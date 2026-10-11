import { z } from 'zod'

import { kgPhoneSchema } from '@/shared/lib/validation'

const password = z.string().min(1, 'enterYourPassword')

export const loginSchema = z.discriminatedUnion('method', [
	z.object({
		method: z.literal('phone'),
		phone: kgPhoneSchema,
		password,
		remember: z.boolean(),
	}),
	z.object({
		method: z.literal('email'),
		email: z.email('enterAValidEmail'),
		password,
		remember: z.boolean(),
	}),
])

export type TLoginValues = z.infer<typeof loginSchema>
