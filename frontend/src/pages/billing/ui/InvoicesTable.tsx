'use client'

import Link from 'next/link'

import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { InvoiceStatusBadge, PaymentMethodTile } from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import type { BillingModel } from '../model/useBilling'

export function InvoicesTable({ billing }: { billing: BillingModel }) {
	const t = useTranslations('Billing')
	return (
		<Card
			className='min-h-115 flex-[2_1_560px] animate-rise'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label={t('filterInvoices')}
					options={billing.filters}
					value={billing.filter}
					onChange={billing.setFilter}
				/>
				<Button size='sm'>
					<Download size={15} aria-hidden='true' />
					{t('export')}
				</Button>
			</div>
			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-190'>
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
					<tbody>
						{billing.rows.map(row => (
							<tr key={row.number}>
								<Td mono nowrap className='font-semibold'>
									{row.number}
								</Td>
								<Td>
									<Link
										href={ROUTES.patient(row.patientId)}
										className='font-semibold whitespace-nowrap text-ink no-underline hover:underline'
									>
										{row.patientName}
									</Link>
									<div className='text-[12.5px] leading-4.5 whitespace-nowrap text-ink-muted'>
										{row.service}
									</div>
								</Td>
								<Td
									nowrap
									className={cn(row.overdue && 'font-semibold text-danger')}
								>
									{row.dueDate}
								</Td>
								<Td mono nowrap align='right'>
									{row.amountText}
								</Td>
								<Td
									mono
									nowrap
									align='right'
									className={cn(
										!row.balance && 'text-ink-subtle',
										row.balance > 0 && 'font-semibold',
										row.balance > 0 &&
											(row.overdue ? 'text-danger' : 'text-warning'),
									)}
								>
									{row.balanceText}
								</Td>
								<Td>
									<span className='inline-flex items-center gap-2'>
										<PaymentMethodTile method={row.method} />
										<span className='whitespace-nowrap'>{row.methodName}</span>
									</span>
								</Td>
								<Td>
									<InvoiceStatusBadge status={row.status} />
								</Td>
								<Td align='right' nowrap>
									{row.balance > 0 && (
										<Button size='sm' onClick={row.pay}>
											{t('pay')}
										</Button>
									)}
								</Td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableScroll>
		</Card>
	)
}
