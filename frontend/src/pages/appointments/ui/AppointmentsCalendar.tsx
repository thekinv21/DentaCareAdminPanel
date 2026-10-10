'use client'

import { useTranslations } from 'next-intl'

import { Card } from '@/shared/ui/card'
import { Legend } from '@/shared/ui/legend'

import type { TCalendarModel } from '../model/useCalendar'
import { CalendarToolbar } from './CalendarToolbar'
import { MonthGrid } from './MonthGrid'
import { TimeGrid } from './TimeGrid'

type TAppointmentsCalendarProps = { calendar: TCalendarModel }

export function AppointmentsCalendar({ calendar }: TAppointmentsCalendarProps) {
	const t = useTranslations('Appointments')

	return (
		<Card
			as='section'
			aria-label={t('calendar')}
			className='min-h-0 flex-auto animate-rise gap-3 px-4.5 py-4 max-mobile:h-180 max-mobile:flex-none'
		>
			<CalendarToolbar calendar={calendar} />
			<div className='-mx-4.5 min-h-0 flex-auto overflow-auto px-4.5 pb-1 scrollbar-thin'>
				{calendar.view === 'month' ? (
					<MonthGrid calendar={calendar} />
				) : (
					<TimeGrid
						columns={calendar.columns}
						minColumnWidth={calendar.view === 'day' ? 150 : 118}
						onOpenEvent={calendar.openEvent}
						onOpenDay={calendar.openDay}
					/>
				)}
			</div>
			<Legend className='border-t border-line pt-2.5' items={calendar.legend} />
		</Card>
	)
}
