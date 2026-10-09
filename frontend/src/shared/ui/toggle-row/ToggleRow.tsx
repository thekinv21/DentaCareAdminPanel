'use client'

import type { ReactNode } from 'react'

import { Switch } from '@/shared/ui/switch'

interface ToggleRowProps {
	label: string
	hint?: ReactNode
	checked: boolean
	onChange: (checked: boolean) => void
	/**
	 * Rendered between the text and the switch (e.g. a channel badge)
	 */
	meta?: ReactNode
	leading?: ReactNode
	disabled?: boolean
}

/**
 * Settings row: text on the left, switch on the right, hairline between rows
 */
export function ToggleRow({
	label,
	hint,
	checked,
	onChange,
	meta,
	leading,
	disabled,
}: ToggleRowProps) {
	return (
		<div className='flex items-center gap-3.5 border-b border-line py-3 last:border-b-0'>
			{leading}
			<div className='min-w-0 flex-grow'>
				<div className='font-semibold'>{label}</div>
				{hint && (
					<p className='text-[12.5px] leading-[18px] text-ink-muted'>{hint}</p>
				)}
			</div>
			{meta}
			<Switch
				checked={checked}
				onChange={onChange}
				aria-label={label}
				disabled={disabled}
			/>
		</div>
	)
}
