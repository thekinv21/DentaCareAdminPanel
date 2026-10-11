'use client'

import {
	type Control,
	type FieldValues,
	type Path,
	useController,
} from 'react-hook-form'

import { Segmented, type TSegmentedProps } from './Segmented'

type TSegmentedFieldProps<
	TForm extends FieldValues,
	TTransformed extends FieldValues,
	T extends string,
> = Omit<TSegmentedProps<T>, 'value' | 'onChange'> & {
	name: Path<TForm>
	control?: Control<TForm, unknown, TTransformed>
}

/**
 * <Segmented> bound to a react-hook-form field (filters, tabs of a form)
 */
export function SegmentedField<
	TForm extends FieldValues,
	TTransformed extends FieldValues,
	T extends string,
>(props: TSegmentedFieldProps<TForm, TTransformed, T>) {
	const { name, control, ...rest } = props

	const { field } = useController({ name, control })
	return <Segmented {...rest} value={field.value} onChange={field.onChange} />
}
