'use client'

import { useOverlayKey } from '@/shared/ui/modal'

/**
 * Esc cancels and Enter confirms while this dialog is on top. A focused
 * button or link keeps its own Enter (so Enter on "Cancel" cancels), and so
 * do text areas and radio/checkbox chips.
 */
export function useConfirmKeys(onCancel: () => void, onConfirm: () => void) {
	useOverlayKey(true, event => {
		if (event.key === 'Escape') {
			onCancel()
			return
		}
		const target = event.target as HTMLElement
		if (
			event.key !== 'Enter' ||
			target.closest('button, a, textarea, [role="radio"], [role="checkbox"]')
		)
			return false
		event.preventDefault()
		onConfirm()
	})
}
