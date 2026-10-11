import type { CSSProperties } from 'react'

import { cn } from '@/shared/lib/cn'

type TProgressBarProps = {
	/**
	 * 0–100
	 */
	value: number
	label?: string
	/**
	 * Fill color class, e.g. `bg-warning`
	 */
	fillClass?: string
	delay?: number
	/**
	 * `md` is the thicker bar of progress dialogs
	 */
	size?: 'sm' | 'md'
	className?: string
}

export function ProgressBar(props: TProgressBarProps) {
	const {
		value,
		label,
		fillClass = 'bg-brand',
		delay = 0,
		size = 'sm',
		className,
	} = props

	const style: CSSProperties = {
		width: `${value}%`,
		animationDelay: `${delay}ms`,
	}
	return (
		<div
			className={cn(
				'overflow-hidden rounded-full bg-sunken',
				size === 'sm' ? 'h-1.5' : 'h-2',
				className,
			)}
			role={label ? 'progressbar' : undefined}
			aria-label={label}
			aria-valuenow={label ? Math.round(value) : undefined}
			aria-valuemin={label ? 0 : undefined}
			aria-valuemax={label ? 100 : undefined}
		>
			<span
				className={cn(
					'block h-full origin-left animate-grow rounded-full transition-[width] duration-150 ease-linear',
					fillClass,
				)}
				style={style}
			/>
		</div>
	)
}
