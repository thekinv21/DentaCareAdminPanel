'use client'

import { CheckMark } from './CheckMark'

type TCheckboxOptionProps = {
	checked: boolean
	onChange: (checked: boolean) => void
	label: string
	hint?: string
}

/**
 * Checkbox with a bold label and an optional muted hint under it
 */
export function CheckboxOption(props: TCheckboxOptionProps) {
	const { checked, onChange, label, hint } = props

	return (
		<button
			type='button'
			role='checkbox'
			aria-checked={checked}
			onClick={() => onChange(!checked)}
			className='flex items-start gap-2.5 border-0 bg-transparent py-1.5 text-left text-ink'
		>
			<CheckMark state={checked} />
			<span>
				<span className='block font-semibold'>{label}</span>
				{hint && (
					<span className='block text-[12.5px] text-ink-muted'>{hint}</span>
				)}
			</span>
		</button>
	)
}
