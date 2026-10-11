/**
 * "HH:MM" → minutes since midnight
 */
export function toMinutes(time: string): number {
	const [hours, minutes] = time.split(':').map(Number)
	return hours * 60 + minutes
}

/**
 * Minutes since midnight → "HH:MM"
 */
export function fromMinutes(total: number): string {
	const hours = Math.floor(total / 60)
	const minutes = total % 60
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

/**
 * "Айгуль Тойчубекова" → "Тойчубекова А."
 */
export function shortPersonName(fullName: string): string {
	const [first, ...rest] = fullName.split(' ')
	return rest.length ? `${rest.join(' ')} ${first[0]}.` : fullName
}
