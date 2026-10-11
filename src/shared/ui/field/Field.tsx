import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

export type TFieldProps = {
	label: ReactNode
	hint?: ReactNode
	/**
	 * Display-ready error text; replaces the hint while present
	 */
	error?: string
	/**
	 * Id of the error text, referenced by the input's `aria-describedby`
	 */
	errorId?: string
	required?: boolean
	/**
	 * `div` for groups of buttons (chips, swatches) that must not sit inside a label
	 */
	as?: 'label' | 'div'
	/**
	 * Id of the control: the label points to it instead of wrapping it
	 */
	htmlFor?: string
	/**
	 * Shown at the end of the label row, e.g. a "Forgot password?" link
	 */
	aside?: ReactNode
	/**
	 * `lg` is the bigger label of the auth screens
	 */
	size?: 'md' | 'lg'
	className?: string
	children: ReactNode
}

const LABEL_SIZE_CLASS = {
	md: 'text-[12.5px] leading-4 text-ink-muted',
	lg: 'text-[13px] leading-4.5 text-ink',
}

/**
 * Label with its control, a hint and the validation error
 */
export function Field(props: TFieldProps) {
	const {
		label,
		hint,
		error,
		errorId,
		required,
		as = 'label',
		htmlFor,
		aside,
		size = 'md',
		className,
		children,
	} = props

	const Tag = htmlFor ? 'div' : as
	const LabelTag = htmlFor ? 'label' : 'span'
	const labelText = (
		<LabelTag
			htmlFor={htmlFor}
			className={cn('font-semibold', LABEL_SIZE_CLASS[size])}
		>
			{label}
			{required && <b className='font-bold text-danger'> *</b>}
		</LabelTag>
	)

	return (
		<Tag className={cn('flex min-w-0 flex-col gap-1.5', className)}>
			{aside ? (
				<span className='flex items-baseline justify-between'>
					{labelText}
					{aside}
				</span>
			) : (
				labelText
			)}
			{children}
			{error ? (
				<span
					id={errorId}
					className='text-xs leading-4 font-semibold text-danger'
				>
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
