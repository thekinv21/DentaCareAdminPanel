import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

type TFieldProps = {
	label: ReactNode
	hint?: ReactNode
	className?: string
	children: ReactNode
}

/**
 * Label wrapping its control, so clicking the label focuses the input
 */
export function Field(props: TFieldProps) {
	const { label, hint, className, children } = props

	return (
		<label className={cn('flex min-w-0 flex-col gap-1.5', className)}>
			<span className='text-[12.5px] leading-4 font-semibold text-ink-muted'>
				{label}
			</span>
			{children}
			{hint && (
				<span className='text-[12.5px] leading-4.5 text-ink-muted'>{hint}</span>
			)}
		</label>
	)
}
