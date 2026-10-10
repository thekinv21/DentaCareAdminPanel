'use client'

import { useEffect, useRef } from 'react'

import { isTopLayer, pushLayer, removeLayer } from './OverlayLayers'

/**
 * Calls `onKey` for keydown events while `active`, but only when this overlay
 * is the top one, so one Esc never closes a dialog and the modal under it.
 * Return `false` from `onKey` to leave the event alone.
 */
export function useOverlayKey(
	active: boolean,
	onKey: (event: KeyboardEvent) => boolean | void,
) {
	const latestOnKey = useRef(onKey)
	useEffect(() => {
		latestOnKey.current = onKey
	})

	useEffect(() => {
		if (!active) return

		const layer = pushLayer()

		const handle = (event: KeyboardEvent) => {
			if (!isTopLayer(layer)) return

			if (latestOnKey.current(event) !== false) event.stopPropagation()
		}

		document.addEventListener('keydown', handle)

		return () => {
			removeLayer(layer)

			document.removeEventListener('keydown', handle)
		}
	}, [active])
}
