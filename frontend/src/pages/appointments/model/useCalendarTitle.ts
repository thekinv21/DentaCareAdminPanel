'use client'

import { addDays, toUtcDate } from '@/shared/lib/date'
import { useFormat } from '@/shared/lib/i18n'

import { sameMonth, weekday } from '../lib/Dates'
import type { TCalendarView } from './CalendarQuery'

export function useCalendarTitle(view: TCalendarView, cursor: string) {
	const format = useFormat()

	if (view === 'day') {
		return format.date(cursor, {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
		})
	}
	if (view === 'month') {
		return `${format.date(cursor, { month: 'long' })} ${toUtcDate(cursor).getUTCFullYear()}`
	}

	const monday = addDays(cursor, -weekday(cursor))
	const saturday = addDays(monday, 5)
	const start = sameMonth(monday, saturday)
		? String(toUtcDate(monday).getUTCDate())
		: format.date(monday, { day: 'numeric', month: 'long' })
	const end = format.date(saturday, { day: 'numeric', month: 'long' })
	return `${start} – ${end} ${toUtcDate(saturday).getUTCFullYear()}`
}
