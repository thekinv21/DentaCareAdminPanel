export type SectionId =
	'clinic' | 'hours' | 'services' | 'pay' | 'lang' | 'notif'

export const SECTIONS: {
	id: SectionId
	label: string
	hint: string
	description: string
}[] = [
	{
		id: 'clinic',
		label: 'Клиника',
		hint: 'Реквизиты, адрес, кресла',
		description: 'Основные данные клиники для документов, чеков и SMS.',
	},
	{
		id: 'hours',
		label: 'Часы работы',
		hint: 'Пн–Сб · 08:00–19:00',
		description: 'Рабочие дни и время, доступное для записи.',
	},
	{
		id: 'services',
		label: 'Услуги и цены',
		hint: '42 услуги',
		description:
			'Прайс-лист в сомах. Цены подставляются в планы лечения и счета.',
	},
	{
		id: 'pay',
		label: 'Оплата',
		hint: '4 банка',
		description: 'Способы приёма оплаты: Visa, MBANK, Компаньон, Optima Bank.',
	},
	{
		id: 'lang',
		label: 'Языки',
		hint: 'RU · KY · EN',
		description: 'Язык интерфейса, документов и сообщений пациентам.',
	},
	{
		id: 'notif',
		label: 'Уведомления',
		hint: 'SMS и email',
		description: 'Напоминания пациентам и оповещения команды.',
	},
]

export const INITIAL_TOGGLES: Record<string, boolean> = {
	mon: true,
	tue: true,
	wed: true,
	thu: true,
	fri: true,
	sat: true,
	sun: false,
	visa: true,
	mbank: true,
	komp: true,
	optima: true,
	fiscal: true,
	prepay: false,
	split: true,
	l_ru: true,
	l_ky: true,
	l_en: true,
	n24: true,
	n2: true,
	nwa: false,
	nbd: true,
	nstock: true,
	nrev: true,
}
