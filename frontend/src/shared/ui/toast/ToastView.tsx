'use client'

import { Check, Undo2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'

import type { TToast } from './ToastContext'

type TToastViewProps = {
	toast: TToast
	onUndo: () => void
}

export function ToastView({ toast, onUndo }: TToastViewProps) {
	const t = useTranslations('Confirm')
	return (
		<div
			role='status'
			className='fixed right-6 bottom-6 z-70 flex min-w-80 animate-pop items-center gap-2.5 overflow-hidden rounded-2xl bg-ink py-2.5 pr-2.5 pl-3 font-semibold text-surface shadow-float max-mobile:right-2.5 max-mobile:left-2.5 max-mobile:min-w-0'
		>
			<span
				className={cn(
					'flex size-6.5 shrink-0 items-center justify-center rounded-full text-white',
					toast.tone === 'warning' ? 'bg-warning' : 'bg-success',
				)}
			>
				<Check size={15} strokeWidth={2.6} aria-hidden='true' />
			</span>
			<span className='min-w-0 flex-1'>{toast.text}</span>
			{toast.onUndo && (
				<>
					<button
						type='button'
						onClick={onUndo}
						className='ml-2 inline-flex h-7.5 items-center gap-1.5 rounded-[9px] border border-white/25 bg-transparent px-3 font-bold text-inherit'
					>
						<Undo2 size={14} aria-hidden='true' />
						{t('undo')}
					</button>
					<span className='absolute inset-x-0 bottom-0 h-0.75 bg-white/12'>
						<span className='block h-full origin-left animate-drain bg-brand' />
					</span>
				</>
			)}
		</div>
	)
}
