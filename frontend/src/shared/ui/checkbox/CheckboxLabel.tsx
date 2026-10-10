import type { InputHTMLAttributes, ReactNode } from 'react'

type TCheckboxLabelProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type' | 'children'
> & { children: ReactNode }

/**
 * Native checkbox with its text; spread `register(...)` into it
 */
export function CheckboxLabel(props: TCheckboxLabelProps) {
	const { children, ...rest } = props

	return (
		<label className='inline-flex min-h-6 cursor-pointer items-start gap-2.5 text-sm leading-5'>
			<input
				type='checkbox'
				className='mt-px size-4.5 shrink-0 accent-brand'
				{...rest}
			/>
			<span>{children}</span>
		</label>
	)
}
