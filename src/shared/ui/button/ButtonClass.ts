import { cn } from '@/shared/lib/cn'

export type TButtonVariant =
	| 'primary'
	| 'secondary'
	| 'ghost'
	| 'danger'
	| 'dangerOutline'
	| 'warning'
	| 'dangerGhost'
export type TButtonSize = 'sm' | 'md' | 'lg'

type TButtonClassOptions = {
	variant?: TButtonVariant
	size?: TButtonSize
	block?: boolean
	className?: string
}

const BASE =
	'inline-flex items-center justify-center gap-2 whitespace-nowrap border font-semibold no-underline transition-[transform,box-shadow,background-color,color] duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55'

const SIZE: Record<TButtonSize, string> = {
	sm: 'h-8 rounded-[10px] px-2.5 text-[13px]',
	md: 'h-10 rounded-xl px-3.5 text-sm',
	lg: 'h-12 rounded-[14px] px-4.5 text-[15px]',
}

const VARIANT: Record<TButtonVariant, string> = {
	primary:
		'border-transparent bg-brand text-on-brand shadow-brand hover:bg-brand-strong active:shadow-press',
	secondary:
		'border-line-strong bg-surface text-ink hover:bg-raised active:shadow-press',
	ghost: 'border-transparent bg-transparent text-ink hover:bg-raised',
	danger:
		'border-transparent bg-danger text-white shadow-danger hover:bg-danger-strong active:shadow-press',
	dangerOutline: 'border-line bg-surface text-danger hover:bg-danger-soft',
	warning:
		'border-transparent bg-warning text-white hover:brightness-95 active:shadow-press',
	dangerGhost:
		'border-transparent bg-transparent text-danger hover:bg-danger-soft',
}

/**
 * Class string for the clay button, shared by <Button> and next/link anchors
 */
export function buttonClass({
	variant = 'secondary',
	size = 'md',
	block,
	className,
}: TButtonClassOptions = {}): string {
	const raised = variant === 'secondary' && size !== 'sm'
	return cn(
		BASE,
		SIZE[size],
		VARIANT[variant],
		raised && 'shadow-clay-sm',
		block && 'w-full',
		className,
	)
}
