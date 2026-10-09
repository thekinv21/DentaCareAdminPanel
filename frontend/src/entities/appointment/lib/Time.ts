/**
 * "HH:MM" → minutes since midnight
 */
export function toMinutes(time: string): number {
	const [h, m] = time.split(':').map(Number)
	return h * 60 + m
}

/**
 * Minutes since midnight → "HH:MM"
 */
export function fromMinutes(total: number): string {
	const h = Math.floor(total / 60)
	const m = total % 60
	return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/**
 * "Айгуль Тойчубекова" → "Тойчубекова А."
 */
export function shortPersonName(fullName: string): string {
	const [first, ...rest] = fullName.split(' ')
	return rest.length ? `${rest.join(' ')} ${first[0]}.` : fullName
}
