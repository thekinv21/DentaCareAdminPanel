'use client'

import { type FormEventHandler, type ReactNode, useId } from 'react'

import { cn } from '@/shared/lib/cn'

import { ModalHeader } from './ModalHeader'
import { Overlay } from './Overlay'
import { useEscapeKey } from './useEscapeKey'

type TModalProps = {
	open: boolean
	onClose: () => void
	title: ReactNode
	subtitle?: ReactNode
	/**
	 * Icon inside the brand tile next to the title
	 */
	icon?: ReactNode
	wide?: boolean
	/**
	 * Blocks Esc and backdrop clicks while a request is running
	 */
	busy?: boolean
	footer?: ReactNode
	/**
	 * Turns body and footer into a `<form>`; a `type='submit'` footer button
	 * and Enter in a field both submit it
	 */
	onSubmit?: FormEventHandler<HTMLFormElement>
	children: ReactNode
}

/**
 * Dialog with a header, a scrolling body and a raised footer
 */
export function Modal(props: TModalProps) {
	const {
		open,
		onClose,
		title,
		subtitle,
		icon,
		wide,
		busy,
		footer,
		onSubmit,
		children,
	} = props

	const titleId = useId()

	const close = () => {
		if (!busy) onClose()
	}

	useEscapeKey(open, close)

	if (!open) return null

	const content = (
		<>
			<div className='flex min-h-0 flex-auto flex-col gap-4.5 overflow-auto px-5.5 py-4.5 scrollbar-thin'>
				{children}
			</div>
			{footer && (
				<div className='flex shrink-0 flex-wrap items-center gap-2.5 rounded-b-3xl border-t border-line bg-raised px-5.5 py-3.5'>
					{footer}
				</div>
			)}
		</>
	)

	return (
		<Overlay onBackdrop={close}>
			<div
				role='dialog'
				aria-modal='true'
				aria-labelledby={titleId}
				className={cn(
					'relative flex max-h-[calc(100dvh-48px)] w-full animate-pop flex-col rounded-3xl border border-line bg-surface shadow-float',
					wide ? 'max-w-230' : 'max-w-170',
				)}
			>
				<ModalHeader
					titleId={titleId}
					title={title}
					subtitle={subtitle}
					icon={icon}
					onClose={close}
				/>
				{onSubmit ? (
					<form
						noValidate
						className='contents'
						onSubmit={event => {
							// the dialog is portaled, but React still bubbles the event to parent forms
							event.stopPropagation()

							onSubmit(event)
						}}
					>
						{content}
					</form>
				) : (
					content
				)}
			</div>
		</Overlay>
	)
}
