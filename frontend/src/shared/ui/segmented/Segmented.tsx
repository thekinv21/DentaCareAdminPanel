'use client'

import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

export interface SegmentedOption<T extends string> {
	id: T
	label: ReactNode
	count?: ReactNode
}

interface SegmentedProps<T extends string> {
	options: SegmentedOption<T>[]
	value: T
	onChange: (value: T) => void
	'aria-label': string
	size?: 'sm' | 'md'
	className?: string
}

/**
 * Sunken track with a raised clay thumb on the selected tab
 */
export function Segmented<T extends string>({
	options,
	value,
	onChange,
	size = 'md',
	className,
	...props
}: SegmentedProps<T>) {
	return (
		<div
			role='tablist'
			aria-label={props['aria-label']}
			className={cn(
				'flex flex-wrap gap-[3px] rounded-xl bg-sunken p-[3px] shadow-press',
				className,
			)}
		>
			{options.map(option => {
				const selected = option.id === value
				return (
					<button
						key={option.id}
						type='button'
						role='tab'
						aria-selected={selected}
						onClick={() => onChange(option.id)}
						className={cn(
							'inline-flex items-center gap-1.5 whitespace-nowrap rounded-[9px] border-0 font-semibold transition-[background-color,box-shadow,color] duration-200',
							size === 'md'
								? 'min-h-8 px-3 text-[13px]'
								: 'min-h-7 px-2.5 text-xs',
							selected
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
			})}
		</div>
	)
}
