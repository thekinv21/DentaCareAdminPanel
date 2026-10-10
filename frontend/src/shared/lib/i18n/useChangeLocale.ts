'use client'

import { useRouter } from 'next/navigation'

import { writeCookie } from '@/shared/lib/cookie'

import { LOCALE_COOKIE, type TLocale } from './Config'

const ONE_YEAR = 60 * 60 * 24 * 365

/**
 * Stores the chosen locale in a cookie and re-renders the page with its messages
 */
export function useChangeLocale() {
	const router = useRouter()

	return (locale: TLocale) => {
		writeCookie(LOCALE_COOKIE, locale, ONE_YEAR)

		router.refresh()
	}
}
