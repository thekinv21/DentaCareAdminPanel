'use client'

import type { ReactNode } from 'react'

import { FormField } from '@/shared/ui/field'

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
 * `FormField` with the larger label of the auth screens
 */
export function AuthField(props: TAuthFieldProps) {
	const { name, ...rest } = props

	return <FormField {...rest} name={name} htmlFor={name} size='lg' />
}
