'use client'

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'

import { useRouter } from 'next/navigation'

import { type Locale, LOCALE_COOKIE } from './config'
import {
	createFormatters,
	createTranslator,
	type Formatters,
	type Translate,
} from './translate'

interface I18nContextValue {
	locale: Locale
	setLocale: (locale: Locale) => void
	t: Translate
	format: Formatters
}

const I18nContext = createContext<I18nContextValue | null>(null)

const ONE_YEAR = 60 * 60 * 24 * 365

export function I18nProvider({
	initialLocale,
	children,
}: {
	initialLocale: Locale
	children: ReactNode
}) {
	const router = useRouter()
	const [locale, setLocaleState] = useState(initialLocale)

	const setLocale = useCallback(
		(next: Locale) => {
			document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`
			document.documentElement.lang = next
			setLocaleState(next)
			// Server-rendered parts (page titles) read the cookie
			router.refresh()
		},
		[router],
	)

	const value = useMemo(() => {
		const t = createTranslator(locale)
		return { locale, setLocale, t, format: createFormatters(locale, t) }
	}, [locale, setLocale])

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
	const context = useContext(I18nContext)
	if (!context) throw new Error('useI18n must be used inside I18nProvider')
	return context
}
