export const BANK_DETAILS: {
	id: 'visa' | 'mbank' | 'komp' | 'optima'
	description: string
	meta: [string, string][]
}[] = [
	{
		id: 'visa',
		description: 'visaCardsViaThe',
		meta: [
			['terminal', 'POS · Ingenico Move/5000'],
			['terminalId', 'TID 40811752'],
			['acquirer', 'Optima Bank'],
			['fee', '1,8 %'],
		],
	},
	{
		id: 'mbank',
		description: 'qrPaymentAndTransfer',
		meta: [
			['merchant', 'DENTA-ALATOO'],
			['ID', 'MB-0042-7781'],
			['settlement', 'instant'],
			['fee', '0,9 %'],
		],
	},
	{
		id: 'komp',
		description: 'qrPaymentInThe',
		meta: [
			['merchant', 'DENTA KLINIK'],
			['ID', 'KMP-33190'],
			['settlement', 'duringTheDay'],
			['fee', '1,0 %'],
		],
	},
	{
		id: 'optima',
		description: 'qrOptima24AndInstallments',
		meta: [
			['merchant', 'DENTA-01'],
			['ID', 'OPT-778120'],
			['installments', 'n3612Mo'],
			['fee', '1,2 %'],
		],
	},
]

export const PAYMENT_OPTIONS = [
	{
		id: 'fiscal',
		label: 'fiscalReceiptCashRegister',
		hint: 'automaticallyIssueAReceipt',
	},
	{
		id: 'prepay',
		label: 'prepaymentForOnlineBooking',
		hint: 'n30OfTheFirst',
	},
	{
		id: 'split',
		label: 'splitPayment',
		hint: 'forExamplePartVia',
	},
]
