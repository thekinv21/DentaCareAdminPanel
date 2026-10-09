import { z } from 'zod'

import { kgPhoneSchema } from '@/shared/lib/validation'

const password = z.string().min(1, 'Введите пароль')

export const loginSchema = z.discriminatedUnion('method', [
	z.object({
		method: z.literal('phone'),
		phone: kgPhoneSchema,
		password,
		remember: z.boolean(),
	}),
	z.object({
		method: z.literal('email'),
		email: z.email('Введите корректный email'),
		password,
		remember: z.boolean(),
	}),
])

export type LoginValues = z.infer<typeof loginSchema>
