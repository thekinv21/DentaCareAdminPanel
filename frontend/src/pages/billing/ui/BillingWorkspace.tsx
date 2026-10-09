'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Download } from 'lucide-react'

import {
	type Invoice,
	INVOICES,
	InvoiceStatusBadge,
	PAYMENT_METHODS,
	PaymentMethodTile,
} from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'
import { formatSom } from '@/shared/lib/format'
import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import { PaymentPanel } from './PaymentPanel'

type Filter = 'all' | 'open' | 'overdue' | 'paid'

const FILTERS: { id: Filter; label: string }[] = [
	{ id: 'all', label: 'Все' },
	{ id: 'open', label: 'К оплате' },
	{ id: 'overdue', label: 'Просрочены' },
	{ id: 'paid', label: 'Оплачены' },
]

function matchesFilter(invoice: Invoice, filter: Filter) {
	if (filter === 'all') return true
	if (filter === 'open')
		return invoice.status === 'due' || invoice.status === 'partial'
	return invoice.status === filter
}

export function BillingWorkspace() {
	const [filter, setFilter] = useState<Filter>('all')
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [done, setDone] = useState(false)

	const rows = INVOICES.filter(invoice => matchesFilter(invoice, filter))
	const options = FILTERS.map(option => ({
		...option,
		count: INVOICES.filter(invoice => matchesFilter(invoice, option.id)).length,
	}))

	return (
		<section className='flex flex-[1_0_auto] flex-wrap items-stretch gap-4'>
			<Card
				className='min-h-[460px] flex-[2_1_560px] animate-rise'
				style={{ animationDelay: '150ms' }}
			>
				<div className='flex flex-wrap items-center justify-between gap-2.5'>
					<Segmented
						aria-label='Фильтр счетов'
						options={options}
						value={filter}
						onChange={setFilter}
					/>
					<Button size='sm'>
						<Download size={15} aria-hidden='true' />
						Экспорт
					</Button>
				</div>
				<TableScroll className='min-h-0 flex-auto'>
					<Table className='min-w-[760px]'>
						<thead>
							<tr>
								<Th>Счёт</Th>
								<Th>Пациент</Th>
								<Th>Срок</Th>
								<Th align='right'>Сумма</Th>
								<Th align='right'>Остаток</Th>
								<Th>Способ</Th>
								<Th>Статус</Th>
								<Th>
									<span className='sr-only'>Действия</span>
								</Th>
							</tr>
						</thead>
						<tbody>
							{rows.map(invoice => {
								const overdue = invoice.status === 'overdue'
								return (
									<tr key={invoice.number}>
										<Td mono nowrap className='font-semibold'>
											{invoice.number}
										</Td>
										<Td>
											<Link
												href={ROUTES.patient(invoice.patientId)}
												className='font-semibold whitespace-nowrap text-ink no-underline hover:underline'
											>
												{invoice.patientName}
											</Link>
											<div className='text-[12.5px] leading-[18px] whitespace-nowrap text-ink-muted'>
												{invoice.service}
											</div>
										</Td>
										<Td
											nowrap
											className={cn(overdue && 'font-semibold text-danger')}
										>
											{invoice.dueDate}
										</Td>
										<Td mono nowrap align='right'>
											{formatSom(invoice.amount)}
										</Td>
										<Td
											mono
											nowrap
											align='right'
											className={cn(
												invoice.balance
													? cn(
															'font-semibold',
															overdue ? 'text-danger' : 'text-warning',
														)
													: 'text-ink-subtle',
											)}
										>
											{invoice.balance ? formatSom(invoice.balance) : '—'}
										</Td>
										<Td>
											<span className='inline-flex items-center gap-2'>
												<PaymentMethodTile method={invoice.method} />
												<span className='whitespace-nowrap'>
													{PAYMENT_METHODS[invoice.method].name}
												</span>
											</span>
										</Td>
										<Td>
											<InvoiceStatusBadge status={invoice.status} />
										</Td>
										<Td align='right' nowrap>
											{invoice.balance > 0 && (
												<Button
													size='sm'
													onClick={() => {
														setSelectedIndex(INVOICES.indexOf(invoice))
														setDone(false)
													}}
												>
													Оплатить
												</Button>
											)}
										</Td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</TableScroll>
			</Card>

			<PaymentPanel
				invoice={INVOICES[selectedIndex]}
				invoiceIndex={selectedIndex}
				done={done}
				onConfirm={() => setDone(true)}
				onReset={() => setDone(false)}
			/>
		</section>
	)
}
