'use client'

import { useFormat } from '@/shared/lib/i18n'

import { addDays, sameMonth, toDate, weekday } from '../lib/Dates'
import type { CalendarView } from './useCalendar'

/**
 * Heading of the visible range: a day, a Mon–Sat week or a month
 */
export function useCalendarTitle(view: CalendarView, cursor: string) {
	const format = useFormat()

	if (view === 'day') {
		return format.date(cursor, {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
		})
	}
	if (view === 'month') {
		return `${format.date(cursor, { month: 'long' })} ${toDate(cursor).getUTCFullYear()}`
	}

	const monday = addDays(cursor, -weekday(cursor))
	const saturday = addDays(monday, 5)
	const start = sameMonth(monday, saturday)
		? String(toDate(monday).getUTCDate())
		: format.date(monday, { day: 'numeric', month: 'long' })
	const end = format.date(saturday, { day: 'numeric', month: 'long' })
	return `${start} – ${end} ${toDate(saturday).getUTCFullYear()}`
}
