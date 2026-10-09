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

/**
 * Every on/off preference on the settings screen, keyed by id
 */
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

export const CHAIRS = [
	{ id: 'К-1', name: 'Терапия', doctor: 'Касымова А.' },
	{ id: 'К-2', name: 'Ортопедия', doctor: 'Петров С.' },
	{ id: 'К-3', name: 'Хирургия', doctor: 'Токтогулов Э.' },
	{
		id: 'К-4',
		name: 'Гигиена · хирургия',
		doctor: 'Юсупова Д. / Токтогулов Э.',
	},
]

export const WORK_DAYS = [
	{ id: 'mon', name: 'Понедельник', from: '08:00', to: '19:00' },
	{ id: 'tue', name: 'Вторник', from: '08:00', to: '19:00' },
	{ id: 'wed', name: 'Среда', from: '08:00', to: '19:00' },
	{ id: 'thu', name: 'Четверг', from: '08:00', to: '19:00' },
	{ id: 'fri', name: 'Пятница', from: '08:00', to: '19:00' },
	{ id: 'sat', name: 'Суббота', from: '09:00', to: '15:00' },
	{ id: 'sun', name: 'Воскресенье', from: '10:00', to: '14:00' },
]

export type ServiceCategory = 'diag' | 'ther' | 'hyg' | 'surg' | 'orth'

export const SERVICE_CATEGORY: Record<ServiceCategory, string> = {
	diag: 'Диагностика',
	ther: 'Терапия',
	hyg: 'Гигиена',
	surg: 'Хирургия',
	orth: 'Ортопедия',
}

export const SERVICES: {
	code: string
	name: string
	category: ServiceCategory
	minutes: number
	price: number
	foms: boolean
}[] = [
	{
		code: 'T-01',
		name: 'Консультация и осмотр',
		category: 'diag',
		minutes: 20,
		price: 1500,
		foms: true,
	},
	{
		code: 'D-02',
		name: 'Прицельный снимок (RVG)',
		category: 'diag',
		minutes: 10,
		price: 600,
		foms: true,
	},
	{
		code: 'D-05',
		name: 'КТ одной челюсти',
		category: 'diag',
		minutes: 20,
		price: 3500,
		foms: false,
	},
	{
		code: 'T-11',
		name: 'Пломба светоотверждаемая',
		category: 'ther',
		minutes: 60,
		price: 6000,
		foms: false,
	},
	{
		code: 'T-14',
		name: 'Лечение каналов (1 канал)',
		category: 'ther',
		minutes: 60,
		price: 7500,
		foms: false,
	},
	{
		code: 'T-15',
		name: 'Лечение каналов (3 канала)',
		category: 'ther',
		minutes: 120,
		price: 18000,
		foms: false,
	},
	{
		code: 'H-01',
		name: 'Профгигиена Air Flow + ультразвук',
		category: 'hyg',
		minutes: 60,
		price: 4500,
		foms: false,
	},
	{
		code: 'S-03',
		name: 'Удаление зуба простое',
		category: 'surg',
		minutes: 30,
		price: 3000,
		foms: true,
	},
	{
		code: 'S-07',
		name: 'Удаление зуба мудрости',
		category: 'surg',
		minutes: 60,
		price: 9000,
		foms: false,
	},
	{
		code: 'S-12',
		name: 'Имплант Osstem (установка)',
		category: 'surg',
		minutes: 90,
		price: 55000,
		foms: false,
	},
	{
		code: 'O-04',
		name: 'Коронка металлокерамика',
		category: 'orth',
		minutes: 60,
		price: 16000,
		foms: false,
	},
	{
		code: 'O-06',
		name: 'Коронка диоксид циркония',
		category: 'orth',
		minutes: 60,
		price: 28000,
		foms: false,
	},
]

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

export type LanguageId = 'ru' | 'ky' | 'en'

export const LANGUAGES: {
	id: LanguageId
	code: string
	name: string
	note: string
}[] = [
	{ id: 'ru', code: 'RU', name: 'Русский', note: 'Основной язык' },
	{ id: 'ky', code: 'KY', name: 'Кыргызча', note: 'Государственный' },
	{ id: 'en', code: 'EN', name: 'English', note: 'Для иностранцев' },
]

export const NOTIFICATIONS = [
	{
		id: 'n24',
		label: 'Напоминание за 24 часа',
		hint: 'Пациенту на языке его карты',
		channel: 'SMS',
	},
	{
		id: 'n2',
		label: 'Напоминание за 2 часа',
		hint: 'Только для первичных визитов',
		channel: 'SMS',
	},
	{
		id: 'nwa',
		label: 'Подтверждение записи',
		hint: 'Сразу после создания записи',
		channel: 'WhatsApp',
	},
	{
		id: 'nbd',
		label: 'Поздравление с днём рождения',
		hint: 'Со скидкой 10 % на профгигиену',
		channel: 'SMS',
	},
	{
		id: 'nstock',
		label: 'Низкий остаток на складе',
		hint: 'Администратору и главному врачу',
		channel: 'В приложении',
	},
	{
		id: 'nrev',
		label: 'Ежедневный отчёт по выручке',
		hint: 'В 20:00 на info@denta.kg',
		channel: 'Email',
	},
]
