'use client'

import { type ReactNode, useCallback, useId } from 'react'

import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { IconButton } from '@/shared/ui/icon-button'

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
	children: ReactNode
}

/**
 * Dialog with a header, a scrolling body and a raised footer
 */
export function Modal(props: TModalProps) {
	const { open, onClose, title, subtitle, icon, wide, busy, footer, children } =
		props

	const t = useTranslations('Common')
	const titleId = useId()
	const close = useCallback(() => {
		if (!busy) onClose()
	}, [busy, onClose])
	useEscapeKey(open, close)

	if (!open) return null
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
				<div className='flex shrink-0 items-start gap-3.5 border-b border-line px-5.5 pt-5 pb-3.5'>
					{icon && (
						<span className='inline-flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-brand-soft text-brand-strong'>
							{icon}
						</span>
					)}
					<div className='min-w-0 flex-1'>
						<h2
							id={titleId}
							className='font-display text-xl leading-6.5 font-extrabold tracking-[-0.015em]'
						>
							{title}
						</h2>
						{subtitle && (
							<p className='text-[12.5px] leading-4.5 text-ink-muted'>
								{subtitle}
							</p>
						)}
					</div>
					<IconButton quiet size='sm' aria-label={t('close')} onClick={close}>
						<X size={16} aria-hidden='true' />
					</IconButton>
				</div>
				<div className='flex min-h-0 flex-auto flex-col gap-4.5 overflow-auto px-5.5 py-4.5 scrollbar-thin'>
					{children}
				</div>
				{footer && (
					<div className='flex shrink-0 flex-wrap items-center gap-2.5 rounded-b-3xl border-t border-line bg-raised px-5.5 py-3.5'>
						{footer}
					</div>
				)}
			</div>
		</Overlay>
	)
}
