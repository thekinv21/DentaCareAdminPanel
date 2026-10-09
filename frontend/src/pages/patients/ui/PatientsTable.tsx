'use client'

import { ChevronsUpDown } from 'lucide-react'

import { PATIENTS_TOTAL } from '@/entities/patient'

import { useI18n } from '@/shared/lib/i18n'
import { Card } from '@/shared/ui/card'
import { Pagination } from '@/shared/ui/pagination'
import { Table, TableScroll, Th } from '@/shared/ui/table'

import { usePatientsTable } from '../model/use-patients-table'
import { checkboxClass, PatientRow } from './PatientRow'
import { PatientsToolbar } from './PatientsToolbar'

function SortButton({
	label,
	onClick,
}: {
	label: string
	onClick: () => void
}) {
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
	const { t, format } = useI18n()
	const table = usePatientsTable()

	return (
		<Card
			as='section'
			className='min-h-[420px] flex-auto animate-rise max-[720px]:flex-none'
		>
			<PatientsToolbar table={table} />

			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-[900px]'>
					<thead>
						<tr>
							<Th className='w-10'>
								<input
									type='checkbox'
									className={checkboxClass}
									aria-label={t('Выбрать все')}
									checked={table.allSelected}
									onChange={table.toggleAll}
								/>
							</Th>
							<Th aria-sort={table.ariaSort('name')}>
								<SortButton
									label={t('Пациент')}
									onClick={() => table.toggleSort('name')}
								/>
							</Th>
							<Th>{t('Телефон')}</Th>
							<Th>{t('Последний визит')}</Th>
							<Th>{t('Следующий визит')}</Th>
							<Th>{t('Врач')}</Th>
							<Th align='right' aria-sort={table.ariaSort('balance')}>
								<SortButton
									label={t('Долг')}
									onClick={() => table.toggleSort('balance')}
								/>
							</Th>
							<Th>{t('Метки')}</Th>
							<Th className='w-11'>
								<span className='sr-only'>{t('Действия')}</span>
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
					{t('Показано')}{' '}
					<span className='font-mono text-ink'>1–{table.rows.length}</span>{' '}
					{t('из')}{' '}
					<span className='font-mono text-ink'>
						{format.number(PATIENTS_TOTAL)}
					</span>
				</span>
				<Pagination current={1} pages={[1, 2, 3, null, 129]} />
			</div>
		</Card>
	)
}
