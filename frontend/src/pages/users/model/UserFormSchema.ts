import { z } from 'zod'

import type { TSystemRoleId } from '@/entities/role'
import { USER_TYPES } from '@/entities/user'

import { toMinutes } from '@/shared/lib/date'
import { LOCALES } from '@/shared/lib/i18n'
import {
	kgPhoneSchema,
	percentSchema,
	timeSchema,
} from '@/shared/lib/validation'

import { USER_SWITCHES } from './Options'

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
		language: z.enum(LOCALES),
		gender: z.enum(['m', 'f']),
		specialties: z.array(z.string()),
		license: z.string().trim(),
		experience: z
			.string()
			.trim()
			.regex(/^\d{0,2}$/, 'enterWholeNumber'),
		revenuePercent: percentSchema,
		chair: z.number(),
		duration: z.number(),
		color: z.string(),
		doctors: z.array(z.string()),
		qualification: z.string(),
		payments: z.array(z.string()),
		discountLimit: percentSchema,
		till: z.string(),
		reports: z.array(z.string()),
		exportFormat: z.string(),
		reportBranches: z.string(),
		days: z.array(z.string()),
		workStart: timeSchema,
		workEnd: timeSchema,
		switches: z.record(z.enum(USER_SWITCHES), z.boolean()),
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

		if (toMinutes(value.workEnd) <= toMinutes(value.workStart))
			issue('workEnd', 'endAfterStart')
	})

export type TUserFormValues = z.infer<typeof userFormSchema>

export function isMedic(type: string) {
	return MEDIC_TYPES.includes(type)
}
