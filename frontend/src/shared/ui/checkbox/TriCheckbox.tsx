'use client'

import { Check, Minus } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

export type TCheckState = boolean | 'mixed'

type TTriCheckboxProps = {
	checked: TCheckState
	onChange: () => void
	'aria-label': string
}

/**
 * Checkbox with an indeterminate state, for "select the whole row/column"
 */
export function TriCheckbox({ checked, onChange, ...rest }: TTriCheckboxProps) {
	const on = checked !== false

	return (
		<button
			type='button'
			role='checkbox'
			aria-checked={checked}
			aria-label={rest['aria-label']}
			onClick={onChange}
			className={cn(
				'inline-flex size-5 shrink-0 items-center justify-center rounded-md border-[1.5px] p-0 transition-colors duration-150',
				on
					? 'border-brand bg-brand text-on-brand'
					: 'border-line-strong bg-surface text-transparent hover:border-brand',
			)}
		>
			{checked === 'mixed' ? (
				<Minus size={13} strokeWidth={3} aria-hidden='true' />
			) : (
				<Check size={13} strokeWidth={3} aria-hidden='true' />
			)}
		</button>
	)
}
