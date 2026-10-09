import type { InputHTMLAttributes } from 'react'

import { Search } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

interface SearchInputProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'size'
> {
	label: string
	/**
	 * `sm` sits inside cards on a raised fill
	 */
	size?: 'sm' | 'md'
	shortcut?: string
	className?: string
}

export function SearchInput({
	label,
	size = 'md',
	shortcut,
	className,
	placeholder,
	...props
}: SearchInputProps) {
	return (
		<label
			className={cn(
				'flex min-w-40 items-center gap-2 rounded-xl border border-line pr-1.5 pl-3 text-ink-muted transition-[border-color,box-shadow] duration-150 focus-within:border-brand focus-within:shadow-[0_0_0_3px_var(--brand-soft)]',
				size === 'md' ? 'h-10 bg-surface' : 'h-9 bg-raised',
				className,
			)}
		>
			<Search size={size === 'md' ? 17 : 16} aria-hidden='true' />
			<span className='sr-only'>{label}</span>
			<input
				type='search'
				placeholder={placeholder ?? label}
				className='h-full min-w-0 flex-grow border-0 bg-transparent text-ink outline-none'
				{...props}
			/>
			{shortcut && (
				<kbd className='shrink-0 rounded-md border border-line bg-raised px-1.5 font-mono text-[11px] leading-[18px] text-ink-muted'>
					{shortcut}
				</kbd>
			)}
		</label>
	)
}
