import { cn } from '@/shared/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonClassOptions {
	variant?: ButtonVariant
	size?: ButtonSize
	block?: boolean
	className?: string
}

const BASE =
	'inline-flex items-center justify-center gap-2 whitespace-nowrap border font-semibold no-underline transition-[transform,box-shadow,background-color,color] duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55'

const SIZE: Record<ButtonSize, string> = {
	sm: 'h-8 rounded-[10px] px-2.5 text-[13px]',
	md: 'h-10 rounded-xl px-3.5 text-sm',
	lg: 'h-12 rounded-[14px] px-4.5 text-[15px]',
}

const VARIANT: Record<ButtonVariant, string> = {
	primary:
		'border-transparent bg-brand text-on-brand shadow-brand hover:bg-brand-strong active:shadow-press',
	secondary:
		'border-line-strong bg-surface text-ink hover:bg-raised active:shadow-press',
	ghost: 'border-transparent bg-transparent text-ink hover:bg-raised',
	danger: 'border-line bg-surface text-danger hover:bg-danger-soft',
}

/**
 * Class string for the clay button, shared by <Button> and next/link anchors
 */
export function buttonClass({
	variant = 'secondary',
	size = 'md',
	block,
	className,
}: ButtonClassOptions = {}): string {
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
