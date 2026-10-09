import type { Locale } from './Config'

declare module 'next-intl' {
	interface AppConfig {
		Locale: Locale
	}
}
