'use client'

import { ChevronDown, Globe } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

import { useLanguageMenu } from '../model/useLanguageMenu'
import { LanguageOption } from './LanguageOption'

type TLanguageSwitcherProps = {
	/**
	 * `compact` shows the code (header), `full` shows the language name (auth screens)
	 */
	variant?: 'compact' | 'full'
}

export function LanguageSwitcher({
	variant = 'compact',
}: TLanguageSwitcherProps) {
	const { rootRef, isOpen, toggle, options, current, pick, label } =
		useLanguageMenu()

	return (
		<div ref={rootRef} className='relative'>
			<button
				type='button'
				aria-haspopup='listbox'
				aria-expanded={isOpen}
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

			{isOpen && (
				<ul
					role='listbox'
					aria-label={label}
					className='absolute top-11.5 right-0 z-30 min-w-52.5 animate-pop rounded-[14px] border border-line bg-surface p-1.5 shadow-float'
				>
					{options.map(option => (
						<LanguageOption
							key={option.id}
							option={option}
							onPick={() => pick(option.id)}
						/>
					))}
				</ul>
			)}
		</div>
	)
}
