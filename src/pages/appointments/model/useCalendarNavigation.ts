'use client'

import { useCallback } from 'react'

import type { UseFormSetValue } from 'react-hook-form'

import { TODAY } from '@/entities/appointment'

import { addDays } from '@/shared/lib/date'

import { addMonths } from '../lib/Dates'
import type { TCalendarQuery, TCalendarView } from './CalendarQuery'

const DAYS_PER_STEP: Record<Exclude<TCalendarView, 'month'>, number> = {
	day: 1,
	week: 7,
}

/**
 * Moving the visible range: previous, next, today and jumping into a day
 */
export function useCalendarNavigation(
	setValue: UseFormSetValue<TCalendarQuery>,
	view: TCalendarView,
	cursor: string,
) {
	const openDay = useCallback(
		(iso: string) => {
			setValue('view', 'day')
			setValue('date', iso)
		},
		[setValue],
	)

	const step = (direction: 1 | -1) =>
		setValue(
			'date',
			view === 'month'
				? addMonths(cursor, direction)
				: addDays(cursor, direction * DAYS_PER_STEP[view]),
		)

	return {
		openDay,
		previous: () => step(-1),
		next: () => step(1),
		goToday: () => setValue('date', TODAY),
	}
}
