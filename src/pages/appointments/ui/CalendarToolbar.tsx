'use client'

import { useTranslations } from 'next-intl'

import { SegmentedField } from '@/shared/ui/segmented'

import type { TCalendarModel } from '../model/useCalendar'
import { CalendarNavigation } from './CalendarNavigation'
import { DoctorFilterChip } from './DoctorFilterChip'

type TCalendarToolbarProps = { calendar: TCalendarModel }

export function CalendarToolbar({ calendar }: TCalendarToolbarProps) {
	const t = useTranslations('Appointments')

	return (
		<>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<CalendarNavigation calendar={calendar} />
				<SegmentedField
					control={calendar.filters.control}
					name='view'
					aria-label={t('view')}
					options={calendar.views}
				/>
			</div>

			<div className='flex flex-wrap items-center gap-2'>
				<span className='mr-1 text-[12.5px] text-ink-muted'>
					{t('dentists')}
				</span>
				{calendar.doctorFilters.map(doctorFilter => (
					<DoctorFilterChip key={doctorFilter.id} doctorFilter={doctorFilter} />
				))}
				<span className='grow' />
				<span className='text-[12.5px] text-ink-muted'>{calendar.total}</span>
			</div>
		</>
	)
}
