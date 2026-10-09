import { z } from 'zod'

import { kgPhoneSchema } from '@/shared/lib/validation'

export const ALLERGIES = ['pen', 'lid', 'art', 'lat', 'iod', 'nsaid'] as const
export const CONDITIONS = [
	'diab',
	'hyp',
	'heart',
	'asth',
	'preg',
	'anti',
] as const
export const INSURANCE = ['none', 'foms', 'dms'] as const
export const PATIENT_DOCTORS = ['kas', 'pet', 'tok'] as const

export const patientFormSchema = z.object({
	lastName: z.string().trim().min(1, 'enterLastName'),
	firstName: z.string().trim().min(1, 'enterFirstName'),
	middleName: z.string().trim(),
	birthDate: z
		.string()
		.trim()
		.regex(/^\d{2}\.\d{2}\.\d{4}$/, 'enterDateDdMmYyyy'),
	gender: z.enum(['f', 'm']),
	pin: z
		.string()
		.trim()
		.refine(value => !value || /^\d{14}$/.test(value), 'enter14Digits'),
	phone: kgPhoneSchema,
	email: z.union([z.literal(''), z.email('enterAValidEmail')]),
	smsLanguage: z.enum(['ru', 'ky']),
	address: z.string().trim(),
	allergies: z.array(z.string()),
	conditions: z.array(z.string()),
	insurance: z.enum(INSURANCE),
	policy: z.string().trim(),
	doctor: z.enum(PATIENT_DOCTORS),
	consent: z.boolean().refine(Boolean, 'consentRequired'),
	smsReminders: z.boolean(),
})

export type TPatientFormValues = z.infer<typeof patientFormSchema>
