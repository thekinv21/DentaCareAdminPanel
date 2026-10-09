import { getTranslations } from 'next-intl/server'

/**
 * `generateMetadata` whose title is a message of the given namespace
 */
export function localizedTitle(namespace: string, key: string) {
	return async () => {
		const t = await getTranslations(namespace)
		return { title: t(key) }
	}
}
