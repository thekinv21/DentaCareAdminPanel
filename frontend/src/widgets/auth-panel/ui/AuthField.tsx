'use client'

import type { ReactNode } from 'react'

import { useFieldError } from '@/shared/lib/form'

type TAuthFieldProps = {
	/**
	 * Form path of the control; also the `id` its label points to
	 */
	name: string
	label: string
	hint?: string
	aside?: ReactNode
	children: ReactNode
}

/**
 * Label, control and validation error of an auth form in a `FormProvider`
 */
export function AuthField(props: TAuthFieldProps) {
	const { name, label, hint, aside, children } = props

	const error = useFieldError(name)
	return (
		<div className='flex flex-col gap-1.5'>
			<div className='flex items-baseline justify-between'>
				<label htmlFor={name} className='text-[13px] leading-4.5 font-semibold'>
					{label}
				</label>
				{aside}
			</div>
			{children}
			{error ? (
				<span
					id={`${name}-error`}
					className='text-[12.5px] leading-4.5 text-danger'
				>
					{error}
				</span>
			) : (
				hint && (
					<span className='text-[12.5px] leading-4.5 text-ink-muted'>
						{hint}
					</span>
				)
			)}
		</div>
	)
}
