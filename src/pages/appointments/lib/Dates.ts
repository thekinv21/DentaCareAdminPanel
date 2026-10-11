import { addDays, toIsoDate, toUtcDate } from '@/shared/lib/date'

export function addMonths(iso: string, months: number): string {
	const date = toUtcDate(iso)
	return toIsoDate(
		new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1)),
	)
}

/**
 * Monday = 0 … Sunday = 6
 */

export const weekday = (iso: string) => (toUtcDate(iso).getUTCDay() + 6) % 7

/**
 * Days shown in a month grid: full weeks from the Monday before the 1st
 */

export function monthGridDays(cursor: string): string[] {
	const base = toUtcDate(cursor)
	const first = toIsoDate(
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

export const sameMonth = (firstIso: string, secondIso: string) =>
	toUtcDate(firstIso).getUTCMonth() === toUtcDate(secondIso).getUTCMonth()
