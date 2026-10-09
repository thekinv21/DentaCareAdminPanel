'use client'

import type { ReactNode } from 'react'

import { createPortal } from 'react-dom'

type TOverlayProps = {
	onBackdrop: () => void
	children: ReactNode
}

/**
 * Blurred backdrop with centered content, portaled to <body> so animated
 * (transformed) ancestors can't trap the fixed layer
 */
export function Overlay({ onBackdrop, children }: TOverlayProps) {
	return createPortal(
		<div className='fixed inset-0 z-60 flex items-center justify-center p-6 max-[720px]:p-2.5'>
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
