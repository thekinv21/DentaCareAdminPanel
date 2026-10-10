'use client'

import { cn } from '@/shared/lib/cn'

import { chipClass } from './ChipClass'
import { ChipContent } from './ChipContent'
import type { TChipOption } from './ChoiceChips'

export type TToggleChipsProps<T extends string | number> = {
	options: TChipOption<T>[]
	value: T[]
	onChange: (value: T[]) => void
	'aria-label': string
	chipClassName?: string
}

/**
 * Multiple choice as a row of pressable chips
 */
export function ToggleChips<T extends string | number>(
	props: TToggleChipsProps<T>,
) {
	const {
		options,
		value,
		onChange,
		chipClassName,
		'aria-label': ariaLabel,
	} = props

	const toggle = (id: T) =>
		onChange(
			value.includes(id)
				? value.filter(selectedId => selectedId !== id)
				: [...value, id],
		)

	return (
		<div role='group' aria-label={ariaLabel} className='flex flex-wrap gap-1.5'>
			{options.map(option => (
				<button
					key={option.id}
					type='button'
					aria-pressed={value.includes(option.id)}
					onClick={() => toggle(option.id)}
					className={cn(chipClass, chipClassName)}
				>
					<ChipContent option={option} />
				</button>
			))}
		</div>
	)
}
