import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/shared/lib/cn'

type TIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	'aria-label': string
	size?: 'sm' | 'md'
	/**
	 * Borderless, muted variant for table row actions
	 */
	quiet?: boolean
	round?: boolean
}

export function IconButton(props: TIconButtonProps) {
	const {
		size = 'md',
		quiet,
		round,
		className,
		type = 'button',
		...rest
	} = props

	return (
		<button
			type={type}
			className={cn(
				'relative inline-flex shrink-0 items-center justify-center gap-1.5 border transition-colors hover:bg-raised disabled:cursor-not-allowed disabled:opacity-45',
				round ? 'rounded-full' : 'rounded-xl',
				size === 'md' ? 'h-10 min-w-10' : 'h-8 min-w-8',
				quiet
					? 'border-transparent bg-transparent text-ink-muted'
					: 'border-line bg-surface text-ink',
				className,
			)}
			{...rest}
		/>
	)
}
