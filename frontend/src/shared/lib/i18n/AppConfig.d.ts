import type { TLocale } from './Config'

declare module 'next-intl' {
	interface AppConfig {
		Locale: TLocale
	}
}
