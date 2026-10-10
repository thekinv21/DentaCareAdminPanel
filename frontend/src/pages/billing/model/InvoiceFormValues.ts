import { TODAY } from '@/entities/appointment'
import type { TInvoice } from '@/entities/invoice'

import type { TInvoiceFormInput } from './InvoiceFormSchema'

const CURRENT_YEAR = TODAY.slice(0, 4)

/**
 * Items prefilled from the patient's treatment plan for a new invoice
 */
export const NEW_INVOICE_ITEMS = [
	{ name: 'itemRootCanal', tooth: '46', price: '9000' },
	{ name: 'itemXRay', tooth: '46', price: '600' },
]

export const newInvoiceValues = (
	translateItem: (key: string) => string,
): TInvoiceFormInput => ({
	basis: 'plan',
	dueDate: '16.10.2026',
	items: NEW_INVOICE_ITEMS.map(item => ({
		...item,
		name: translateItem(item.name),
	})),
	discount: '5',
	foms: 'no',
	sms: true,
})

export const valuesFromInvoice = (
	invoice: TInvoice,
	serviceName: string,
): TInvoiceFormInput => ({
	basis: 'visit',
	dueDate: `${invoice.dueDate}.${CURRENT_YEAR}`,
	items: [
		{
			name: serviceName,
			tooth: invoice.tooth ?? '—',
			price: String(invoice.amount),
		},
	],
	discount: '0',
	foms: 'no',
	sms: false,
})
