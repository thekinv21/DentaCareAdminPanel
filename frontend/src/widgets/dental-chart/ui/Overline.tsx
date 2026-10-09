import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

type TOverlineProps = {
	className?: string
	children: ReactNode
}

export function Overline({ className, children }: TOverlineProps) {
	return (
		<div
			className={cn(
				'text-[11px] leading-3.5 font-semibold tracking-[0.06em] text-ink-muted uppercase',
				className,
			)}
		>
			{children}
		</div>
	)
}
