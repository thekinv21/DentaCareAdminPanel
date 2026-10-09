import type { Tone } from '@/shared/ui/badge'

import type { InvoiceStatus, PaymentMethod, PaymentMethodId } from './types'

export const PAYMENT_METHODS: Record<PaymentMethodId, PaymentMethod> = {
	visa: {
		id: 'visa',
		name: 'Visa',
		code: 'VISA',
		kind: 'Карта · POS-терминал',
		tileClass: 'bg-info-soft text-info',
		barClass: 'bg-info',
	},
	mbank: {
		id: 'mbank',
		name: 'MBANK',
		code: 'MB',
		kind: 'QR · перевод',
		tileClass: 'bg-success-soft text-success',
		barClass: 'bg-success',
	},
	komp: {
		id: 'komp',
		name: 'Компаньон',
		code: 'КОМ',
		kind: 'QR · перевод',
		tileClass: 'bg-accent-soft text-accent',
		barClass: 'bg-accent',
	},
	optima: {
		id: 'optima',
		name: 'Optima Bank',
		code: 'OPT',
		kind: 'QR · перевод',
		tileClass: 'bg-brand-soft text-brand-strong',
		barClass: 'bg-brand',
	},
}

export const INVOICE_STATUS: Record<
	InvoiceStatus,
	{ label: string; tone: Tone }
> = {
	paid: { label: 'Оплачен', tone: 'ok' },
	partial: { label: 'Частично', tone: 'info' },
	due: { label: 'К оплате', tone: 'warning' },
	overdue: { label: 'Просрочен', tone: 'danger' },
}
