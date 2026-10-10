'use client'

import { type ReactNode, useRef, useState } from 'react'

import { createPortal } from 'react-dom'

import { useFocusTrap } from './useFocusTrap'

type TOverlayProps = {
	onBackdrop: () => void
	children: ReactNode
}

/**
 * Blurred backdrop with centered content, portaled to <body> so animated
 * (transformed) ancestors can't trap the fixed layer. Focus stays inside.
 */
export function Overlay({ onBackdrop, children }: TOverlayProps) {
	const layerRef = useRef<HTMLDivElement>(null)

	// read before the dialog's autoFocus moves focus inside
	const [opener] = useState(() => document.activeElement as HTMLElement | null)

	useFocusTrap(layerRef, opener)

	return createPortal(
		<div
			ref={layerRef}
			className='fixed inset-0 z-60 flex items-center justify-center p-6 max-mobile:p-2.5'
		>
			<div
				aria-hidden='true'
				onClick={onBackdrop}
				className='absolute inset-0 animate-fade bg-[rgba(6,24,26,0.46)] backdrop-blur-[3px]'
			/>
			{children}
		</div>,
		document.body,
	)
}
