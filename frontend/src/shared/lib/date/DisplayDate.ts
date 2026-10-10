const DISPLAY_DATE_PATTERN = /^\d{2}\.\d{2}\.\d{4}$/

export const toUtcDate = (iso: string) => new Date(`${iso}T00:00:00Z`)

export const toIsoDate = (date: Date) => date.toISOString().slice(0, 10)

export function addDays(iso: string, days: number): string {
	const date = toUtcDate(iso)
	date.setUTCDate(date.getUTCDate() + days)
	return toIsoDate(date)
}

/**
 * True only for a real calendar day: "2026-02-30" is rejected
 */

export function isValidIsoDate(iso: string): boolean {
	const date = toUtcDate(iso)
	return !Number.isNaN(date.getTime()) && toIsoDate(date) === iso
}

/**
 * "2026-10-09" → "09.10.2026"
 */

export const isoToDisplayDate = (iso: string) =>
	iso.split('-').reverse().join('.')

/**
 * "09.10.2026" → "2026-10-09", or null when the text is not a real date
 */

export function displayDateToIso(text: string): string | null {
	if (!DISPLAY_DATE_PATTERN.test(text)) return null
	const iso = text.split('.').reverse().join('-')
	return isValidIsoDate(iso) ? iso : null
}

/**
 * Days of the week, Monday first
 */
export const WEEK_DAYS = [
	'mon',
	'tue',
	'wed',
	'thu',
	'fri',
	'sat',
	'sun',
] as const

export type TWeekDay = (typeof WEEK_DAYS)[number]
