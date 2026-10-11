import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

import { TONE_CLASS, type TTone } from './Tone'

type TBadgeProps = {
	tone?: TTone
	dot?: boolean
	className?: string
	children: ReactNode
}

export function Badge(props: TBadgeProps) {
	const { tone = 'neutral', dot, className, children } = props

	return (
		<span
			className={cn(
				'inline-flex items-center gap-1.25 whitespace-nowrap rounded-full px-2.25 text-xs leading-5 font-semibold',
				TONE_CLASS[tone],
				className,
			)}
		>
			{dot && <span className='size-1.5 rounded-full bg-current' />}
			{children}
		</span>
	)
}
