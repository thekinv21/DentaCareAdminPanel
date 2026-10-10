import { z } from 'zod'

import { fromMinutes, toMinutes } from '@/entities/appointment'
import { DOCTOR_IDS } from '@/entities/employee'

import { displayDateSchema } from '@/shared/lib/validation'

import { BOOKING_SOURCES, FORM_STATUSES } from './AppointmentOptions'

export const appointmentFormSchema = z.object({
	patientId: z.string().min(1, 'selectPatient'),
	doctor: z.enum(DOCTOR_IDS),
	chair: z.number(),
	date: displayDateSchema,
	start: z.string(),
	duration: z.number(),
	services: z.array(z.string()),
	tooth: z.string().trim(),
	source: z.enum(BOOKING_SOURCES),
	status: z.enum(FORM_STATUSES),
	note: z.string().trim(),
	smsDayBefore: z.boolean(),
	smsTwoHoursBefore: z.boolean(),
})

export type TAppointmentFormValues = z.infer<typeof appointmentFormSchema>

export const endTime = (start: string, duration: number) =>
	fromMinutes(toMinutes(start) + duration)
