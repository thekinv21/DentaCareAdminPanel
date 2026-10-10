import { Check, Minus } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

export type TCheckState = boolean | 'mixed'

type TCheckMarkProps = { state: TCheckState; className?: string }

/**
 * The square of a custom checkbox; the clickable element is its parent
 */
export function CheckMark({ state, className }: TCheckMarkProps) {
	const isChecked = state !== false

	return (
		<span
			className={cn(
				'inline-flex size-5 shrink-0 items-center justify-center rounded-md border-[1.5px] transition-colors duration-150',
				isChecked
					? 'border-brand bg-brand text-on-brand'
					: 'border-line-strong bg-surface text-transparent',
				className,
			)}
		>
			{state === 'mixed' ? (
				<Minus size={13} strokeWidth={3} aria-hidden='true' />
			) : (
				<Check size={13} strokeWidth={3} aria-hidden='true' />
			)}
		</span>
	)
}
