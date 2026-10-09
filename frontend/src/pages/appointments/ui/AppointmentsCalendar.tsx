'use client'

import { useI18n } from '@/shared/lib/i18n'
import { Card } from '@/shared/ui/card'
import { Legend } from '@/shared/ui/legend'

import { useCalendar } from '../model/use-calendar'
import { CalendarToolbar } from './CalendarToolbar'
import { MonthGrid } from './MonthGrid'
import { TimeGrid } from './TimeGrid'

export function AppointmentsCalendar() {
	const { t } = useI18n()
	const calendar = useCalendar()

	return (
		<Card
			as='section'
			aria-label={t('Календарь')}
			className='min-h-0 flex-auto animate-rise gap-3 px-[18px] py-4 max-[720px]:h-[720px] max-[720px]:flex-none'
		>
			<CalendarToolbar calendar={calendar} />
			<div className='-mx-[18px] min-h-0 flex-auto overflow-auto px-[18px] pb-1 scrollbar-thin'>
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
