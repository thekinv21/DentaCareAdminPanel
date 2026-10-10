'use client'

import { useController } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { RadioDot } from '@/shared/ui/radio-card'

import { ConfirmSection } from './ConfirmSection'
import type { TConfirmOptions } from './ConfirmTypes'
import type { TConfirmDialogModel } from './useConfirmDialog'

type TChoice = NonNullable<TConfirmOptions['choice']>

type TConfirmChoiceProps = {
	choice: TChoice
	control: TConfirmDialogModel['control']
}

/**
 * Pick one variant, e.g. the new role for the staff of a deleted role
 */
export function ConfirmChoice({ choice, control }: TConfirmChoiceProps) {
	const { field } = useController({ control, name: 'choice' })

	return (
		<ConfirmSection label={choice.label}>
			<div role='radiogroup' aria-label={choice.label} className='grid gap-1.5'>
				{choice.items.map(item => (
					<ChoiceOption
						key={item.id}
						item={item}
						isChecked={field.value === item.id}
						onSelect={() => field.onChange(item.id)}
					/>
				))}
			</div>
		</ConfirmSection>
	)
}

type TChoiceOptionProps = {
	item: TChoice['items'][number]
	isChecked: boolean
	onSelect: () => void
}

function ChoiceOption({ item, isChecked, onSelect }: TChoiceOptionProps) {
	return (
		<button
			type='button'
			role='radio'
			aria-checked={isChecked}
			onClick={onSelect}
			className={cn(
				'flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left text-ink',
				isChecked ? 'border-brand bg-brand-soft' : 'border-line bg-surface',
			)}
		>
			<RadioDot checked={isChecked} className='mt-px' />
			<span>
				<span className='block font-semibold'>{item.label}</span>
				{item.hint && (
					<span className='block text-[12.5px] text-ink-muted'>
						{item.hint}
					</span>
				)}
			</span>
		</button>
	)
}
