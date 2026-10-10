'use client'

import { useMemo } from 'react'

import { TODAY } from '@/entities/appointment'
import type { TDoctorId } from '@/entities/employee'

import { toUtcDate } from '@/shared/lib/date'

import { monthGridDays, sameMonth, weekday } from '../lib/Dates'
import { eventsForDay, visibleEvents } from '../lib/Schedule'
import type { TCalendarView } from './CalendarQuery'

const SUNDAY = 6

type TMonthDaysOptions = {
	view: TCalendarView
	cursor: string
	doctors: TDoctorId[]
	removedKeys: Set<string>
}

/**
 * Cells of the month grid with the events of each day of the month
 */
export function useCalendarMonthDays(options: TMonthDaysOptions) {
	const { view, cursor, doctors, removedKeys } = options

	return useMemo(() => {
		if (view !== 'month') return []
		return monthGridDays(cursor).map(iso => {
			const isInMonth = sameMonth(iso, cursor)
			return {
				iso,
				dayNumber: toUtcDate(iso).getUTCDate(),
				isInMonth,
				isToday: iso === TODAY,
				isClosed: isInMonth && weekday(iso) === SUNDAY,
				events: isInMonth
					? visibleEvents(eventsForDay(iso), doctors, removedKeys)
					: [],
			}
		})
	}, [view, cursor, doctors, removedKeys])
}

export type TMonthDay = ReturnType<typeof useCalendarMonthDays>[number]
