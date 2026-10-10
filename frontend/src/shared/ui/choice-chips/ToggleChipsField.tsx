'use client'

import {
	type Control,
	type FieldValues,
	type Path,
	useController,
} from 'react-hook-form'

import { ToggleChips, type TToggleChipsProps } from './ToggleChips'

type TToggleChipsFieldProps<
	TForm extends FieldValues,
	TTransformed extends FieldValues,
	T extends string | number,
> = Omit<TToggleChipsProps<T>, 'value' | 'onChange'> & {
	name: Path<TForm>
	control?: Control<TForm, unknown, TTransformed>
}

/**
 * <ToggleChips> bound to an array field of react-hook-form
 */
export function ToggleChipsField<
	TForm extends FieldValues,
	TTransformed extends FieldValues,
	T extends string | number,
>(props: TToggleChipsFieldProps<TForm, TTransformed, T>) {
	const { name, control, ...rest } = props

	const { field } = useController({ name, control })
	return <ToggleChips {...rest} value={field.value} onChange={field.onChange} />
}
