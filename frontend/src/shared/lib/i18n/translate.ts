import { app } from './catalog/app'
import { en } from './catalog/en'
import { ky } from './catalog/ky'
import { type Locale, LOCALE_META } from './config'
import { CYRILLIC, transliterate } from './translit'

export type TranslateParams = Record<string, string | number>
export type Translate = (source: string, params?: TranslateParams) => string

const DESIGN: Record<Exclude<Locale, 'ru'>, Record<string, string>> = { ky, en }
const SEPARATOR = ' · '

function lookup(
	source: string,
	locale: Exclude<Locale, 'ru'>,
): string | undefined {
	return app[source]?.[locale === 'ky' ? 0 : 1] ?? DESIGN[locale][source]
}

function interpolate(text: string, params?: TranslateParams) {
	if (!params) return text
	return text.replace(/\{(\w+)\}/g, (match, key: string) =>
		key in params ? String(params[key]) : match,
	)
}

/**
 * Translator keyed by the Russian source text (gettext style).
 * Unknown "a · b" strings are translated part by part; English never shows Cyrillic.
 */

export function createTranslator(locale: Locale): Translate {
	const translateOne = (source: string): string => {
		if (locale === 'ru' || !CYRILLIC.test(source)) return source
		const direct = lookup(source, locale)
		if (direct !== undefined) return direct
		if (source.includes(SEPARATOR)) {
			return source.split(SEPARATOR).map(translateOne).join(SEPARATOR)
		}
		return locale === 'en' ? transliterate(source) : source
	}
	return (source, params) => interpolate(translateOne(source), params)
}

/**
 * Locale-aware formatters that need no catalog
 */
export function createFormatters(locale: Locale, t: Translate) {
	const intl = LOCALE_META[locale].intl
	const numbers = new Intl.NumberFormat('ru-RU')
	return {
		number: (value: number) => numbers.format(value),
		som: (value: number) => `${numbers.format(value)} ${t('сом')}`,
		/**
		 * People's names stay as written, transliterated for English
		 */
		name: (value: string) => (locale === 'en' ? transliterate(value) : value),
		date: (iso: string, options: Intl.DateTimeFormatOptions) => {
			const text = new Intl.DateTimeFormat(intl, {
				timeZone: 'UTC',
				...options,
			}).format(new Date(`${iso}T00:00:00Z`))
			return text.charAt(0).toUpperCase() + text.slice(1)
		},
	}
}

export type Formatters = ReturnType<typeof createFormatters>
