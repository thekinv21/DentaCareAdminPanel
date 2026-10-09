'use client'

import { ChevronsUpDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { PATIENTS_TOTAL } from '@/entities/patient'

import { useFormat } from '@/shared/lib/i18n'
import { Card } from '@/shared/ui/card'
import { Pagination } from '@/shared/ui/pagination'
import { Table, TableScroll, Th } from '@/shared/ui/table'

import { usePatientsTable } from '../model/usePatientsTable'
import { checkboxClass, PatientRow } from './PatientRow'
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

export function PatientsTable() {
	const t = useTranslations('Patients')
	const format = useFormat()
	const table = usePatientsTable()

	return (
		<Card
			as='section'
			className='min-h-105 flex-auto animate-rise max-[720px]:flex-none'
		>
			<PatientsToolbar table={table} />

			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-225'>
					<thead>
						<tr>
							<Th className='w-10'>
								<input
									type='checkbox'
									className={checkboxClass}
									aria-label={t('selectAll')}
									checked={table.allSelected}
									onChange={table.toggleAll}
								/>
							</Th>
							<Th aria-sort={table.ariaSort('name')}>
								<SortButton
									label={t('patient')}
									onClick={() => table.toggleSort('name')}
								/>
							</Th>
							<Th>{t('phone')}</Th>
							<Th>{t('lastVisit')}</Th>
							<Th>{t('nextVisit')}</Th>
							<Th>{t('dentist')}</Th>
							<Th align='right' aria-sort={table.ariaSort('balance')}>
								<SortButton
									label={t('balanceDue')}
									onClick={() => table.toggleSort('balance')}
								/>
							</Th>
							<Th>{t('tags')}</Th>
							<Th className='w-11'>
								<span className='sr-only'>{t('actions')}</span>
							</Th>
						</tr>
					</thead>
					<tbody>
						{table.rows.map(row => (
							<PatientRow
								key={row.id}
								row={row}
								onToggle={() => table.toggleRow(row.id)}
							/>
						))}
					</tbody>
				</Table>
			</TableScroll>

			<div className='flex flex-wrap items-center justify-between gap-2.5 pt-0.5 text-[12.5px] text-ink-muted'>
				<span>
					{t('showing')}{' '}
					<span className='font-mono text-ink'>1–{table.rows.length}</span>{' '}
					{t('of')}{' '}
					<span className='font-mono text-ink'>
						{format.number(PATIENTS_TOTAL)}
					</span>
				</span>
				<Pagination current={1} pages={[1, 2, 3, null, 129]} />
			</div>
		</Card>
	)
}
