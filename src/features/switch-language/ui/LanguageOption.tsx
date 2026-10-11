import { Check } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

import type { TLanguageOption } from '../model/useLanguageMenu'

type TLanguageOptionProps = {
	option: TLanguageOption
	onPick: () => void
}

export function LanguageOption({ option, onPick }: TLanguageOptionProps) {
	return (
		<li>
			<button
				type='button'
				role='option'
				aria-selected={option.isSelected}
				onClick={onPick}
				className={cn(
					'flex min-h-9.5 w-full items-center gap-2.5 rounded-[10px] border-0 bg-transparent px-2.5 text-left hover:bg-raised',
					option.isSelected && 'font-semibold text-brand-strong',
				)}
			>
				<span className='grow'>{option.name}</span>
				<span className='font-mono text-[11px] text-ink-muted'>
					{option.code}
				</span>
				<span className='w-3.5 text-brand'>
					{option.isSelected && <Check size={14} aria-hidden='true' />}
				</span>
			</button>
		</li>
	)
}
