import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

type TOverlineTone = 'muted' | 'subtle' | 'accent' | 'danger'

const OVERLINE_TONE_CLASS: Record<TOverlineTone, string> = {
	muted: 'text-ink-muted',
	subtle: 'text-ink-subtle',
	accent: 'text-accent',
	danger: 'text-danger',
}

/**
 * Typography of the small uppercase caption, for elements that can't be an <Overline>
 * (e.g. table header cells)
 */
export const overlineClass =
	'text-[11px] leading-3.5 font-semibold tracking-[0.06em] uppercase'

type TOverlineProps = {
	/**
	 * Rendered element; a heading when it titles a section
	 */
	as?: 'div' | 'span' | 'p' | 'h2' | 'h3'
	tone?: TOverlineTone
	className?: string
	children: ReactNode
}

/**
 * Small uppercase caption above a section or a value
 */
export function Overline(props: TOverlineProps) {
	const { as: Tag = 'div', tone = 'muted', className, children } = props

	return (
		<Tag className={cn(overlineClass, OVERLINE_TONE_CLASS[tone], className)}>
			{children}
		</Tag>
	)
}
