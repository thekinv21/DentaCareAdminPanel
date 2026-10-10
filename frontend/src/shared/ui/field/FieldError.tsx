'use client'

import { useFieldError } from '@/shared/lib/form'

type TFieldErrorProps = { name: string }

/**
 * Validation error of a control that has its own label (switch cards, tables)
 */
export function FieldError({ name }: TFieldErrorProps) {
	const error = useFieldError(name)

	if (!error) return null

	return (
		<span id={`${name}-error`} className='text-xs font-semibold text-danger'>
			{error}
		</span>
	)
}
