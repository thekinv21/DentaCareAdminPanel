import { type TClinicField, WORK_DAYS } from './Clinic'
import type { TLanguageId } from './Communication'

type TWorkDayId = (typeof WORK_DAYS)[number]['id']

/**
 * Every clinic setting edited on the page; saved together with one request
 */
export type TSettingsFormValues = {
	clinic: Record<TClinicField, string>
	timeZone: string
	currency: string
	slotInterval: '15' | '30'
	lunch: string
	bookingWindow: 'next30' | 'last14'
	hours: Record<TWorkDayId, { open: boolean; from: string; to: string }>
	/**
	 * On/off switches of the payment, language and notification sections
	 */
	toggles: Record<string, boolean>
	defaultLanguage: TLanguageId
	smsLanguage: 'patient' | 'ru' | 'ky'
	dateFormat: 'dmy' | 'iso'
	amountFormat: 'som' | 'kgs'
	templates: { ru: string; ky: string }
}

export const INITIAL_TOGGLES: Record<string, boolean> = {
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

export const INITIAL_HOURS = Object.fromEntries(
	WORK_DAYS.map(day => [
		day.id,
		{ open: day.id !== 'sun', from: day.from, to: day.to },
	]),
) as TSettingsFormValues['hours']

export const SMS_TEMPLATES = {
	ru: 'Здравствуйте, {имя}! Напоминаем о записи в Denta {дата} в {время}. Врач: {врач}. Ответьте 1 — подтвердить, 2 — перенести.',
	ky: 'Саламатсызбы, {аты}! Denta клиникасына {күнү} саат {убакыт} жазылууңузду эскертебиз. Дарыгер: {дарыгер}.',
}
