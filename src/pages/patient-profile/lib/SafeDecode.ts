/**
 * decodeURIComponent that returns the raw text for a malformed "%" sequence
 * instead of throwing
 */
export function safeDecode(value: string): string {
	try {
		return decodeURIComponent(value)
	} catch {
		return value
	}
}
