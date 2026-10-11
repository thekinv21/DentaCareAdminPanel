import type { TLocale } from '@/shared/lib/i18n'

/**
 * Note under each language card of the "default language" choice
 */
export const LANGUAGE_NOTE: Record<TLocale, string> = {
	ru: 'primaryLanguage',
	ky: 'state',
	en: 'forForeignPatients',
}

export const NOTIFICATIONS = [
	{
		id: 'dayBeforeReminder',
		label: 'reminder24HoursBefore',
		hint: 'toPatientInChartLanguage',
		channel: 'SMS',
	},
	{
		id: 'twoHoursBeforeReminder',
		label: 'reminder2HoursBefore',
		hint: 'firstVisitsOnly',
		channel: 'SMS',
	},
	{
		id: 'bookingConfirmation',
		label: 'appointmentConfirmation',
		hint: 'immediatelyAfterBooking',
		channel: 'WhatsApp',
	},
	{
		id: 'birthdayGreeting',
		label: 'birthdayGreeting',
		hint: 'birthdayDiscountHint',
		channel: 'SMS',
	},
	{
		id: 'lowStockAlert',
		label: 'lowStockInInventory',
		hint: 'toAdminAndChiefDentist',
		channel: 'inApp',
	},
	{
		id: 'dailyRevenueReport',
		label: 'dailyRevenueReport',
		hint: 'dailyReportHint',
		channel: 'Email',
	},
] as const

export type TNotificationId = (typeof NOTIFICATIONS)[number]['id']

/**
 * Mock balance of the SMS gateway
 */
export const SMS_GATEWAY_BALANCE = { amount: 4280, messagesLeft: 3560 }
