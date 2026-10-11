'use client'

import type { TCalendarModel } from '../model/useCalendar'
import { MonthDayCell } from './MonthDayCell'

const MONTH_GRID_CLASS = 'grid grid-cols-[repeat(7,minmax(110px,1fr))] gap-1.5'

type TMonthGridProps = { calendar: TCalendarModel }

export function MonthGrid({ calendar }: TMonthGridProps) {
	return (
		<div className='min-w-200 animate-fade'>
			<div className='sticky top-0 z-6 bg-surface pb-2'>
				<div className={MONTH_GRID_CLASS}>
					{calendar.weekdayNames.map(weekdayName => (
						<span
							key={weekdayName.dayIndex}
							className='px-1.5 py-0.5 text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase'
						>
							{weekdayName.label}
						</span>
					))}
				</div>
			</div>
			<div className={MONTH_GRID_CLASS}>
				{calendar.monthDays.map(day => (
					<MonthDayCell key={day.iso} day={day} onOpen={calendar.openDay} />
				))}
			</div>
		</div>
	)
}
