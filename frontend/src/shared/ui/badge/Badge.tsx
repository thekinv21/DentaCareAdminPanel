import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

import { type Tone, TONE_CLASS } from './tone'

interface BadgeProps {
	tone?: Tone
	dot?: boolean
	className?: string
	children: ReactNode
}

export function Badge({
	tone = 'neutral',
	dot,
	className,
	children,
}: BadgeProps) {
	return (
		<span
			className={cn(
				'inline-flex items-center gap-[5px] whitespace-nowrap rounded-full px-[9px] text-xs leading-5 font-semibold',
				TONE_CLASS[tone],
				className,
			)}
		>
			{dot && <span className='size-1.5 rounded-full bg-current' />}
			{children}
		</span>
	)
}
