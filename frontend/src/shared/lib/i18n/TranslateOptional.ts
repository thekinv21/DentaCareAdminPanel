interface Translator {
	(key: string): string
	has: (key: string) => boolean
}

/**
 * Translates `value` when it is a message key, otherwise returns it as is.
 * For mock fields that mix keys ("today") with raw data ("12.09.2026").
 */
export function translateOptional(t: Translator, value: string): string {
	return t.has(value) ? t(value) : value
}
