'use client'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import {
	NOW_TIME,
	type TDoctorKey,
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
import { eventsForDay, type TCalendarEvent } from '../lib/Schedule'
import { useCalendarColumns } from './useCalendarColumns'
import { useCalendarTitle } from './useCalendarTitle'

export type TCalendarView = 'day' | 'week' | 'month'

const DOCTOR_KEYS: TDoctorKey[] = ['kas', 'pet', 'tok']
const A_MONDAY = '2026-10-05'

/**
 * Query of the calendar: visible range and the dentists shown in it
 */
type TCalendarQuery = {
	view: TCalendarView
	date: string
	doctors: TDoctorKey[]
}

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
		defaultValues: { view: 'day', date: TODAY, doctors: DOCTOR_KEYS },
	})
	const [view, cursor, doctors] = useWatch({
		control: filters.control,
		name: ['view', 'date', 'doctors'],
	})
	const setCursor = (iso: string) => filters.setValue('date', iso)

	const filter = (events: TCalendarEvent[]) =>
		events.filter(
			event => doctors.includes(event.doctorId) && !removedKeys.has(event.key),
		)

	const openDay = (iso: string) => {
		filters.setValue('view', 'day')
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
		setCursor(
			view === 'month'
				? addMonths(cursor, direction)
				: addDays(cursor, direction * (view === 'day' ? 1 : 7)),
		)

	const toggleDoctor = (key: TDoctorKey) =>
		filters.setValue(
			'doctors',
			doctors.includes(key)
				? doctors.filter(doctor => doctor !== key)
				: [...doctors, key],
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
			on: doctors.includes(key),
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

export type TCalendarModel = ReturnType<typeof useCalendar>
