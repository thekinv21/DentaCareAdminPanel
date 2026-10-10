'use client'

import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { SegmentedField } from '@/shared/ui/segmented'
import { Table, TableScroll, Th } from '@/shared/ui/table'

import type { TBillingModel } from '../model/useBilling'
import { InvoiceRow } from './InvoiceRow'

type TInvoicesTableProps = { billing: TBillingModel }

export function InvoicesTable({ billing }: TInvoicesTableProps) {
	const t = useTranslations('Billing')

	return (
		<Card
			className='min-h-115 flex-[2_1_560px] animate-rise'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<SegmentedField
					control={billing.filters.control}
					name='status'
					aria-label={t('filterInvoices')}
					options={billing.statuses}
				/>
				{/* export is not available until the backend can build the file */}
				<Button size='sm' disabled>
					<Download size={15} aria-hidden='true' />
					{t('export')}
				</Button>
			</div>
			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-190'>
					<InvoicesTableHead />
					<tbody>
						{billing.rows.map(row => (
							<InvoiceRow key={row.number} row={row} />
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}

function InvoicesTableHead() {
	const t = useTranslations('Billing')

	return (
		<thead>
			<tr>
				<Th>{t('invoice')}</Th>
				<Th>{t('patient')}</Th>
				<Th>{t('dueDate')}</Th>
				<Th align='right'>{t('amount')}</Th>
				<Th align='right'>{t('remaining')}</Th>
				<Th>{t('method')}</Th>
				<Th>{t('status')}</Th>
				<Th>
					<span className='sr-only'>{t('actions')}</span>
				</Th>
			</tr>
		</thead>
	)
}
