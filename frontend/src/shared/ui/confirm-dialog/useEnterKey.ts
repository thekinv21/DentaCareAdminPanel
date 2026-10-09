'use client'

import { useEffect } from 'react'

/**
 * Calls `onEnter` on Enter, even while "Cancel" has focus; text areas and
 * radio/checkbox chips keep their own Enter behavior
 */
export function useEnterKey(onEnter: () => void) {
	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			const target = event.target as HTMLElement
			if (
				event.key !== 'Enter' ||
				target.closest('textarea, [role="radio"], [role="checkbox"]')
			)
				return
			event.preventDefault()
			onEnter()
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [onEnter])
}
