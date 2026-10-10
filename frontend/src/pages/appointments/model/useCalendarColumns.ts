'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'

import { TODAY } from '@/entities/appointment'
import {
	CHAIR_DOCTOR,
	CHAIR_NUMBERS,
	DOCTORS,
	type TDoctorId,
} from '@/entities/employee'

import { addDays, toUtcDate } from '@/shared/lib/date'
import { useFormat } from '@/shared/lib/i18n'

import { weekday } from '../lib/Dates'
import {
	eventsForDay,
	type TCalendarEvent,
	visibleEvents,
} from '../lib/Schedule'
import type { TCalendarView } from './CalendarQuery'

const WORK_DAYS_PER_WEEK = 6

export type TCalendarColumn = {
	key: string
	overline: string
	title: string
	caption: string
	ariaLabel: string
	isToday: boolean
	showNow: boolean
	events: TCalendarEvent[]
	/**
	 * Day of a week column; opening it switches to the day view
	 */
	iso?: string
}

type TCalendarColumnsOptions = {
	view: TCalendarView
	cursor: string
	doctors: TDoctorId[]
	removedKeys: Set<string>
}

/**
 * Columns of the time grid: four chairs in day view, Mon–Sat in week view
 */
export function useCalendarColumns(
	options: TCalendarColumnsOptions,
): TCalendarColumn[] {
	const { view, cursor, doctors, removedKeys } = options

	const t = useTranslations('Appointments')
	const format = useFormat()

	return useMemo(() => {
		if (view === 'month') return []

		if (view === 'day') {
			const dayEvents = visibleEvents(
				eventsForDay(cursor),
				doctors,
				removedKeys,
			)
			return CHAIR_NUMBERS.map(chair => {
				const chairEvents = dayEvents.filter(event => event.chair === chair)
				const chairName = t('chairNumber', { n: chair })
				return {
					key: `chair-${chair}`,
					overline: chairName,
					title: format.name(DOCTORS[CHAIR_DOCTOR[chair]].shortName),
					caption: t('appointmentCount', { n: chairEvents.length }),
					ariaLabel: chairName,
					isToday: false,
					showNow: cursor === TODAY,
					events: chairEvents,
				}
			})
		}

		const monday = addDays(cursor, -weekday(cursor))
		return Array.from({ length: WORK_DAYS_PER_WEEK }, (_, offset) => {
			const iso = addDays(monday, offset)
			const dayEvents = visibleEvents(eventsForDay(iso), doctors, removedKeys)
			const fullDate = format.date(iso, {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
			})
			return {
				key: iso,
				overline: format.date(iso, { weekday: 'short' }),
				title: String(toUtcDate(iso).getUTCDate()),
				caption: dayEvents.length
					? t('appointmentCountShort', { n: dayEvents.length })
					: '—',
				ariaLabel: `${fullDate}: ${t('openDay')}`,
				isToday: iso === TODAY,
				showNow: iso === TODAY,
				events: dayEvents,
				iso,
			}
		})
	}, [view, cursor, doctors, removedKeys, t, format])
}
