'use client'

import { useFieldError } from '@/shared/lib/form'

import { Field, type TFieldProps } from './Field'

type TFormFieldProps = Omit<TFieldProps, 'errorId'> & {
	/**
	 * Form path whose validation error is shown under the control
	 */
	name: string
}

/**
 * `Field` bound to the surrounding `FormProvider`: shows the field's error.
 * An explicit `error` (e.g. a server-side check) takes precedence.
 */
export function FormField(props: TFormFieldProps) {
	const { name, error, ...rest } = props

	const fieldError = useFieldError(name)

	return (
		<Field {...rest} error={error ?? fieldError} errorId={`${name}-error`} />
	)
}
