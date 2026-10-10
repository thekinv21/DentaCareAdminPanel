import { z } from 'zod'

import type { TSystemRoleId } from '@/entities/role'
import { USER_TYPES } from '@/entities/user'

import { kgPhoneSchema } from '@/shared/lib/validation'

import { INTERFACE_LANGUAGES, USER_SWITCHES } from './Options'

const MEDIC_TYPES = ['doctor', 'chief']

export const userFormSchema = z
	.object({
		type: z.enum(USER_TYPES),
		role: z.custom<TSystemRoleId>(),
		lastName: z.string().trim().min(1, 'enterLastName'),
		firstName: z.string().trim().min(1, 'enterFirstName'),
		middleName: z.string().trim(),
		phone: kgPhoneSchema,
		email: z.union([z.literal(''), z.email('enterAValidEmail')]),
		birthDate: z.string().trim(),
		branch: z.enum(['alaToo', 'jal']),
		language: z.enum(INTERFACE_LANGUAGES),
		gender: z.enum(['m', 'f']),
		specialties: z.array(z.string()),
		license: z.string().trim(),
		experience: z.string().trim(),
		revenuePercent: z.string().trim(),
		chair: z.string(),
		duration: z.number(),
		color: z.string(),
		doctors: z.array(z.string()),
		qualification: z.string(),
		payments: z.array(z.string()),
		discountLimit: z.string().trim(),
		till: z.string(),
		reports: z.array(z.string()),
		exportFormat: z.string(),
		reportBranches: z.string(),
		days: z.array(z.string()),
		workStart: z.string().trim(),
		workEnd: z.string().trim(),
		switches: z.record(z.enum(USER_SWITCHES), z.boolean()),
	})
	.superRefine((value, ctx) => {
		if (isMedic(value.type) && !value.license)
			ctx.addIssue({
				code: 'custom',
				path: ['license'],
				message: 'enterLicenseNumber',
			})
	})

export type TUserFormValues = z.infer<typeof userFormSchema>

export function isMedic(type: string) {
	return MEDIC_TYPES.includes(type)
}
