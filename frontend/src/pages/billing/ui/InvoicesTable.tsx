'use client'

import Link from 'next/link'

import { Download } from 'lucide-react'

import { InvoiceStatusBadge, PaymentMethodTile } from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'
import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Segmented } from '@/shared/ui/segmented'
import { Table, TableScroll, Td, Th } from '@/shared/ui/table'

import type { BillingModel } from '../model/use-billing'

export function InvoicesTable({ billing }: { billing: BillingModel }) {
	const { t } = useI18n()
	return (
		<Card
			className='min-h-[460px] flex-[2_1_560px] animate-rise'
			style={{ animationDelay: '150ms' }}
		>
			<div className='flex flex-wrap items-center justify-between gap-2.5'>
				<Segmented
					aria-label={t('Фильтр счетов')}
					options={billing.filters}
					value={billing.filter}
					onChange={billing.setFilter}
				/>
				<Button size='sm'>
					<Download size={15} aria-hidden='true' />
					{t('Экспорт')}
				</Button>
			</div>
			<TableScroll className='min-h-0 flex-auto'>
				<Table className='min-w-[760px]'>
					<thead>
						<tr>
							<Th>{t('Счёт')}</Th>
							<Th>{t('Пациент')}</Th>
							<Th>{t('Срок')}</Th>
							<Th align='right'>{t('Сумма')}</Th>
							<Th align='right'>{t('Остаток')}</Th>
							<Th>{t('Способ')}</Th>
							<Th>{t('Статус')}</Th>
							<Th>
								<span className='sr-only'>{t('Действия')}</span>
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
									<div className='text-[12.5px] leading-[18px] whitespace-nowrap text-ink-muted'>
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
											{t('Оплатить')}
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
