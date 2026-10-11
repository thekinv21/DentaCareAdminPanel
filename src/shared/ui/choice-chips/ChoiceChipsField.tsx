'use client'

import {
	type Control,
	type FieldValues,
	type Path,
	useController,
} from 'react-hook-form'

import { ChoiceChips, type TChoiceChipsProps } from './ChoiceChips'

type TChoiceChipsFieldProps<
	TForm extends FieldValues,
	TTransformed extends FieldValues,
	T extends string | number,
> = Omit<TChoiceChipsProps<T>, 'value' | 'onChange'> & {
	name: Path<TForm>
	control?: Control<TForm, unknown, TTransformed>
}

/**
 * <ChoiceChips> bound to a react-hook-form field
 */
export function ChoiceChipsField<
	TForm extends FieldValues,
	TTransformed extends FieldValues,
	T extends string | number,
>(props: TChoiceChipsFieldProps<TForm, TTransformed, T>) {
	const { name, control, ...rest } = props

	const { field } = useController({ name, control })
	return <ChoiceChips {...rest} value={field.value} onChange={field.onChange} />
}
