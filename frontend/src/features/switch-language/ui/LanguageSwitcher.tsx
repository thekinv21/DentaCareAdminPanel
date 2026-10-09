'use client'

import { Check, ChevronDown, Globe } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

import { useLanguageMenu } from '../model/use-language-menu'

interface LanguageSwitcherProps {
	/**
	 * `compact` shows the code (header), `full` shows the language name (auth screens)
	 */
	variant?: 'compact' | 'full'
}

export function LanguageSwitcher({
	variant = 'compact',
}: LanguageSwitcherProps) {
	const { rootRef, open, toggle, options, current, pick, label } =
		useLanguageMenu()

	return (
		<div ref={rootRef} className='relative'>
			<button
				type='button'
				aria-haspopup='listbox'
				aria-expanded={open}
				aria-label={label}
				onClick={toggle}
				className={cn(
					'inline-flex h-10 items-center gap-1.5 rounded-xl border border-line bg-surface text-ink transition-colors hover:bg-raised',
					variant === 'compact' ? 'px-2.5' : 'px-3',
				)}
			>
				<Globe size={17} aria-hidden='true' />
				{variant === 'compact' ? (
					<span className='font-mono text-xs font-semibold'>
						{current.code}
					</span>
				) : (
					<>
						<span className='text-sm font-semibold'>{current.name}</span>
						<ChevronDown size={14} aria-hidden='true' />
					</>
				)}
			</button>

			{open && (
				<ul
					role='listbox'
					aria-label={label}
					className='absolute top-[46px] right-0 z-30 min-w-[210px] animate-pop rounded-[14px] border border-line bg-surface p-1.5 shadow-float'
				>
					{options.map(option => (
						<li key={option.id}>
							<button
								type='button'
								role='option'
								aria-selected={option.selected}
								onClick={() => pick(option.id)}
								className={cn(
									'flex min-h-[38px] w-full items-center gap-2.5 rounded-[10px] border-0 bg-transparent px-2.5 text-left hover:bg-raised',
									option.selected && 'font-semibold text-brand-strong',
								)}
							>
								<span className='flex-grow'>{option.name}</span>
								<span className='font-mono text-[11px] text-ink-muted'>
									{option.code}
								</span>
								<span className='w-3.5 text-brand'>
									{option.selected && <Check size={14} aria-hidden='true' />}
								</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
