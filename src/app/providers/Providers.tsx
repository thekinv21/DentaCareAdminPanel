'use client'

import type { ReactNode } from 'react'

import { ConfirmProvider } from '@/shared/ui/confirm-dialog'
import { ToastProvider } from '@/shared/ui/toast'

import { TanStackQueryProvider } from './TanStackQueryProvider'

type TProvidersProps = { children: ReactNode }

export function Providers({ children }: TProvidersProps) {
	return (
		<TanStackQueryProvider>
			<ToastProvider>
				<ConfirmProvider>{children}</ConfirmProvider>
			</ToastProvider>
		</TanStackQueryProvider>
	)
}
