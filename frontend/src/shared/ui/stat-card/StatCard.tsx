import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'
import { Card } from '@/shared/ui/card'

interface StatCardProps {
	label: string
	value: ReactNode
	unit?: string
	footer?: ReactNode
	icon?: ReactNode
	/**
	 * Text color class for the value, e.g. `text-danger`
	 */
	valueClass?: string
	delay?: number
	children?: ReactNode
}

/**
 * KPI tile: overline label, big tabular number, one line of context
 */
export function StatCard({
	label,
	value,
	unit,
	footer,
	icon,
	valueClass,
	delay = 0,
	children,
}: StatCardProps) {
	return (
		<Card
			className='animate-rise gap-2'
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className='flex items-center justify-between gap-2.5'>
				<span className='text-[11px] leading-3.5 font-semibold tracking-[0.06em] text-ink-muted uppercase'>
					{label}
				</span>
				{icon}
			</div>
			<div
				className={cn(
					'font-display text-2xl leading-7.5 font-extrabold tracking-[-0.02em] whitespace-nowrap tabular-nums',
					valueClass,
				)}
			>
				{value}
				{unit && <span className='text-[15px]'> {unit}</span>}
			</div>
			{children}
			{footer && (
				<p className='text-[12.5px] leading-4.5 text-ink-muted'>{footer}</p>
			)}
		</Card>
	)
}

/**
 * Responsive grid of StatCards
 */
export function StatGrid({
	label,
	children,
}: {
	label: string
	children: ReactNode
}) {
	return (
		<section
			aria-label={label}
			className='grid shrink-0 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4'
		>
			{children}
		</section>
	)
}

/**
 * Green "+12%" delta used in StatCard footers
 */
export function Delta({ children }: { children: ReactNode }) {
	return <span className='font-semibold text-success'>{children}</span>
}
