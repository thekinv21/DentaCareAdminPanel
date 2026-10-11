import { z } from 'zod'

import { USER_TYPES } from '@/entities/user'

import { kgPhoneSchema } from '@/shared/lib/validation'

const MEDIC_TYPES = ['doctor', 'chief']

export const userFormSchema = z
	.object({
		type: z.enum(USER_TYPES),
		role: z.string(),
		lastName: z.string().trim().min(1, 'enterLastName'),
		firstName: z.string().trim().min(1, 'enterFirstName'),
		phone: kgPhoneSchema,
		email: z.union([z.literal(''), z.email('enterAValidEmail')]),
		branch: z.enum(['alaToo', 'jal']),
		specialties: z.array(z.string()),
		license: z.string().trim(),
		doctors: z.array(z.string()),
		active: z.boolean(),
	})
	.superRefine((value, ctx) => {
		const issue = (path: string, message: string) =>
			ctx.addIssue({ code: 'custom', path: [path], message })

		if (isMedic(value.type)) {
			if (!value.license) issue('license', 'enterLicenseNumber')
			if (!value.specialties.length)
				issue('specialties', 'selectAtLeastOneSpecialty')
		}

		if (value.type === 'assistant' && !value.doctors.length)
			issue('doctors', 'selectAtLeastOneDoctor')
	})

export type TUserFormValues = z.infer<typeof userFormSchema>

export function isMedic(type: string) {
	return MEDIC_TYPES.includes(type)
}
