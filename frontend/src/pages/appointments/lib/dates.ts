/* ISO date helpers in UTC so the calendar does not drift with the browser time zone */

export const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`)
export const toIso = (date: Date) => date.toISOString().slice(0, 10)

export function addDays(iso: string, days: number): string {
	const date = toDate(iso)
	date.setUTCDate(date.getUTCDate() + days)
	return toIso(date)
}

export function addMonths(iso: string, months: number): string {
	const date = toDate(iso)
	return toIso(
		new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1)),
	)
}

/**
 * Monday = 0 … Sunday = 6
 */
export const weekday = (iso: string) => (toDate(iso).getUTCDay() + 6) % 7

/**
 * Days shown in a month grid: full weeks from the Monday before the 1st
 */
export function monthGridDays(cursor: string): string[] {
	const base = toDate(cursor)
	const first = toIso(
		new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), 1)),
	)
	const nextFirst = addMonths(first, 1)
	const days: string[] = []
	for (
		let day = addDays(first, -weekday(first));
		day < nextFirst || weekday(day) !== 0;
		day = addDays(day, 1)
	) {
		days.push(day)
	}
	return days
}

export const sameMonth = (a: string, b: string) =>
	toDate(a).getUTCMonth() === toDate(b).getUTCMonth()
