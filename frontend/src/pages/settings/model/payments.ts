export const BANK_DETAILS: {
	id: 'visa' | 'mbank' | 'komp' | 'optima'
	description: string
	meta: [string, string][]
}[] = [
	{
		id: 'visa',
		description: 'Карты Visa через POS-терминал на ресепшене',
		meta: [
			['Терминал', 'POS · Ingenico Move/5000'],
			['ID терминала', 'TID 40811752'],
			['Эквайер', 'Optima Bank'],
			['Комиссия', '1,8 %'],
		],
	},
	{
		id: 'mbank',
		description: 'QR-оплата и перевод по номеру из приложения MBANK',
		meta: [
			['Мерчант', 'DENTA-ALATOO'],
			['ID', 'MB-0042-7781'],
			['Зачисление', 'Мгновенно'],
			['Комиссия', '0,9 %'],
		],
	},
	{
		id: 'komp',
		description: 'QR-оплата через приложение банка «Компаньон»',
		meta: [
			['Мерчант', 'DENTA KLINIK'],
			['ID', 'KMP-33190'],
			['Зачисление', 'В течение дня'],
			['Комиссия', '1,0 %'],
		],
	},
	{
		id: 'optima',
		description: 'QR Optima24 и рассрочка для планов лечения',
		meta: [
			['Мерчант', 'DENTA-01'],
			['ID', 'OPT-778120'],
			['Рассрочка', '3 / 6 / 12 мес'],
			['Комиссия', '1,2 %'],
		],
	},
]

export const PAYMENT_OPTIONS = [
	{
		id: 'fiscal',
		label: 'Фискальный чек (ККМ)',
		hint: 'Автоматически пробивать чек после каждой оплаты',
	},
	{
		id: 'prepay',
		label: 'Предоплата при онлайн-записи',
		hint: '30 % стоимости первого визита через MBANK или Optima',
	},
	{
		id: 'split',
		label: 'Оплата несколькими способами',
		hint: 'Например, часть через Visa, часть через MBANK',
	},
]
