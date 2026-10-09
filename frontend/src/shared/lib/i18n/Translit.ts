const MAP: Record<string, string> = {
	а: 'a',
	б: 'b',
	в: 'v',
	г: 'g',
	д: 'd',
	е: 'e',
	ё: 'yo',
	ж: 'zh',
	з: 'z',
	и: 'i',
	й: 'y',
	к: 'k',
	л: 'l',
	м: 'm',
	н: 'n',
	о: 'o',
	п: 'p',
	р: 'r',
	с: 's',
	т: 't',
	у: 'u',
	ф: 'f',
	х: 'kh',
	ц: 'ts',
	ч: 'ch',
	ш: 'sh',
	щ: 'shch',
	ъ: '',
	ы: 'y',
	ь: '',
	э: 'e',
	ю: 'yu',
	я: 'ya',
	ң: 'ng',
	ө: 'o',
	ү: 'u',
}

export const CYRILLIC = /[А-Яа-яЁёҢңӨөҮү]/

/**
 * Latin spelling of Cyrillic text, used for people's names in English
 */
export function transliterate(text: string): string {
	return text.replace(/[А-Яа-яЁёҢңӨөҮү]/g, char => {
		const lower = char.toLowerCase()
		const latin = MAP[lower] ?? ''
		return char === lower
			? latin
			: latin.charAt(0).toUpperCase() + latin.slice(1)
	})
}
