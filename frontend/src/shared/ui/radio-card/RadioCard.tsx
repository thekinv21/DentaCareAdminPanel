'use client'

import { cn } from '@/shared/lib/cn'

type TRadioCardProps = {
	code: string
	title: string
	note: string
	checked: boolean
	onSelect: () => void
}

/**
 * Large selectable option with a code tile and a radio dot
 */
export function RadioCard(props: TRadioCardProps) {
	const { code, title, note, checked, onSelect } = props

	return (
		<button
			type='button'
			role='radio'
			aria-checked={checked}
			onClick={onSelect}
			className={cn(
				'flex items-center gap-3 rounded-2xl p-3.5 text-left text-ink',
				checked
					? 'border-2 border-brand bg-brand-soft'
					: 'border border-line bg-surface hover:bg-raised',
			)}
		>
			<span className='inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-sunken font-mono text-[11px] font-bold tracking-[0.02em] text-ink'>
				{code}
			</span>
			<span className='grow'>
				<span className='block font-bold'>{title}</span>
				<span className='block text-[12.5px] leading-4.5 text-ink-muted'>
					{note}
				</span>
			</span>
			<span
				className={cn(
					'size-4.5 shrink-0 rounded-full',
					checked
						? 'border-[5px] border-brand bg-surface'
						: 'border-2 border-line-strong',
				)}
			/>
		</button>
	)
}
