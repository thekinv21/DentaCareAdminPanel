import { z } from 'zod'

import { strongPasswordSchema } from '@/shared/lib/validation'

import type {
	TNotificationChannelId,
	TNotificationEventId,
	TSecurityOptionId,
} from './Profile'

const passwordChangeSchema = z
	.object({ current: z.string(), next: z.string(), repeat: z.string() })
	.superRefine((password, ctx) => {
		// an empty "new password" means the user is not changing it
		if (!password.next) return
		if (!password.current)
			ctx.addIssue({
				code: 'custom',
				path: ['current'],
				message: 'enterYourPassword',
			})
		const strength = strongPasswordSchema.safeParse(password.next)
		if (!strength.success)
			ctx.addIssue({
				code: 'custom',
				path: ['next'],
				message: 'passwordTooWeak',
			})
		if (password.repeat !== password.next)
			ctx.addIssue({
				code: 'custom',
				path: ['repeat'],
				message: 'passwordsDontMatch',
			})
	})

export const profileFormSchema = z.object({
	profile: z.object({
		lastName: z.string().trim().min(1, 'enterLastName'),
		firstName: z.string().trim().min(1, 'enterFirstName'),
		position: z.string().trim(),
		specialty: z.string().trim(),
		phone: z.string().trim().min(1, 'phoneMustHave9Digits'),
		email: z.union([z.literal(''), z.email('enterAValidEmail')]),
		diploma: z.string().trim(),
	}),
	defaultChair: z.enum(['chair1', 'chair2']),
	scheduleView: z.enum(['week', 'day', 'month']),
	signature: z.string().trim(),
	password: passwordChangeSchema,
	security: z.custom<Record<TSecurityOptionId, boolean>>(),
	notifications:
		z.custom<
			Record<TNotificationEventId, Record<TNotificationChannelId, boolean>>
		>(),
	doNotDisturb: z.string().trim(),
	daySummary: z.enum(['daily', 'never']),
})

export type TProfileFormValues = z.infer<typeof profileFormSchema>

export const EMPTY_PASSWORD = { current: '', next: '', repeat: '' }
