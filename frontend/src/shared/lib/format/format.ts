const numberFormat = new Intl.NumberFormat('ru-RU')

/**
 * 142500 → "142 500"
 */
export function formatNumber(value: number): string {
	return numberFormat.format(value)
}

/**
 * 142500 → "142 500 сом"
 */
export function formatSom(value: number): string {
	return `${formatNumber(value)} сом`
}

/**
 * "Айгуль Тойчубекова" → "АТ"
 */
export function getInitials(fullName: string): string {
	return fullName
		.split(' ')
		.filter(Boolean)
		.map(part => part[0])
		.join('')
		.slice(0, 2)
}
