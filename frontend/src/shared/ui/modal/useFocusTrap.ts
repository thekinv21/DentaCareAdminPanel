'use client'

import { type RefObject, useEffect } from 'react'

const FOCUSABLE =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Keeps Tab inside the overlay, locks the page scroll and returns focus to
 * the element that opened the overlay when it closes
 */
export function useFocusTrap(
	containerRef: RefObject<HTMLElement | null>,
	opener: HTMLElement | null,
) {
	useEffect(() => {
		const container = containerRef.current

		if (!container) return

		const previousOverflow = document.body.style.overflow

		document.body.style.overflow = 'hidden'

		if (!container.contains(document.activeElement)) {
			container.querySelector<HTMLElement>(FOCUSABLE)?.focus()
		}

		const keepFocusInside = (event: KeyboardEvent) => {
			if (event.key !== 'Tab') return

			const focusable = [...container.querySelectorAll<HTMLElement>(FOCUSABLE)]

			if (!focusable.length) return

			const first = focusable[0]

			const last = focusable[focusable.length - 1]

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault()
				last.focus()
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault()
				first.focus()
			}
		}

		container.addEventListener('keydown', keepFocusInside)

		return () => {
			container.removeEventListener('keydown', keepFocusInside)

			document.body.style.overflow = previousOverflow

			opener?.focus()
		}
	}, [containerRef, opener])
}
