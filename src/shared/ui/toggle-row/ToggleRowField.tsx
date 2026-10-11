'use client'

import {
	type Control,
	type FieldValues,
	type Path,
	useController,
} from 'react-hook-form'

import { ToggleRow, type TToggleRowProps } from './ToggleRow'

type TToggleRowFieldProps<
	TForm extends FieldValues,
	TTransformed extends FieldValues,
> = Omit<TToggleRowProps, 'checked' | 'onChange'> & {
	name: Path<TForm>
	control?: Control<TForm, unknown, TTransformed>
}

/**
 * <ToggleRow> bound to a boolean react-hook-form field
 */
export function ToggleRowField<
	TForm extends FieldValues,
	TTransformed extends FieldValues,
>(props: TToggleRowFieldProps<TForm, TTransformed>) {
	const { name, control, ...rest } = props

	const { field } = useController({ name, control })
	return <ToggleRow {...rest} checked={field.value} onChange={field.onChange} />
}
