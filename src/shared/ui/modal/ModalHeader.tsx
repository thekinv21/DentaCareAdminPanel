'use client'

import type { ReactNode } from 'react'

import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { IconButton } from '@/shared/ui/icon-button'

type TModalHeaderProps = {
	titleId: string
	title: ReactNode
	subtitle?: ReactNode
	icon?: ReactNode
	onClose: () => void
}

/**
 * Icon tile, title, subtitle and the close button of a modal
 */
export function ModalHeader(props: TModalHeaderProps) {
	const { titleId, title, subtitle, icon, onClose } = props

	const t = useTranslations('Common')
	return (
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
					<p className='text-[12.5px] leading-4.5 text-ink-muted'>{subtitle}</p>
				)}
			</div>
			<IconButton quiet size='sm' aria-label={t('close')} onClick={onClose}>
				<X size={16} aria-hidden='true' />
			</IconButton>
		</div>
	)
}
