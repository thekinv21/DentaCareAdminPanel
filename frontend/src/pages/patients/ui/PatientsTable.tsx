'use client'

import { ChevronsUpDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Card } from '@/shared/ui/card'
import { Pagination } from '@/shared/ui/pagination'
import { Table, TableScroll, Th } from '@/shared/ui/table'

import type { TPatientsTableModel } from '../model/usePatientsTable'
import { PatientRow, rowCheckboxClass } from './PatientRow'
import { PatientsBulkBar } from './PatientsBulkBar'
import { PatientsToolbar } from './PatientsToolbar'

type TSortButtonProps = {
	label: string
	onClick: () => void
}

function SortButton({ label, onClick }: TSortButtonProps) {
	return (
		<button
			type='button'
			onClick={onClick}
			className='inline-flex items-center gap-1 border-0 bg-transparent p-0 tracking-[inherit] text-inherit uppercase'
		>
			{label}
			<ChevronsUpDown size={12} strokeWidth={2.4} aria-hidden='true' />
		</button>
	)
}

type TPatientsTableProps = { table: TPatientsTableModel }

export function PatientsTable({ table }: TPatientsTableProps) {
	const t = useTranslations('Patients')

	return (
		<Card
			as='section'
			className='min-h-105 flex-auto animate-rise max-mobile:flex-none'
		>
			<PatientsToolbar table={table} />
			<PatientsBulkBar table={table} />

			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-225'>
					<thead>
						<tr>
							<Th className='w-10'>
								<input
									type='checkbox'
									className={rowCheckboxClass}
									aria-label={t('selectAll')}
									checked={table.isAllSelected}
									onChange={table.toggleAll}
								/>
							</Th>
							<Th aria-sort={table.getAriaSort('name')}>
								<SortButton
									label={t('patient')}
									onClick={() => table.toggleSort('name')}
								/>
							</Th>
							<Th>{t('phone')}</Th>
							<Th>{t('lastVisit')}</Th>
							<Th>{t('nextVisit')}</Th>
							<Th>{t('dentist')}</Th>
							<Th align='right' aria-sort={table.getAriaSort('balance')}>
								<SortButton
									label={t('balanceDue')}
									onClick={() => table.toggleSort('balance')}
								/>
							</Th>
							<Th>{t('tags')}</Th>
							<Th className='w-20'>
								<span className='sr-only'>{t('actions')}</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{table.rows.map(row => (
							<PatientRow key={row.id} row={row} />
						))}
					</tbody>
				</Table>
			</TableScroll>

			<div className='flex flex-wrap items-center justify-between gap-2.5 pt-0.5 text-[12.5px] text-ink-muted'>
				<span>
					{t('showing')}{' '}
					<span className='font-mono text-ink'>{table.shownRange}</span>{' '}
					{t('of')} <span className='font-mono text-ink'>{table.total}</span>
				</span>
				<Pagination current={1} pages={table.pages} />
			</div>
		</Card>
	)
}
