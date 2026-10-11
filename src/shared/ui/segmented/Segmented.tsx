'use client'

import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

export type TSegmentedOption<T extends string> = {
	id: T
	label: ReactNode
	count?: ReactNode
}

export type TSegmentedProps<T extends string> = {
	options: TSegmentedOption<T>[]
	value: T
	onChange: (value: T) => void
	'aria-label': string
	size?: 'sm' | 'md'
	className?: string
}

/**
 * Sunken track with a raised clay thumb on the selected option (single choice)
 */
export function Segmented<T extends string>(props: TSegmentedProps<T>) {
	const {
		options,
		value,
		onChange,
		size = 'md',
		className,
		'aria-label': ariaLabel,
	} = props

	return (
		<div
			role='radiogroup'
			aria-label={ariaLabel}
			className={cn(
				'flex flex-wrap gap-0.75 rounded-xl bg-sunken p-0.75 shadow-press',
				className,
			)}
		>
			{options.map(option => (
				<SegmentedOption
					key={option.id}
					option={option}
					isSelected={option.id === value}
					size={size}
					onSelect={() => onChange(option.id)}
				/>
			))}
		</div>
	)
}

type TSegmentedOptionProps<T extends string> = {
	option: TSegmentedOption<T>
	isSelected: boolean
	size: 'sm' | 'md'
	onSelect: () => void
}

function SegmentedOption<T extends string>(props: TSegmentedOptionProps<T>) {
	const { option, isSelected, size, onSelect } = props

	return (
		<button
			type='button'
			role='radio'
			aria-checked={isSelected}
			onClick={onSelect}
			className={cn(
				'inline-flex items-center gap-1.5 whitespace-nowrap rounded-[9px] border-0 font-semibold transition-[background-color,box-shadow,color] duration-200',
				size === 'md' ? 'min-h-8 px-3 text-[13px]' : 'min-h-7 px-2.5 text-xs',
				isSelected
					? 'bg-surface text-ink shadow-clay-sm'
					: 'bg-transparent text-ink-muted hover:text-ink',
			)}
		>
			{option.label}
			{option.count !== undefined && (
				<span className='font-mono text-[11.5px] opacity-70'>
					{option.count}
				</span>
			)}
		</button>
	)
}
