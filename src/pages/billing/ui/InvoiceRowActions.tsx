'use client'

import { Ban, Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'

import type { TInvoiceRow } from '../model/useBilling'

type TInvoiceRowActionsProps = { row: TInvoiceRow }

/**
 * Pay/edit/void for an open invoice, refund for a paid one
 */
export function InvoiceRowActions({ row }: TInvoiceRowActionsProps) {
	const t = useTranslations('Billing')

	return (
		<span className='inline-flex items-center gap-0.5'>
			{row.isPayable && (
				<>
					<Button size='sm' onClick={row.pay}>
						{t('pay')}
					</Button>
					<IconButton
						quiet
						size='sm'
						aria-label={`${t('editInvoice')} ${row.number}`}
						title={t('edit')}
						onClick={row.edit}
					>
						<Pencil size={16} aria-hidden='true' />
					</IconButton>
					<IconButton
						quiet
						size='sm'
						aria-label={`${t('voidInvoice')} ${row.number}`}
						title={t('void')}
						onClick={row.voidInvoice}
						className='text-danger'
					>
						<Ban size={16} aria-hidden='true' />
					</IconButton>
				</>
			)}
			{row.isRefundable && (
				<Button size='sm' variant='dangerGhost' onClick={row.refund}>
					{t('refund')}
				</Button>
			)}
		</span>
	)
}
