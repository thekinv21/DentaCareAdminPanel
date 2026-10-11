import { z } from 'zod'

import { DOCTOR_IDS } from '@/entities/employee'

import { displayDateSchema, kgPhoneSchema } from '@/shared/lib/validation'

export const ALLERGIES = [
	'penicillin',
	'lidocaine',
	'articaine',
	'latex',
	'iodine',
	'nsaids',
] as const
export const CONDITIONS = [
	'diabetes',
	'hypertension',
	'heartDisease',
	'asthma',
	'pregnancy',
	'anticoagulants',
] as const
export const INSURANCE = ['none', 'foms', 'dms'] as const

export const patientFormSchema = z.object({
	lastName: z.string().trim().min(1, 'enterLastName'),
	firstName: z.string().trim().min(1, 'enterFirstName'),
	middleName: z.string().trim(),
	birthDate: displayDateSchema,
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
	doctor: z.enum(DOCTOR_IDS),
	consent: z.boolean().refine(Boolean, 'consentRequired'),
	smsReminders: z.boolean(),
})

export type TPatientFormValues = z.infer<typeof patientFormSchema>
