export type TLanguageId = 'ru' | 'ky' | 'en'

export const LANGUAGES: {
	id: TLanguageId
	code: string
	name: string
	note: string
}[] = [
	{ id: 'ru', code: 'RU', name: 'Русский', note: 'primaryLanguage' },
	{ id: 'ky', code: 'KY', name: 'Кыргызча', note: 'state' },
	{ id: 'en', code: 'EN', name: 'English', note: 'forForeignPatients' },
]

export const NOTIFICATIONS = [
	{
		id: 'n24',
		label: 'reminder24HoursBefore',
		hint: 'toThePatientIn',
		channel: 'SMS',
	},
	{
		id: 'n2',
		label: 'reminder2HoursBefore',
		hint: 'firstVisitsOnly',
		channel: 'SMS',
	},
	{
		id: 'nwa',
		label: 'appointmentConfirmation',
		hint: 'immediatelyAfterBooking',
		channel: 'WhatsApp',
	},
	{
		id: 'nbd',
		label: 'birthdayGreeting',
		hint: 'with10OffProfessional',
		channel: 'SMS',
	},
	{
		id: 'nstock',
		label: 'lowStockInInventory',
		hint: 'toTheAdministratorAnd',
		channel: 'inApp',
	},
	{
		id: 'nrev',
		label: 'dailyRevenueReport',
		hint: 'at2000To',
		channel: 'Email',
	},
]
