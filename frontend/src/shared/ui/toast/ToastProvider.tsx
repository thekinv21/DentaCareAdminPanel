'use client'

import type { ReactNode } from 'react'

import { ToastContext } from './ToastContext'
import { ToastView } from './ToastView'
import { useToastQueue } from './useToastQueue'

type TToastProviderProps = { children: ReactNode }

export function ToastProvider({ children }: TToastProviderProps) {
	const { api, toast, undo } = useToastQueue()

	return (
		<ToastContext.Provider value={api}>
			{children}
			{toast && <ToastView toast={toast} onUndo={undo} />}
		</ToastContext.Provider>
	)
}
