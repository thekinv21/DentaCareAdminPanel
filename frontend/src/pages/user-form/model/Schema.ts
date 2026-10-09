import { z } from 'zod'

import { USER_TYPES } from '@/entities/user'

import { kgPhoneSchema } from '@/shared/lib/validation'

const MEDIC_TYPES = ['doctor', 'chief']

export const userFormSchema = z
	.object({
		type: z.enum(USER_TYPES),
		lastName: z.string().trim().min(1, 'enterLastName'),
		firstName: z.string().trim().min(1, 'enterFirstName'),
		middleName: z.string().trim(),
		phone: kgPhoneSchema,
		email: z.union([z.literal(''), z.email('enterAValidEmail')]),
		birthDate: z.string().trim(),
		branch: z.enum(['alaToo', 'jal']),
		license: z.string().trim(),
		experience: z.string().trim(),
		revenuePercent: z.string().trim(),
		chair: z.string(),
		qualification: z.string(),
		discountLimit: z.string().trim(),
		till: z.string(),
		exportFormat: z.string(),
		reportBranches: z.string(),
		workStart: z.string().trim(),
		workEnd: z.string().trim(),
	})
	.superRefine((value, ctx) => {
		if (MEDIC_TYPES.includes(value.type) && !value.license)
			ctx.addIssue({
				code: 'custom',
				path: ['license'],
				message: 'enterLicenseNumber',
			})
	})

export type TUserFormValues = z.infer<typeof userFormSchema>

export const isMedic = (type: string) => MEDIC_TYPES.includes(type)
