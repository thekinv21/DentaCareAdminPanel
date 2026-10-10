'use client'

import {
	type FieldValues,
	type Path,
	useFormContext,
	useFormState,
} from 'react-hook-form'

import { errorKeyOf } from './ErrorKey'

/**
 * `register` of the surrounding `FormProvider` plus the aria attributes that
 * link an input to its error message
 */
export function useFieldProps<TValues extends FieldValues>() {
	const { register, control } = useFormContext<TValues>()

	const { errors } = useFormState({ control })

	return (name: Path<TValues>) => {
		const invalid = !!errorKeyOf(errors, name)

		return {
			...register(name),
			'aria-invalid': invalid,
			'aria-describedby': invalid ? `${name}-error` : undefined,
		}
	}
}
