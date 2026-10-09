import type { Metadata } from 'next'
import { Golos_Text, JetBrains_Mono, Manrope } from 'next/font/google'

import { Providers } from '@/app/providers'

import { getLocale } from '@/shared/lib/i18n-server'

import './globals.css'

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin', 'cyrillic'],
	weight: ['500', '600', '700', '800'],
})

const golos = Golos_Text({
	variable: '--font-golos',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
	variable: '--font-jetbrains',
	subsets: ['latin', 'cyrillic'],
	weight: ['500', '600'],
})

export const metadata: Metadata = {
	title: {
		default: 'Denta',
		template: '%s · Denta',
	},
	description: 'Denta — dental clinic admin panel',
}

export default async function RootLayout({ children }: LayoutProps<'/'>) {
	const locale = await getLocale()

	return (
		<html
			lang={locale}
			className={`${manrope.variable} ${golos.variable} ${jetbrainsMono.variable} h-full`}
			suppressHydrationWarning
		>
			<body className='min-h-full'>
				<Providers locale={locale}>{children}</Providers>
			</body>
		</html>
	)
}
