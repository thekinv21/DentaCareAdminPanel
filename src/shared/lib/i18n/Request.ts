import { cookies } from 'next/headers'

import { getRequestConfig } from 'next-intl/server'

import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE } from './Config'

/**
 * next-intl request config: the locale comes from a cookie (no locale in the URL)
 */
export default getRequestConfig(async () => {
	const value = (await cookies()).get(LOCALE_COOKIE)?.value
	const locale = isLocale(value) ? value : DEFAULT_LOCALE

	return {
		locale,
		messages: (await import(`./messages/${locale}.json`)).default,
	}
})
