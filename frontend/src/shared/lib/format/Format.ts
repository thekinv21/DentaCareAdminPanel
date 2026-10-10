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

/**
 * "Айгерим Касымова" → "Касымова А."
 */
export function getShortName(fullName: string): string {
	const [firstName, ...rest] = fullName.split(' ').filter(Boolean)

	const lastName = rest.join(' ')

	return lastName ? `${lastName} ${firstName[0]}.` : firstName
}
