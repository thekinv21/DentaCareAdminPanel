'use client'

import { cn } from '@/shared/lib/cn'

import { chipClass } from './ChipClass'
import type { TChipOption } from './ChoiceChips'

type TToggleChipsProps<T extends string | number> = {
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
	const { options, value, onChange, chipClassName, ...rest } = props

	const toggle = (id: T) =>
		onChange(value.includes(id) ? value.filter(v => v !== id) : [...value, id])

	return (
		<div
			role='group'
			aria-label={rest['aria-label']}
			className='flex flex-wrap gap-1.5'
		>
			{options.map(option => (
				<button
					key={option.id}
					type='button'
					aria-pressed={value.includes(option.id)}
					onClick={() => toggle(option.id)}
					className={cn(chipClass, chipClassName)}
				>
					{option.leading}
					{option.label}
					{option.trailing && (
						<span className='font-mono text-xs text-ink-muted'>
							{option.trailing}
						</span>
					)}
				</button>
			))}
		</div>
	)
}
