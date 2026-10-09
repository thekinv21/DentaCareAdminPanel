'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { type Invoice, INVOICES, usePaymentMethods } from '@/entities/invoice'

import { useFormat } from '@/shared/lib/i18n'

export type InvoiceFilter = 'all' | 'open' | 'overdue' | 'paid'

const FILTERS: { id: InvoiceFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'open', label: 'amountDue' },
	{ id: 'overdue', label: 'overdueFilter' },
	{ id: 'paid', label: 'paid' },
]

function matchesFilter(invoice: Invoice, filter: InvoiceFilter) {
	if (filter === 'all') return true
	if (filter === 'open')
		return invoice.status === 'due' || invoice.status === 'partial'
	return invoice.status === filter
}

/**
 * Invoice list filter and which invoice the payment panel is collecting
 */
export function useBilling() {
	const t = useTranslations('Billing')
	const tInvoice = useTranslations('Invoice')
	const methods = usePaymentMethods()
	const format = useFormat()
	const [filter, setFilter] = useState<InvoiceFilter>('all')
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [done, setDone] = useState(false)

	const rows = INVOICES.filter(invoice => matchesFilter(invoice, filter)).map(
		invoice => ({
			...invoice,
			patientName: format.name(invoice.patientName),
			service: tInvoice(invoice.service),
			amountText: format.som(invoice.amount),
			balanceText: invoice.balance ? format.som(invoice.balance) : '—',
			methodName: methods.byId(invoice.method).name,
			overdue: invoice.status === 'overdue',
			pay: () => {
				setSelectedIndex(INVOICES.indexOf(invoice))
				setDone(false)
			},
		}),
	)

	return {
		filter,
		setFilter,
		filters: FILTERS.map(option => ({
			id: option.id,
			label: t(option.label),
			count: INVOICES.filter(invoice => matchesFilter(invoice, option.id))
				.length,
		})),
		rows,
		invoice: INVOICES[selectedIndex],
		invoiceIndex: selectedIndex,
		done,
		confirm: () => setDone(true),
		reset: () => setDone(false),
	}
}

export type BillingModel = ReturnType<typeof useBilling>
