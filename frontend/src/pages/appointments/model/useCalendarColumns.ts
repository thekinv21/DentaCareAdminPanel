'use client'

import { useTranslations } from 'next-intl'

import { TODAY } from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { useFormat } from '@/shared/lib/i18n'

import { addDays, toDate, weekday } from '../lib/Dates'
import { eventsForDay, type TCalendarEvent } from '../lib/Schedule'
import type { TCalendarView } from './useCalendar'

export type TCalendarColumn = {
	key: string
	overline: string
	title: string
	caption: string
	aria: string
	isToday: boolean
	showNow: boolean
	events: TCalendarEvent[]
	onPick?: () => void
}

type TCalendarColumnsOptions = {
	view: TCalendarView
	cursor: string
	filter: (events: TCalendarEvent[]) => TCalendarEvent[]
	openDay: (iso: string) => void
}

const CHAIR_DOCTOR = { 1: 'kas', 2: 'pet', 3: 'tok', 4: 'tok' } as const

/**
 * Columns of the time grid: four chairs in day view, Mon–Sat in week view
 */
export function useCalendarColumns({
	view,
	cursor,
	filter,
	openDay,
}: TCalendarColumnsOptions): TCalendarColumn[] {
	const t = useTranslations('Appointments')
	const format = useFormat()
	if (view === 'month') return []

	if (view === 'day') {
		const events = filter(eventsForDay(cursor))
		return ([1, 2, 3, 4] as const).map(chair => {
			const chairEvents = events.filter(event => event.chair === chair)
			const chairName = t('chairNumber', { n: chair })
			return {
				key: `chair-${chair}`,
				overline: chairName,
				title: format.name(DOCTORS[CHAIR_DOCTOR[chair]].shortName),
				caption: t('appointmentCount', { n: chairEvents.length }),
				aria: chairName,
				isToday: false,
				showNow: cursor === TODAY,
				events: chairEvents,
			}
		})
	}

	const monday = addDays(cursor, -weekday(cursor))
	return [0, 1, 2, 3, 4, 5].map(offset => {
		const iso = addDays(monday, offset)
		const events = filter(eventsForDay(iso))
		const fullDate = format.date(iso, {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
		})
		return {
			key: iso,
			overline: format.date(iso, { weekday: 'short' }),
			title: String(toDate(iso).getUTCDate()),
			caption: events.length
				? t('appointmentCountShort', { n: events.length })
				: '—',
			aria: `${fullDate}: ${t('openDay')}`,
			isToday: iso === TODAY,
			showNow: iso === TODAY,
			events,
			onPick: () => openDay(iso),
		}
	})
}
