import {
	shortPersonName,
	type TAppointmentStatus,
	TODAY,
	TODAY_APPOINTMENTS,
} from '@/entities/appointment'
import { DOCTOR_IDS, type TDoctorId } from '@/entities/employee'

import { toUtcDate } from '@/shared/lib/date'

import { BOOKING_SERVICES } from '../model/AppointmentOptions'
import { weekday } from './Dates'

export type TCalendarEvent = {
	key: string
	/**
	 * ISO day the event belongs to
	 */
	date: string
	time: string
	duration: number
	/**
	 * Short form as it was booked: "Тойчубекова А."
	 */
	patientName: string
	/**
	 * Procedure message key of the Appointment namespace
	 */
	procedure: string
	tooth?: string
	patientId?: string
	doctorId: TDoctorId
	chair: number
	status: TAppointmentStatus
}

/* Mock schedule: today is fixed, other days are generated deterministically */

const PATIENT_NAMES = [
	'Асанов Н.',
	'Ковалёва Е.',
	'Усенов Б.',
	'Жумабаева Д.',
	'Абдыкадыров Т.',
	'Ли М.',
	'Садыков А.',
	'Осмонова Ж.',
	'Ким Р.',
	'Орозова А.',
	'Исаев К.',
	'Бекова С.',
	'Алиев Н.',
	'Мамытова Г.',
]
const SLOTS = [
	'09:00',
	'09:30',
	'10:00',
	'11:00',
	'11:30',
	'12:00',
	'13:00',
	'14:00',
	'14:30',
	'15:00',
	'16:00',
	'17:00',
]
const SATURDAY = 5
const SUNDAY = 6

const TODAY_EVENTS: TCalendarEvent[] = TODAY_APPOINTMENTS.map(appointment => ({
	key: appointment.id,
	date: TODAY,
	time: appointment.time,
	duration: appointment.duration,
	patientName: shortPersonName(appointment.patientName),
	procedure: appointment.procedure,
	tooth: appointment.tooth,
	patientId: appointment.patientId,
	doctorId: appointment.doctorId,
	chair: appointment.chair,
	status: appointment.status,
}))

function chairOf(doctorId: TDoctorId, index: number) {
	if (doctorId === 'kas') return 1
	if (doctorId === 'pet') return 2
	return index % 2 ? 3 : 4
}

function statusOf(iso: string, seed: number): TAppointmentStatus {
	if (iso < TODAY) return seed % 9 === 0 ? 'noshow' : 'done'
	return seed % 3 === 0 ? 'pending' : 'confirmed'
}

export function eventsForDay(iso: string): TCalendarEvent[] {
	if (iso === TODAY) return TODAY_EVENTS
	const dayOfWeek = weekday(iso)
	if (dayOfWeek === SUNDAY) return []

	const date = toUtcDate(iso)
	const daySeed = date.getUTCDate() + date.getUTCMonth() * 31
	const count = dayOfWeek === SATURDAY ? 3 : 5 + (daySeed % 3)
	const usedSlots = new Set<number>()
	const events: TCalendarEvent[] = []

	for (let index = 0; index < count; index++) {
		let slot = (daySeed * 5 + index * 3) % SLOTS.length
		while (usedSlots.has(slot)) slot = (slot + 1) % SLOTS.length
		usedSlots.add(slot)

		const service =
			BOOKING_SERVICES[(daySeed + index * 2) % BOOKING_SERVICES.length]
		const doctorId = DOCTOR_IDS[(daySeed + index) % DOCTOR_IDS.length]

		events.push({
			key: `${iso}-${index}`,
			date: iso,
			time: SLOTS[slot],
			duration: service.minutes,
			patientName:
				PATIENT_NAMES[(daySeed * 3 + index * 5) % PATIENT_NAMES.length],
			procedure: service.id,
			doctorId,
			chair: chairOf(doctorId, index),
			status: statusOf(iso, daySeed + index),
		})
	}
	return events.sort((first, second) => (first.time < second.time ? -1 : 1))
}

/**
 * Events of the chosen dentists, without the ones removed in this session
 */
export function visibleEvents(
	events: TCalendarEvent[],
	doctors: TDoctorId[],
	removedKeys: Set<string>,
): TCalendarEvent[] {
	return events.filter(
		event => doctors.includes(event.doctorId) && !removedKeys.has(event.key),
	)
}
