export function matchesText(text: string, search: string): boolean {
	const needle = search.trim().toLowerCase()
	return !needle || text.toLowerCase().includes(needle)
}
