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
