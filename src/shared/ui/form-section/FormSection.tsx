import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

type TFormSectionProps = {
	title: ReactNode
	/**
	 * Rendered after the divider line: a hint, a badge or buttons
	 */
	aside?: ReactNode
	danger?: boolean
	className?: string
	children: ReactNode
}

/**
 * Titled block of a long form: heading, hairline, then the fields
 */
export function FormSection(props: TFormSectionProps) {
	const { title, aside, danger, className, children } = props

	return (
		<section className={cn('flex flex-col gap-3', className)}>
			<div className='flex flex-wrap items-center gap-2.5'>
				<h3
					className={cn(
						'font-display text-[15px] leading-5 font-bold',
						danger && 'text-danger',
					)}
				>
					{title}
				</h3>
				<span className='h-px flex-1 bg-line' />
				{aside}
			</div>
			{children}
		</section>
	)
}
