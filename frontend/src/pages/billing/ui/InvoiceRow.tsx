'use client'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { InvoiceStatusBadge, PaymentMethodTile } from '@/entities/invoice'

import { cn } from '@/shared/lib/cn'
import { ROUTES } from '@/shared/routes'
import { Badge } from '@/shared/ui/badge'
import { Td } from '@/shared/ui/table'

import type { TInvoiceRow } from '../model/useBilling'
import { InvoiceRowActions } from './InvoiceRowActions'

type TInvoiceRowProps = { row: TInvoiceRow }

export function InvoiceRow({ row }: TInvoiceRowProps) {
	const t = useTranslations('Billing')
	const hasBalance = row.balance > 0

	return (
		<tr>
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
			<Td nowrap className={cn(row.isOverdue && 'font-semibold text-danger')}>
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
					!hasBalance && 'text-ink-subtle',
					hasBalance && 'font-semibold',
					hasBalance && (row.isOverdue ? 'text-danger' : 'text-warning'),
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
				{row.isVoided ? (
					<Badge>{t('voided')}</Badge>
				) : (
					<InvoiceStatusBadge status={row.status} />
				)}
			</Td>
			<Td align='right' nowrap>
				<InvoiceRowActions row={row} />
			</Td>
		</tr>
	)
}
