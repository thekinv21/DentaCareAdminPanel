export const LOCALES = ['ru', 'ky', 'en'] as const

export type TLocale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: TLocale = 'ru'

export const LOCALE_COOKIE = 'denta-locale'

/**
 * Native name and Intl locale of each supported language.
 * To add a language: extend LOCALES, add it here and create messages/<code>.json
 */

export const LOCALE_META: Record<
	TLocale,
	{ code: string; name: string; intl: string }
> = {
	ru: { code: 'RU', name: 'Русский', intl: 'ru-RU' },
	ky: { code: 'KY', name: 'Кыргызча', intl: 'ky-KG' },
	en: { code: 'EN', name: 'English', intl: 'en-GB' },
}

export function isLocale(value: unknown): value is TLocale {
	return LOCALES.includes(value as TLocale)
}
