'use client'

import { useMemo } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { isValidIsoDate, toUtcDate } from '../date'
import { isLocale, LOCALE_META } from './Config'
import { transliterate } from './Translit'

/**
 * Locale-aware formatters for amounts, dates and people's names
 */
export function useFormat() {
	const locale = useLocale()
	const t = useTranslations('Common')

	return useMemo(() => {
		const intl = isLocale(locale) ? LOCALE_META[locale].intl : locale
		const numbers = new Intl.NumberFormat(intl)
		const percents = new Intl.NumberFormat(intl, { style: 'percent' })
		return {
			number: (value: number) => numbers.format(value),
			/**
			 * A ratio from 0 to 1 as a percentage: 0.94 → 94%
			 */
			percent: (ratio: number) => percents.format(ratio),
			som: (value: number) => `${numbers.format(value)} ${t('som')}`,
			/**
			 * People's names stay as written, transliterated for English
			 */
			name: (value: string) => (locale === 'en' ? transliterate(value) : value),
			/**
			 * An invalid ISO date renders as an empty string instead of throwing
			 */
			date: (iso: string, options: Intl.DateTimeFormatOptions) => {
				if (!isValidIsoDate(iso)) return ''
				const text = new Intl.DateTimeFormat(intl, {
					timeZone: 'UTC',
					...options,
				}).format(toUtcDate(iso))
				return text.charAt(0).toUpperCase() + text.slice(1)
			},
		}
	}, [locale, t])
}
