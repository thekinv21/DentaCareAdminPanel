'use client'

import { useEffect } from 'react'

/**
 * Calls `onEscape` on the Escape key while `active`
 */
export function useEscapeKey(active: boolean, onEscape: () => void) {
	useEffect(() => {
		if (!active) return
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onEscape()
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [active, onEscape])
}
