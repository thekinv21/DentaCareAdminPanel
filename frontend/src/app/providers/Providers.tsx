'use client'

import type { ReactNode } from 'react'

import { I18nProvider, type Locale } from '@/shared/lib/i18n'
import { ThemeProvider } from '@/shared/lib/theme'

export function Providers({
	locale,
	children,
}: {
	locale: Locale
	children: ReactNode
}) {
	return (
		<I18nProvider initialLocale={locale}>
			<ThemeProvider>{children}</ThemeProvider>
		</I18nProvider>
	)
}
