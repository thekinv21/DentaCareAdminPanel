import { z } from 'zod'

import { strongPasswordSchema } from '@/shared/lib/validation'

export const resetSchema = z
	.object({
		password: strongPasswordSchema,
		confirm: z.string(),
		signOutOthers: z.boolean(),
	})
	.refine(values => values.password === values.confirm, {
		path: ['confirm'],
		message: 'Пароли не совпадают',
	})

export type ResetValues = z.infer<typeof resetSchema>

export const STRENGTH = [
	{ label: 'слишком простой', color: 'bg-danger', text: 'text-danger' },
	{ label: 'слабый', color: 'bg-danger', text: 'text-danger' },
	{ label: 'средний', color: 'bg-warning', text: 'text-warning' },
	{ label: 'хороший', color: 'bg-brand', text: 'text-brand' },
	{ label: 'отличный', color: 'bg-success', text: 'text-success' },
]
