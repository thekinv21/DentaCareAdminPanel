'use client'

import type { ReactNode } from 'react'

import {
	type Control,
	type FieldValues,
	type Path,
	useController,
} from 'react-hook-form'

import { SwitchCard } from './SwitchCard'

type TSwitchCardFieldProps<
	TForm extends FieldValues,
	TTransformed extends FieldValues,
> = {
	name: Path<TForm>
	control?: Control<TForm, unknown, TTransformed>
	label: string
	hint?: ReactNode
	/**
	 * Shorter accessible name when the label is long
	 */
	'aria-label'?: string
}

/**
 * <SwitchCard> bound to a boolean react-hook-form field
 */
export function SwitchCardField<
	TForm extends FieldValues,
	TTransformed extends FieldValues,
>(props: TSwitchCardFieldProps<TForm, TTransformed>) {
	const { name, control, label, hint, ...rest } = props

	const { field } = useController({ name, control })
	return (
		<SwitchCard
			label={label}
			hint={hint}
			aria-label={rest['aria-label']}
			checked={field.value}
			onChange={field.onChange}
		/>
	)
}
