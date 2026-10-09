import type { CSSProperties } from 'react'

import { cn } from '@/shared/lib/cn'

interface ProgressBarProps {
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
	className?: string
}

export function ProgressBar({
	value,
	label,
	fillClass = 'bg-brand',
	delay = 0,
	className,
}: ProgressBarProps) {
	const style: CSSProperties = {
		width: `${value}%`,
		animationDelay: `${delay}ms`,
	}
	return (
		<div
			className={cn('h-1.5 overflow-hidden rounded-full bg-sunken', className)}
			role={label ? 'progressbar' : undefined}
			aria-label={label}
			aria-valuenow={label ? Math.round(value) : undefined}
			aria-valuemin={label ? 0 : undefined}
			aria-valuemax={label ? 100 : undefined}
		>
			<span
				className={cn(
					'block h-full origin-left animate-grow rounded-full',
					fillClass,
				)}
				style={style}
			/>
		</div>
	)
}
