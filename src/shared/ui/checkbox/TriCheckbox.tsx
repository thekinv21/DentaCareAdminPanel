'use client'

import { CheckMark, type TCheckState } from './CheckMark'

type TTriCheckboxProps = {
	checked: TCheckState
	onChange: () => void
	'aria-label': string
}

/**
 * Checkbox with an indeterminate state, for "select the whole row/column"
 */
export function TriCheckbox({
	checked,
	onChange,
	'aria-label': ariaLabel,
}: TTriCheckboxProps) {
	return (
		<button
			type='button'
			role='checkbox'
			aria-checked={checked}
			aria-label={ariaLabel}
			onClick={onChange}
			className='group inline-flex shrink-0 p-0'
		>
			<CheckMark
				state={checked}
				className={checked === false ? 'group-hover:border-brand' : undefined}
			/>
		</button>
	)
}
