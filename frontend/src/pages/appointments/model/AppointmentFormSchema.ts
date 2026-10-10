import { z } from 'zod'

import { fromMinutes, toMinutes } from '@/entities/appointment'

/**
 * Bookable services; `id` matches the procedure keys of calendar events
 */
export const BOOKING_SERVICES = [
	{ id: 'exam', minutes: 30, price: 1500 },
	{ id: 'professionalCleaning', minutes: 45, price: 4500 },
	{ id: 'filling', minutes: 45, price: 6000 },
	{ id: 'rootCanalTreatment', minutes: 90, price: 9000 },
	{ id: 'crownTryIn', minutes: 60, price: 0 },
	{ id: 'extraction', minutes: 45, price: 3000 },
	{ id: 'consultation', minutes: 30, price: 1000 },
	{ id: 'whitening', minutes: 60, price: 12000 },
] as const

export const START_SLOTS = [
	'09:00',
	'10:30',
	'12:00',
	'12:30',
	'14:30',
	'16:30',
]
export const DURATIONS = [30, 45, 60, 90, 120] as const
export const CHAIRS = [1, 2, 3, 4] as const
export const SOURCES = [
	'reception',
	'phone',
	'online',
	'instagram',
	'whatsapp',
] as const

export const APPOINTMENT_DOCTORS = ['kas', 'pet', 'tok'] as const

/**
 * Patient id of an event whose patient isn't in the patient list (generated mock days)
 */
export const EVENT_PATIENT = 'event'

export const FORM_STATUSES = [
	{ id: 'confirmed', dot: 'bg-brand' },
	{ id: 'pending', dot: 'bg-warning' },
	{ id: 'chair', dot: 'bg-brand-strong' },
	{ id: 'done', dot: 'bg-ink-subtle' },
	{ id: 'noshow', dot: 'bg-danger' },
] as const

export const appointmentFormSchema = z.object({
	patientId: z.string().min(1, 'selectPatient'),
	doctor: z.enum(APPOINTMENT_DOCTORS),
	chair: z.number(),
	date: z
		.string()
		.trim()
		.regex(/^\d{2}\.\d{2}\.\d{4}$/, 'enterDateDdMmYyyy'),
	start: z.string(),
	duration: z.number(),
	services: z.array(z.string()),
	tooth: z.string().trim(),
	source: z.enum(SOURCES),
	status: z.enum(['confirmed', 'pending', 'chair', 'done', 'noshow']),
	note: z.string().trim(),
	sms24: z.boolean(),
	sms2: z.boolean(),
})

export type TAppointmentFormValues = z.infer<typeof appointmentFormSchema>

/**
 * "2026-10-09" ↔ "09.10.2026"
 */
export const isoToRu = (iso: string) => iso.split('-').reverse().join('.')
export const ruToIso = (ru: string) =>
	/^\d{2}\.\d{2}\.\d{4}$/.test(ru) ? ru.split('.').reverse().join('-') : null

export const endTime = (start: string, duration: number) =>
	fromMinutes(toMinutes(start) + duration)
