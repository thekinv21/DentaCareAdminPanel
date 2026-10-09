'use client'

import { createContext } from 'react'

export type TToastOptions = {
	tone?: 'ok' | 'warning'
	/**
	 * Shows an "Undo" button for 5 seconds
	 */
	onUndo?: () => void
	/**
	 * Toast shown after undo; defaults to "Action undone"
	 */
	undoText?: string
}

export type TToast = TToastOptions & { id: number; text: string }

export type TToastApi = {
	show: (text: string, options?: TToastOptions) => void
}

export const ToastContext = createContext<TToastApi | null>(null)
