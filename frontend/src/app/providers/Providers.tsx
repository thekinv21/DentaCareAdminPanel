'use client'

import type { ReactNode } from 'react'

import { ThemeProvider } from '@/shared/lib/theme'

import { TanStackQueryProvider } from './TanStackQueryProvider'

export function Providers({ children }: { children: ReactNode }) {
	return (
		<TanStackQueryProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</TanStackQueryProvider>
	)
}
