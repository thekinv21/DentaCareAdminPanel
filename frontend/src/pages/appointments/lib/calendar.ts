import {
	type AppointmentStatus,
	type DoctorKey,
	fromMinutes,
	shortPersonName,
	TODAY,
	TODAY_APPOINTMENTS,
	toMinutes,
} from '@/entities/appointment'

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

export const MONTHS_GENITIVE = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
]
export const MONTHS = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
]
export const WEEKDAYS = [
	'Понедельник',
	'Вторник',
	'Среда',
	'Четверг',
	'Пятница',
	'Суббота',
	'Воскресенье',
]
export const WEEKDAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

/* ISO date helpers in UTC so the calendar does not drift with the browser time zone */

export const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`)
export const toIso = (date: Date) => date.toISOString().slice(0, 10)

export function addDays(iso: string, days: number): string {
	const date = toDate(iso)
	date.setUTCDate(date.getUTCDate() + days)
	return toIso(date)
}

export function addMonths(iso: string, months: number): string {
	const date = toDate(iso)
	return toIso(
		new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1)),
	)
}

/**
 * Monday = 0 … Sunday = 6
 */
export const weekday = (iso: string) => (toDate(iso).getUTCDay() + 6) % 7

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

/* Layout of overlapping events in one column */

export const HOUR_HEIGHT = 56
export const DAY_START = toMinutes('08:00')
export const GRID_HOURS = [
	'08:00',
	'09:00',
	'10:00',
	'11:00',
	'12:00',
	'13:00',
	'14:00',
	'15:00',
	'16:00',
	'17:00',
	'18:00',
	'19:00',
]
export const GRID_HEIGHT = (GRID_HOURS.length - 1) * HOUR_HEIGHT

export interface PlacedEvent {
	event: CalendarEvent
	top: number
	height: number
	lane: number
	lanes: number
	end: string
}

export function placeEvents(events: CalendarEvent[]): PlacedEvent[] {
	const px = HOUR_HEIGHT / 60
	const items = events
		.map(event => {
			const start = toMinutes(event.time) - DAY_START
			return { event, start, finish: start + event.duration, lane: 0, lanes: 1 }
		})
		.sort((a, b) => a.start - b.start || b.finish - a.finish)

	const laneEnds: number[] = []
	items.forEach(item => {
		let lane = laneEnds.findIndex(end => end <= item.start)
		if (lane < 0) {
			lane = laneEnds.length
			laneEnds.push(0)
		}
		laneEnds[lane] = item.finish
		item.lane = lane
	})
	items.forEach(item => {
		const overlapping = items.filter(
			o => o.start < item.finish && item.start < o.finish,
		)
		item.lanes = Math.max(...overlapping.map(o => o.lane)) + 1
	})

	return items.map(item => ({
		event: item.event,
		top: item.start * px + 2,
		height: item.event.duration * px - 4,
		lane: item.lane,
		lanes: item.lanes,
		end: fromMinutes(item.finish + DAY_START),
	}))
}
