import { cookies } from 'next/headers'

import {
	createTranslator,
	DEFAULT_LOCALE,
	isLocale,
	type Locale,
	LOCALE_COOKIE,
} from '@/shared/lib/i18n'

export async function getLocale(): Promise<Locale> {
	const value = (await cookies()).get(LOCALE_COOKIE)?.value
	return isLocale(value) ? value : DEFAULT_LOCALE
}

export async function getTranslator() {
	return createTranslator(await getLocale())
}

/**
 * `generateMetadata` for a page whose title is a Russian source string
 */
export function localizedTitle(title: string) {
	return async () => ({ title: (await getTranslator())(title) })
}
