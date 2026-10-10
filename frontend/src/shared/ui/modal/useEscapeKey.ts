'use client'

import { useOverlayKey } from './useOverlayKey'

/**
 * Calls `onEscape` on the Escape key while `active` and this overlay is on top
 */
export function useEscapeKey(active: boolean, onEscape: () => void) {
	useOverlayKey(active, event => {
		if (event.key !== 'Escape') return false

		onEscape()
	})
}
