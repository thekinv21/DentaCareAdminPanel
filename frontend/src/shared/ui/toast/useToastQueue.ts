'use client'

import { useCallback, useMemo, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import type { TToast, TToastApi, TToastOptions } from './ToastContext'

const SHORT_MS = 2600
const UNDO_MS = 5200

/**
 * One visible toast at a time; a new one replaces the current
 */
export function useToastQueue() {
	const t = useTranslations('Confirm')
	const [toast, setToast] = useState<TToast | null>(null)
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
	const nextId = useRef(0)

	const show = useCallback((text: string, options: TToastOptions = {}) => {
		clearTimeout(timer.current)
		nextId.current += 1
		setToast({ ...options, id: nextId.current, text })
		timer.current = setTimeout(
			() => setToast(null),
			options.onUndo ? UNDO_MS : SHORT_MS,
		)
	}, [])

	const undo = () => {
		if (!toast?.onUndo) return
		toast.onUndo()
		show(toast.undoText ?? t('actionUndone'))
	}

	const api = useMemo<TToastApi>(() => ({ show }), [show])
	return { api, toast, undo }
}
