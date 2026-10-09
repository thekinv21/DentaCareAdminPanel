'use client'

import type { ReactNode } from 'react'

import { Switch } from '@/shared/ui/switch'

type TSwitchCardProps = {
	label: string
	hint?: ReactNode
	checked?: boolean
	onChange?: (checked: boolean) => void
	/**
	 * Replaces the switch (e.g. a "Reset password" button)
	 */
	action?: ReactNode
	'aria-label'?: string
}

/**
 * Bordered box with a title, a hint and a switch on the right
 */
export function SwitchCard(props: TSwitchCardProps) {
	const { label, hint, checked = false, onChange, action, ...rest } = props

	return (
		<div className='flex items-center gap-3 rounded-xl border border-line px-3 py-2.5'>
			<span className='min-w-0 flex-1'>
				<span className='block font-semibold'>{label}</span>
				{hint && (
					<span className='block text-[12.5px] leading-4.5 text-ink-muted'>
						{hint}
					</span>
				)}
			</span>
			{action ??
				(onChange && (
					<Switch
						checked={checked}
						onChange={onChange}
						aria-label={rest['aria-label'] ?? label}
					/>
				))}
		</div>
	)
}
