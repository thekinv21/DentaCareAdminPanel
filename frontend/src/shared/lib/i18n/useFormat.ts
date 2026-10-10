'use client'

import { useMemo } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { isLocale, LOCALE_META } from './Config'
import { transliterate } from './Translit'

const numbers = new Intl.NumberFormat('ru-RU')

/**
 * Locale-aware formatters for amounts, dates and people's names
 */
export function useFormat() {
	const locale = useLocale()
	const t = useTranslations('Common')

	return useMemo(() => {
		const intl = isLocale(locale) ? LOCALE_META[locale].intl : locale
		return {
			number: (value: number) => numbers.format(value),
			som: (value: number) => `${numbers.format(value)} ${t('som')}`,
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
	}, [locale, t])
}
