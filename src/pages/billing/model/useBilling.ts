'use client'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import {
	INVOICES,
	type TInvoice,
	useInvoiceLabels,
	usePaymentMethods,
} from '@/entities/invoice'

import { useFormat } from '@/shared/lib/i18n'

type TInvoiceFilter = 'all' | 'open' | 'overdue' | 'paid'

/**
 * Query of the invoice list
 */
type TInvoiceQuery = { status: TInvoiceFilter }

const STATUS_FILTERS: { id: TInvoiceFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'open', label: 'amountDue' },
	{ id: 'overdue', label: 'overdueFilter' },
	{ id: 'paid', label: 'paid' },
]

function matchesFilter(invoice: TInvoice, filter: TInvoiceFilter) {
	if (filter === 'all') return true
	if (filter === 'open')
		return invoice.status === 'due' || invoice.status === 'partial'
	return invoice.status === filter
}

type TBillingOptions = {
	voided: Set<string>
	onEdit: (invoice: TInvoice) => void
	onVoid: (invoice: TInvoice) => void
	onRefund: (invoice: TInvoice) => void
	onPay: (invoice: TInvoice) => void
}

/**
 * Invoice rows filtered by status, with their row actions
 */
export function useBilling(options: TBillingOptions) {
	const { voided, onEdit, onVoid, onRefund, onPay } = options

	const t = useTranslations('Billing')
	const invoiceLabels = useInvoiceLabels()
	const paymentMethods = usePaymentMethods()
	const format = useFormat()
	const filters = useForm<TInvoiceQuery>({ defaultValues: { status: 'all' } })
	const status = useWatch({ control: filters.control, name: 'status' })

	const rows = INVOICES.filter(invoice => matchesFilter(invoice, status)).map(
		invoice => {
			const isVoided = voided.has(invoice.number)
			return {
				...invoice,
				patientName: format.name(invoice.patientName),
				service: invoiceLabels.service(invoice),
				amountText: format.som(invoice.amount),
				balanceText: invoice.balance ? format.som(invoice.balance) : '—',
				methodName: paymentMethods.byId(invoice.method).name,
				isOverdue: invoice.status === 'overdue',
				isVoided,
				isPayable: invoice.balance > 0 && !isVoided,
				isRefundable: invoice.balance === 0 && !isVoided,
				edit: () => onEdit(invoice),
				voidInvoice: () => onVoid(invoice),
				refund: () => onRefund(invoice),
				pay: () => onPay(invoice),
			}
		},
	)

	return {
		filters,
		statuses: STATUS_FILTERS.map(option => ({
			id: option.id,
			label: t(option.label),
			count: INVOICES.filter(invoice => matchesFilter(invoice, option.id))
				.length,
		})),
		rows,
	}
}

export type TBillingModel = ReturnType<typeof useBilling>

export type TInvoiceRow = TBillingModel['rows'][number]
