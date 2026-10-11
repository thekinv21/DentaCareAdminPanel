import { TODAY } from '@/entities/appointment'

import { isoToDisplayDate } from '@/shared/lib/date'

import type { TCalendarEvent } from '../lib/Schedule'
import type { TAppointmentFormValues } from './AppointmentFormSchema'
import { BOOKING_SERVICES, UNLISTED_PATIENT_ID } from './AppointmentOptions'

export const emptyAppointmentValues = (): TAppointmentFormValues => ({
	patientId: '',
	doctor: 'kas',
	chair: 1,
	date: isoToDisplayDate(TODAY),
	start: '12:30',
	duration: 60,
	services: ['exam'],
	tooth: '',
	source: 'phone',
	status: 'confirmed',
	note: '',
	smsDayBefore: true,
	smsTwoHoursBefore: false,
})

export const valuesFromEvent = (
	event: TCalendarEvent,
): TAppointmentFormValues => ({
	...emptyAppointmentValues(),
	patientId: event.patientId ?? UNLISTED_PATIENT_ID,
	doctor: event.doctorId,
	chair: event.chair,
	date: isoToDisplayDate(event.date),
	start: event.time,
	duration: event.duration,
	services: [
		BOOKING_SERVICES.find(service => service.id === event.procedure)?.id ??
			'exam',
	],
	tooth: event.tooth ?? '',
	source: 'reception',
	status: event.status === 'next' ? 'confirmed' : event.status,
	smsTwoHoursBefore: true,
})
