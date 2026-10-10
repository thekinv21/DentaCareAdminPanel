'use client'

import { cn } from '@/shared/lib/cn'

type TSwitchProps = {
	checked: boolean
	onChange: (checked: boolean) => void
	'aria-label': string
	disabled?: boolean
	size?: 'sm' | 'md'
}

export function Switch(props: TSwitchProps) {
	const {
		checked,
		onChange,
		disabled,
		size = 'sm',
		'aria-label': ariaLabel,
	} = props

	return (
		<button
			type='button'
			role='switch'
			aria-checked={checked}
			aria-label={ariaLabel}
			disabled={disabled}
			onClick={() => onChange(!checked)}
			className={cn(
				'relative shrink-0 rounded-full p-0 shadow-press transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-55',
				size === 'sm' ? 'h-6 w-10' : 'h-7 w-11.5',
				checked ? 'bg-brand' : 'bg-line-strong',
			)}
		>
			<span
				className={cn(
					'absolute top-0.75 left-0.75 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform duration-260 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
					size === 'sm' ? 'size-4.5' : 'size-5.5',
					checked && (size === 'sm' ? 'translate-x-4' : 'translate-x-4.5'),
				)}
			/>
		</button>
	)
}
