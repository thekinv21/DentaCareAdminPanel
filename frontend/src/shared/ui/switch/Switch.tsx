'use client'

import { cn } from '@/shared/lib/cn'

interface SwitchProps {
	checked: boolean
	onChange: (checked: boolean) => void
	'aria-label': string
	disabled?: boolean
	size?: 'sm' | 'md'
}

export function Switch({
	checked,
	onChange,
	disabled,
	size = 'sm',
	...props
}: SwitchProps) {
	return (
		<button
			type='button'
			role='switch'
			aria-checked={checked}
			aria-label={props['aria-label']}
			disabled={disabled}
			onClick={() => onChange(!checked)}
			className={cn(
				'relative shrink-0 rounded-full p-0 shadow-press transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-55',
				size === 'sm' ? 'h-6 w-10' : 'h-7 w-[46px]',
				checked ? 'bg-brand' : 'bg-line-strong',
			)}
		>
			<span
				className={cn(
					'absolute top-[3px] left-[3px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform duration-[260ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
					size === 'sm' ? 'size-[18px]' : 'size-[22px]',
					checked && (size === 'sm' ? 'translate-x-4' : 'translate-x-[18px]'),
				)}
			/>
		</button>
	)
}
