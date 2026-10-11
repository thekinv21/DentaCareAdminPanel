import type { TPaymentMethodId } from '@/entities/invoice'

export const BANK_DETAILS: {
	id: TPaymentMethodId
	description: string
	/**
	 * Connection details; a value is a message key or raw text
	 */
	details: { label: string; value: string }[]
}[] = [
	{
		id: 'visa',
		description: 'visaCardsViaThe',
		details: [
			{ label: 'terminal', value: 'POS · Ingenico Move/5000' },
			{ label: 'terminalId', value: 'TID 40811752' },
			{ label: 'acquirer', value: 'Optima Bank' },
			{ label: 'fee', value: '1,8 %' },
		],
	},
	{
		id: 'mbank',
		description: 'qrPaymentAndTransfer',
		details: [
			{ label: 'merchant', value: 'DENTA-ALATOO' },
			{ label: 'ID', value: 'MB-0042-7781' },
			{ label: 'settlement', value: 'instant' },
			{ label: 'fee', value: '0,9 %' },
		],
	},
	{
		id: 'komp',
		description: 'qrPaymentInThe',
		details: [
			{ label: 'merchant', value: 'DENTA KLINIK' },
			{ label: 'ID', value: 'KMP-33190' },
			{ label: 'settlement', value: 'duringTheDay' },
			{ label: 'fee', value: '1,0 %' },
		],
	},
	{
		id: 'optima',
		description: 'qrOptima24AndInstallments',
		details: [
			{ label: 'merchant', value: 'DENTA-01' },
			{ label: 'ID', value: 'OPT-778120' },
			{ label: 'installments', value: 'installmentMonths' },
			{ label: 'fee', value: '1,2 %' },
		],
	},
]

export const PAYMENT_OPTIONS = [
	{
		id: 'fiscalReceipt',
		label: 'fiscalReceiptCashRegister',
		hint: 'automaticallyIssueAReceipt',
	},
	{
		id: 'onlinePrepayment',
		label: 'prepaymentForOnlineBooking',
		hint: 'prepaymentHint',
	},
	{
		id: 'splitPayment',
		label: 'splitPayment',
		hint: 'forExamplePartVia',
	},
] as const

export type TPaymentOptionId = (typeof PAYMENT_OPTIONS)[number]['id']
