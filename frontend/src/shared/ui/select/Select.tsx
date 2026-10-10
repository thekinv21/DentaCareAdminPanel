import type { ComponentProps } from 'react'

import { ChevronDown } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

type TSelectSize = 'sm' | 'md' | 'lg'

type TSelectProps = Omit<ComponentProps<'select'>, 'size'> & {
	/**
	 * `sm` for table footers, `md` for forms, `lg` for the clay auth screens
	 */
	size?: TSelectSize
}

const SIZE_CLASS: Record<TSelectSize, string> = {
	sm: 'h-8 rounded-[10px] pr-7 pl-2.5 text-[12.5px]',
	md: 'h-10 rounded-[10px] pr-9 pl-3',
	lg: 'h-12 rounded-xl pr-10 pl-3.5 text-[15px] shadow-clay-sm',
}

const ICON_CLASS: Record<TSelectSize, string> = {
	sm: 'right-2',
	md: 'right-3',
	lg: 'right-3.5',
}

/**
 * Native select with the field styles and one chevron in every browser;
 * fills its container like the other inputs
 */
export function Select(props: TSelectProps) {
	const { size = 'md', className, children, ...rest } = props

	return (
		<span className={cn('relative flex', className)}>
			<select
				className={cn(
					'w-full min-w-0 cursor-pointer appearance-none border border-line-strong bg-surface text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-brand focus:shadow-[0_0_0_3px_var(--brand-soft)] disabled:cursor-not-allowed disabled:opacity-45 aria-invalid:border-danger',
					SIZE_CLASS[size],
				)}
				{...rest}
			>
				{children}
			</select>
			<ChevronDown
				size={size === 'sm' ? 14 : 16}
				aria-hidden='true'
				className={cn(
					'pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-muted',
					ICON_CLASS[size],
				)}
			/>
		</span>
	)
}
