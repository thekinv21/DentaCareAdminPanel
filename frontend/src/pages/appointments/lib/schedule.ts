import {
	type AppointmentStatus,
	type DoctorKey,
	shortPersonName,
	TODAY,
	TODAY_APPOINTMENTS,
} from '@/entities/appointment'

import { toDate, weekday } from './dates'

export interface CalendarEvent {
	key: string
	time: string
	duration: number
	who: string
	what: string
	patientId?: string
	doctorId: DoctorKey
	chair: number
	status: AppointmentStatus
}

/* Mock schedule: today is fixed, other days are generated deterministically */

const NAMES = [
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
const PROCEDURES: [string, number][] = [
	['Осмотр', 30],
	['Профгигиена', 45],
	['Пломба', 45],
	['Лечение каналов', 90],
	['Примерка коронки', 60],
	['Удаление', 45],
	['Отбеливание', 60],
	['Консультация', 30],
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
const DOCTOR_KEYS: DoctorKey[] = ['kas', 'pet', 'tok']

const TODAY_EVENTS: CalendarEvent[] = TODAY_APPOINTMENTS.map(a => ({
	key: a.id,
	time: a.time,
	duration: a.duration,
	who: shortPersonName(a.patientName),
	what: a.procedure,
	patientId: a.patientId,
	doctorId: a.doctorId,
	chair: a.chair,
	status: a.status,
}))

export function eventsForDay(iso: string): CalendarEvent[] {
	if (iso === TODAY) return TODAY_EVENTS
	const dow = weekday(iso)
	if (dow === 6) return []

	const date = toDate(iso)
	const day = date.getUTCDate() + date.getUTCMonth() * 31
	const count = dow === 5 ? 3 : 5 + (day % 3)
	const used = new Set<number>()
	const events: CalendarEvent[] = []

	for (let i = 0; i < count; i++) {
		let slot = (day * 5 + i * 3) % SLOTS.length
		while (used.has(slot)) slot = (slot + 1) % SLOTS.length
		used.add(slot)

		const [what, duration] = PROCEDURES[(day + i * 2) % PROCEDURES.length]
		const doctorId = DOCTOR_KEYS[(day + i) % 3]
		const chair =
			doctorId === 'kas' ? 1 : doctorId === 'pet' ? 2 : i % 2 ? 3 : 4
		const status: AppointmentStatus =
			iso < TODAY
				? (day + i) % 9 === 0
					? 'noshow'
					: 'done'
				: (day + i) % 3 === 0
					? 'pending'
					: 'confirmed'

		events.push({
			key: `${iso}-${i}`,
			time: SLOTS[slot],
			duration,
			who: NAMES[(day * 3 + i * 5) % NAMES.length],
			what,
			doctorId,
			chair,
			status,
		})
	}
	return events.sort((a, b) => (a.time < b.time ? -1 : 1))
}
