'use client'

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { LOCALE_COOKIE, type TLocale } from './Config'

const ONE_YEAR = 60 * 60 * 24 * 365

/**
 * Stores the chosen locale in a cookie and re-renders the page with its messages
 */

export function useChangeLocale() {
	const router = useRouter()
	return useCallback(
		(locale: TLocale) => {
			document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`
			router.refresh()
		},
		[router],
	)
}
