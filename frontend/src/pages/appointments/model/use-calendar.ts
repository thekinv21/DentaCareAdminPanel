'use client'

import { useState } from 'react'

import {
	APPOINTMENT_LEGEND,
	APPOINTMENT_STATUS,
	type DoctorKey,
	NOW_TIME,
	TODAY,
} from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { useI18n } from '@/shared/lib/i18n'

import {
	addDays,
	addMonths,
	monthGridDays,
	sameMonth,
	toDate,
	weekday,
} from '../lib/dates'
import { type CalendarEvent, eventsForDay } from '../lib/schedule'
import { useCalendarColumns } from './use-calendar-columns'
import { useCalendarTitle } from './use-calendar-title'

export type CalendarView = 'day' | 'week' | 'month'

const DOCTOR_KEYS: DoctorKey[] = ['kas', 'pet', 'tok']
const A_MONDAY = '2026-10-05'

/**
 * Calendar navigation (view, cursor date) and the doctor filter
 */
export function useCalendar() {
	const { t, format } = useI18n()
	const [view, setView] = useState<CalendarView>('week')
	const [cursor, setCursor] = useState(TODAY)
	const [hidden, setHidden] = useState<Set<DoctorKey>>(new Set())

	const filter = (events: CalendarEvent[]) =>
		events.filter(event => !hidden.has(event.doctorId))

	const openDay = (iso: string) => {
		setView('day')
		setCursor(iso)
	}

	const columns = useCalendarColumns({ view, cursor, filter, openDay })
	const title = useCalendarTitle(view, cursor)

	const monthDays =
		view === 'month'
			? monthGridDays(cursor).map(iso => {
					const inMonth = sameMonth(iso, cursor)
					return {
						iso,
						day: toDate(iso).getUTCDate(),
						inMonth,
						isToday: iso === TODAY,
						closed: inMonth && weekday(iso) === 6,
						events: inMonth ? filter(eventsForDay(iso)) : [],
					}
				})
			: []

	const total = [...columns, ...monthDays].reduce(
		(sum, item) => sum + item.events.length,
		0,
	)

	const shift = (direction: 1 | -1) =>
		setCursor(current =>
			view === 'month'
				? addMonths(current, direction)
				: addDays(current, direction * (view === 'day' ? 1 : 7)),
		)

	const toggleDoctor = (key: DoctorKey) =>
		setHidden(current => {
			const next = new Set(current)
			if (next.has(key)) next.delete(key)
			else next.add(key)
			return next
		})

	return {
		view,
		setView,
		views: [
			{ id: 'day' as const, label: t('День') },
			{ id: 'week' as const, label: t('Неделя') },
			{ id: 'month' as const, label: t('Месяц') },
		],
		title,
		total: t('Всего записей: {n}', { n: total }),
		prev: () => shift(-1),
		next: () => shift(1),
		goToday: () => setCursor(TODAY),
		openDay,
		columns,
		monthDays,
		weekdayNames: [0, 1, 2, 3, 4, 5, 6].map(i =>
			format.date(addDays(A_MONDAY, i), { weekday: 'short' }),
		),
		doctors: DOCTOR_KEYS.map(key => ({
			key,
			name: format.name(DOCTORS[key].shortName),
			color: DOCTORS[key].color,
			on: !hidden.has(key),
			toggle: () => toggleDoctor(key),
		})),
		legend: [
			...APPOINTMENT_LEGEND.map(item => ({
				label: t(APPOINTMENT_STATUS[item.status].label),
				swatch: item.swatch,
			})),
			{
				label: `${t('Сейчас')} · ${NOW_TIME}`,
				swatch: 'h-0.5 w-3.5 rounded-none bg-accent',
			},
		],
	}
}

export type CalendarModel = ReturnType<typeof useCalendar>
