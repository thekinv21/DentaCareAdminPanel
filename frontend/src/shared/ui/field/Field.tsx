import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

type TFieldProps = {
	label: ReactNode
	hint?: ReactNode
	/**
	 * Display-ready error text; replaces the hint while present
	 */
	error?: string
	required?: boolean
	/**
	 * `div` for groups of buttons (chips, swatches) that must not sit inside a label
	 */
	as?: 'label' | 'div'
	className?: string
	children: ReactNode
}

/**
 * Label wrapping its control, so clicking the label focuses the input
 */
export function Field(props: TFieldProps) {
	const {
		label,
		hint,
		error,
		required,
		as: Tag = 'label',
		className,
		children,
	} = props

	return (
		<Tag className={cn('flex min-w-0 flex-col gap-1.5', className)}>
			<span className='text-[12.5px] leading-4 font-semibold text-ink-muted'>
				{label}
				{required && <b className='font-bold text-danger'> *</b>}
			</span>
			{children}
			{error ? (
				<span className='text-xs leading-4 font-semibold text-danger'>
					{error}
				</span>
			) : (
				hint && (
					<span className='text-[12.5px] leading-4.5 text-ink-muted'>
						{hint}
					</span>
				)
			)}
		</Tag>
	)
}
