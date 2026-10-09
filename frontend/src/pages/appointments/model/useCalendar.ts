'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import {
	type DoctorKey,
	NOW_TIME,
	TODAY,
	useAppointmentLabels,
} from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { useFormat } from '@/shared/lib/i18n'

import {
	addDays,
	addMonths,
	monthGridDays,
	sameMonth,
	toDate,
	weekday,
} from '../lib/Dates'
import { type CalendarEvent, eventsForDay } from '../lib/Schedule'
import { useCalendarColumns } from './useCalendarColumns'
import { useCalendarTitle } from './useCalendarTitle'

export type CalendarView = 'day' | 'week' | 'month'

const DOCTOR_KEYS: DoctorKey[] = ['kas', 'pet', 'tok']
const A_MONDAY = '2026-10-05'

type TCalendarOptions = {
	/**
	 * Deleted or cancelled events that must disappear from the grid
	 */
	removedKeys: Set<string>
	onOpenEvent: (event: CalendarEvent) => void
}

export function useCalendar({ removedKeys, onOpenEvent }: TCalendarOptions) {
	const t = useTranslations('Appointments')
	const labels = useAppointmentLabels()
	const format = useFormat()
	const [view, setView] = useState<CalendarView>('day')
	const [cursor, setCursor] = useState(TODAY)
	const [hidden, setHidden] = useState<Set<DoctorKey>>(new Set())

	const filter = (events: CalendarEvent[]) =>
		events.filter(
			event => !hidden.has(event.doctorId) && !removedKeys.has(event.key),
		)

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
			{ id: 'day' as const, label: t('day') },
			{ id: 'week' as const, label: t('week') },
			{ id: 'month' as const, label: t('month') },
		],
		title,
		total: t('totalAppointments', { n: total }),
		prev: () => shift(-1),
		next: () => shift(1),
		goToday: () => setCursor(TODAY),
		openDay,
		openEvent: onOpenEvent,
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
			...labels.legend,
			{
				label: `${t('now')} · ${NOW_TIME}`,
				swatch: 'h-0.5 w-3.5 rounded-none bg-accent',
			},
		],
	}
}

export type CalendarModel = ReturnType<typeof useCalendar>
