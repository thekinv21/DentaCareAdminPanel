'use client'

import { TODAY } from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { useI18n } from '@/shared/lib/i18n'

import { addDays, toDate, weekday } from '../lib/dates'
import { type CalendarEvent, eventsForDay } from '../lib/schedule'
import type { CalendarView } from './use-calendar'

export interface CalendarColumn {
	key: string
	overline: string
	title: string
	caption: string
	aria: string
	isToday: boolean
	showNow: boolean
	events: CalendarEvent[]
	onPick?: () => void
}

interface Options {
	view: CalendarView
	cursor: string
	filter: (events: CalendarEvent[]) => CalendarEvent[]
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
}: Options): CalendarColumn[] {
	const { t, format } = useI18n()
	if (view === 'month') return []

	if (view === 'day') {
		const events = filter(eventsForDay(cursor))
		return ([1, 2, 3, 4] as const).map(chair => {
			const chairEvents = events.filter(event => event.chair === chair)
			const chairName = t('Кресло {n}', { n: chair })
			return {
				key: `chair-${chair}`,
				overline: chairName,
				title: format.name(DOCTORS[CHAIR_DOCTOR[chair]].shortName),
				caption: t('{n} записей', { n: chairEvents.length }),
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
			caption: events.length ? t('{n} зап.', { n: events.length }) : '—',
			aria: `${fullDate}: ${t('открыть день')}`,
			isToday: iso === TODAY,
			showNow: iso === TODAY,
			events,
			onPick: () => openDay(iso),
		}
	})
}
