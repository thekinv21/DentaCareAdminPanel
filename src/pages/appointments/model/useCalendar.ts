'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { NOW_TIME, TODAY, useAppointmentLabels } from '@/entities/appointment'
import {
	DOCTOR_DOT_CLASS,
	DOCTOR_IDS,
	DOCTORS,
	type TDoctorId,
} from '@/entities/employee'

import { addDays } from '@/shared/lib/date'
import { useFormat } from '@/shared/lib/i18n'

import type { TCalendarEvent } from '../lib/Schedule'
import type { TCalendarQuery } from './CalendarQuery'
import { useCalendarColumns } from './useCalendarColumns'
import { useCalendarMonthDays } from './useCalendarMonthDays'
import { useCalendarNavigation } from './useCalendarNavigation'
import { useCalendarTitle } from './useCalendarTitle'

/**
 * Any Monday: the month grid header starts from it
 */
const A_MONDAY = '2026-10-05'
const DAYS_PER_WEEK = 7

type TCalendarOptions = {
	/**
	 * Deleted or cancelled events that must disappear from the grid
	 */
	removedKeys: Set<string>
	onOpenEvent: (event: TCalendarEvent) => void
}

/**
 * Day/week/month calendar: visible range, dentist filter and the events in it
 */
export function useCalendar({ removedKeys, onOpenEvent }: TCalendarOptions) {
	const t = useTranslations('Appointments')
	const labels = useAppointmentLabels()
	const format = useFormat()
	const filters = useForm<TCalendarQuery>({
		defaultValues: { view: 'day', date: TODAY, doctors: [...DOCTOR_IDS] },
	})
	const [view, cursor, doctors] = useWatch({
		control: filters.control,
		name: ['view', 'date', 'doctors'],
	})

	const navigation = useCalendarNavigation(filters.setValue, view, cursor)
	const columns = useCalendarColumns({ view, cursor, doctors, removedKeys })
	const monthDays = useCalendarMonthDays({ view, cursor, doctors, removedKeys })
	const title = useCalendarTitle(view, cursor)
	const weekdayNames = useMemo(
		() =>
			Array.from({ length: DAYS_PER_WEEK }, (_, offset) => ({
				dayIndex: offset,
				label: format.date(addDays(A_MONDAY, offset), { weekday: 'short' }),
			})),
		[format],
	)

	const visibleCount = [...columns, ...monthDays].reduce(
		(sum, item) => sum + item.events.length,
		0,
	)

	const toggleDoctor = (doctorId: TDoctorId) =>
		filters.setValue(
			'doctors',
			doctors.includes(doctorId)
				? doctors.filter(selectedId => selectedId !== doctorId)
				: [...doctors, doctorId],
		)

	return {
		filters,
		view,
		views: [
			{ id: 'day' as const, label: t('day') },
			{ id: 'week' as const, label: t('week') },
			{ id: 'month' as const, label: t('month') },
		],
		title,
		total: t('totalAppointments', { n: visibleCount }),
		...navigation,
		openEvent: onOpenEvent,
		columns,
		monthDays,
		weekdayNames,
		doctorFilters: DOCTOR_IDS.map(doctorId => ({
			id: doctorId,
			name: format.name(DOCTORS[doctorId].shortName),
			dotClass: DOCTOR_DOT_CLASS[DOCTORS[doctorId].color],
			isSelected: doctors.includes(doctorId),
			toggle: () => toggleDoctor(doctorId),
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

export type TCalendarModel = ReturnType<typeof useCalendar>
