import type { TPaymentMethodId } from '@/entities/invoice'

import { type TWeekDay, WEEK_DAYS } from '@/shared/lib/date'
import type { TLocale } from '@/shared/lib/i18n'

import { type TClinicField, WORK_HOURS } from './Clinic'
import type { TNotificationId } from './Communication'
import type { TPaymentOptionId } from './Payments'

export const SLOT_INTERVALS = ['15', '30'] as const

/**
 * Every clinic setting edited on the page; saved together with one request
 */
export type TSettingsFormValues = {
	clinic: Record<TClinicField, string>
	timeZone: string
	currency: string
	slotInterval: (typeof SLOT_INTERVALS)[number]
	lunch: string
	bookingWindow: 'next30' | 'last14'
	hours: Record<TWeekDay, { open: boolean; from: string; to: string }>
	banks: Record<TPaymentMethodId, boolean>
	paymentOptions: Record<TPaymentOptionId, boolean>
	/**
	 * Interface languages staff may pick in their profile
	 */
	languages: Record<TLocale, boolean>
	notifications: Record<TNotificationId, boolean>
	defaultLanguage: TLocale
	smsLanguage: 'patient' | 'ru' | 'ky'
	dateFormat: 'dmy' | 'iso'
	amountFormat: 'som' | 'kgs'
	templates: { ru: string; ky: string }
}

export const INITIAL_HOURS = Object.fromEntries(
	WEEK_DAYS.map(day => [day, { open: day !== 'sun', ...WORK_HOURS[day] }]),
) as TSettingsFormValues['hours']

export const INITIAL_SWITCHES: Pick<
	TSettingsFormValues,
	'banks' | 'paymentOptions' | 'languages' | 'notifications'
> = {
	banks: { visa: true, mbank: true, komp: true, optima: true },
	paymentOptions: {
		fiscalReceipt: true,
		onlinePrepayment: false,
		splitPayment: true,
	},
	languages: { ru: true, ky: true, en: true },
	notifications: {
		dayBeforeReminder: true,
		twoHoursBeforeReminder: true,
		bookingConfirmation: false,
		birthdayGreeting: true,
		lowStockAlert: true,
		dailyRevenueReport: true,
	},
}

export const SMS_TEMPLATES = {
	ru: 'Здравствуйте, {имя}! Напоминаем о записи в Denta {дата} в {время}. Врач: {врач}. Ответьте 1 — подтвердить, 2 — перенести.',
	ky: 'Саламатсызбы, {аты}! Denta клиникасына {күнү} саат {убакыт} жазылууңузду эскертебиз. Дарыгер: {дарыгер}.',
}
