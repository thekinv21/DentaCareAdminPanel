'use client'

import { useTranslations } from 'next-intl'

import { Card } from '@/shared/ui/card'
import { Legend } from '@/shared/ui/legend'

import { useCalendar } from '../model/useCalendar'
import { CalendarToolbar } from './CalendarToolbar'
import { MonthGrid } from './MonthGrid'
import { TimeGrid } from './TimeGrid'

export function AppointmentsCalendar() {
	const t = useTranslations('Appointments')
	const calendar = useCalendar()

	return (
		<Card
			as='section'
			aria-label={t('calendar')}
			className='min-h-0 flex-auto animate-rise gap-3 px-4.5 py-4 max-[720px]:h-180 max-[720px]:flex-none'
		>
			<CalendarToolbar calendar={calendar} />
			<div className='-mx-4.5 min-h-0 flex-auto overflow-auto px-4.5 pb-1 scrollbar-thin'>
				{calendar.view === 'month' ? (
					<MonthGrid calendar={calendar} />
				) : (
					<TimeGrid
						columns={calendar.columns}
						minColumn={calendar.view === 'day' ? 150 : 118}
					/>
				)}
			</div>
			<Legend className='border-t border-line pt-2.5' items={calendar.legend} />
		</Card>
	)
}
