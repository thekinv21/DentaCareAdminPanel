import type { Tone } from '@/shared/ui/badge'

import type { InvoiceStatus, PaymentMethod, PaymentMethodId } from './Types'

export const PAYMENT_METHODS: Record<PaymentMethodId, PaymentMethod> = {
	visa: {
		id: 'visa',
		kind: 'cardPosTerminal',
		tileClass: 'bg-info-soft text-info',
		barClass: 'bg-info',
	},
	mbank: {
		id: 'mbank',
		kind: 'qrTransfer',
		tileClass: 'bg-success-soft text-success',
		barClass: 'bg-success',
	},
	komp: {
		id: 'komp',
		kind: 'qrTransfer',
		tileClass: 'bg-accent-soft text-accent',
		barClass: 'bg-accent',
	},
	optima: {
		id: 'optima',
		kind: 'qrTransfer',
		tileClass: 'bg-brand-soft text-brand-strong',
		barClass: 'bg-brand',
	},
}

export const INVOICE_STATUS: Record<
	InvoiceStatus,
	{ label: string; tone: Tone }
> = {
	paid: { label: 'paid', tone: 'ok' },
	partial: { label: 'partial', tone: 'info' },
	due: { label: 'amountDue', tone: 'warning' },
	overdue: { label: 'overdue', tone: 'danger' },
}
