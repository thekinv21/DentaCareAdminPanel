'use client'

import { useContext } from 'react'

import { ToastContext } from './ToastContext'

/**
 * `show(text, { onUndo })` from anywhere under <ToastProvider>
 */
export function useToast() {
	const api = useContext(ToastContext)
	if (!api) throw new Error('useToast must be used inside <ToastProvider>')
	return api
}
