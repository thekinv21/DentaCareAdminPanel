'use client'

import type { ReactNode } from 'react'

import { ThemeProvider } from '@/shared/lib/theme'

import { TanStackQueryProvider } from './TanStackQueryProvider'

type TProvidersProps = { children: ReactNode }

export function Providers({ children }: TProvidersProps) {
	return (
		<TanStackQueryProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</TanStackQueryProvider>
	)
}
