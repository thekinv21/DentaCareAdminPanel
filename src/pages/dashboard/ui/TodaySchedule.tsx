'use client'

import { useTranslations } from 'next-intl'

import { Card, CardHeader } from '@/shared/ui/card'
import { SegmentedField } from '@/shared/ui/segmented'
import { Table, TableScroll, Th } from '@/shared/ui/table'

import { useTodaySchedule } from '../model/useTodaySchedule'
import { TodayScheduleRow } from './TodayScheduleRow'

export function TodaySchedule() {
	const t = useTranslations('Dashboard')
	const schedule = useTodaySchedule()

	return (
		<Card
			as='section'
			className='min-h-95 flex-[2_1_560px] animate-rise'
			style={{ animationDelay: '200ms' }}
		>
			<CardHeader
				title={t('todaysSchedule')}
				description={schedule.description}
				actions={
					<SegmentedField
						control={schedule.filters.control}
						name='phase'
						aria-label={t('filter')}
						options={schedule.phases}
					/>
				}
			/>
			<TableScroll className='max-h-105 min-h-0 flex-auto'>
				<Table className='min-w-160'>
					<thead>
						<tr>
							<Th className='w-16'>{t('time')}</Th>
							<Th>{t('patient')}</Th>
							<Th>{t('service')}</Th>
							<Th>{t('chair')}</Th>
							<Th>{t('status')}</Th>
							<Th className='w-24'>
								<span className='sr-only'>{t('actions')}</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{schedule.rows.map(row => (
							<TodayScheduleRow key={row.id} row={row} />
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
