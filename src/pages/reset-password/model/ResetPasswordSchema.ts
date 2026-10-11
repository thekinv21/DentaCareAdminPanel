import { z } from 'zod'

import { strongPasswordSchema } from '@/shared/lib/validation'

export const resetSchema = z
	.object({
		password: strongPasswordSchema,
		confirmPassword: z.string(),
		signOutOthers: z.boolean(),
	})
	.refine(values => values.password === values.confirmPassword, {
		path: ['confirmPassword'],
		message: 'passwordsDontMatch',
	})

export type TResetValues = z.infer<typeof resetSchema>

export const STRENGTH = [
	{ label: 'tooSimple', color: 'bg-danger', text: 'text-danger' },
	{ label: 'weak', color: 'bg-danger', text: 'text-danger' },
	{ label: 'fair', color: 'bg-warning', text: 'text-warning' },
	{ label: 'good', color: 'bg-brand', text: 'text-brand' },
	{ label: 'excellent', color: 'bg-success', text: 'text-success' },
]
