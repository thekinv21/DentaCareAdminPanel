export const LOCALES = ['ru', 'ky', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'ru'

export const LOCALE_COOKIE = 'denta-locale'

export const LOCALE_META: Record<
	Locale,
	{ code: string; name: string; intl: string }
> = {
	ru: { code: 'RU', name: 'Русский', intl: 'ru-RU' },
	ky: { code: 'KY', name: 'Кыргызча', intl: 'ky-KG' },
	en: { code: 'EN', name: 'English', intl: 'en-GB' },
}

export function isLocale(value: unknown): value is Locale {
	return LOCALES.includes(value as Locale)
}
