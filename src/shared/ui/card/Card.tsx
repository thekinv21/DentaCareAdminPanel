import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

type TCardProps = HTMLAttributes<HTMLElement> & {
	as?: 'div' | 'section' | 'aside' | 'article'
	children: ReactNode
}

export function Card(props: TCardProps) {
	const { as: Tag = 'div', className, children, ...rest } = props

	return (
		<Tag
			className={cn(
				'flex min-w-0 flex-col gap-3.5 rounded-[20px] bg-surface p-4.5 shadow-clay-md',
				className,
			)}
			{...rest}
		>
			{children}
		</Tag>
	)
}

type TCardHeaderProps = {
	title?: ReactNode
	description?: ReactNode
	actions?: ReactNode
	className?: string
}

/**
 * Title + description on the left, actions on the right; wraps on narrow cards
 */
export function CardHeader(props: TCardHeaderProps) {
	const { title, description, actions, className } = props

	return (
		<div
			className={cn(
				'flex flex-wrap items-center justify-between gap-2.5',
				className,
			)}
		>
			{(title || description) && (
				<div className='min-w-0'>
					{title && (
						<h2 className='font-display text-base leading-5.5 font-bold'>
							{title}
						</h2>
					)}
					{description && (
						<p className='text-[12.5px] leading-4.5 text-ink-muted'>
							{description}
						</p>
					)}
				</div>
			)}
			{actions}
		</div>
	)
}
