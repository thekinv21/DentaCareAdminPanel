'use client'

import type { ReactNode } from 'react'

import { ThemeProvider } from '@/shared/lib/theme'
import { ConfirmProvider } from '@/shared/ui/confirm-dialog'
import { ToastProvider } from '@/shared/ui/toast'

import { TanStackQueryProvider } from './TanStackQueryProvider'

type TProvidersProps = { children: ReactNode }

export function Providers({ children }: TProvidersProps) {
	return (
		<TanStackQueryProvider>
			<ThemeProvider>
				<ToastProvider>
					<ConfirmProvider>{children}</ConfirmProvider>
				</ToastProvider>
			</ThemeProvider>
		</TanStackQueryProvider>
	)
}
