'use client'

import { useTranslations } from 'next-intl'

import { Card } from '@/shared/ui/card'
import { SearchInput } from '@/shared/ui/search-input'
import { SegmentedField } from '@/shared/ui/segmented'
import { Table, TableScroll, Th } from '@/shared/ui/table'

import type { TPlansTableModel } from '../model/usePlansTable'
import { PlanRow } from './PlanRow'

type TPlansTableProps = { table: TPlansTableModel }

export function PlansTable({ table }: TPlansTableProps) {
	const t = useTranslations('TreatmentPlans')
	const { filters, statuses, rows } = table

	return (
		<Card
			as='section'
			className='min-h-105 flex-auto animate-rise max-mobile:flex-none'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<SegmentedField
					control={filters.control}
					name='status'
					aria-label={t('filterPlans')}
					options={statuses}
				/>
				<SearchInput
					label={t('patientOrTooth')}
					size='sm'
					className='basis-60'
					{...filters.register('search')}
				/>
			</div>
			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-215'>
					<thead>
						<tr>
							<Th>{t('patient')}</Th>
							<Th>{t('plan')}</Th>
							<Th>{t('teeth')}</Th>
							<Th className='w-40'>{t('done')}</Th>
							<Th align='right'>{t('cost')}</Th>
							<Th>{t('status')}</Th>
							<Th>
								<span className='sr-only'>{t('actions')}</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{rows.map(row => (
							<PlanRow key={row.id} row={row} />
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
