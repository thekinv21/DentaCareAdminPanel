'use client'

import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

import { chipClass } from './ChipClass'
import { ChipContent } from './ChipContent'

export type TChipOption<T extends string | number> = {
	id: T
	label: ReactNode
	/**
	 * Rendered before the label (e.g. a color dot)
	 */
	leading?: ReactNode
	/**
	 * Rendered after the label in a muted mono font (e.g. a price)
	 */
	trailing?: ReactNode
}

export type TChoiceChipsProps<T extends string | number> = {
	options: TChipOption<T>[]
	value: T | null
	onChange: (value: T) => void
	'aria-label': string
	chipClassName?: string
}

/**
 * Single choice as a row of chips (radiogroup)
 */
export function ChoiceChips<T extends string | number>(
	props: TChoiceChipsProps<T>,
) {
	const {
		options,
		value,
		onChange,
		chipClassName,
		'aria-label': ariaLabel,
	} = props

	return (
		<div
			role='radiogroup'
			aria-label={ariaLabel}
			className='flex flex-wrap gap-1.5'
		>
			{options.map(option => (
				<button
					key={option.id}
					type='button'
					role='radio'
					aria-checked={option.id === value}
					onClick={() => onChange(option.id)}
					className={cn(chipClass, chipClassName)}
				>
					<ChipContent option={option} />
				</button>
			))}
		</div>
	)
}
