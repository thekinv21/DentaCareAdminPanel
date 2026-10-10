'use client'

import { Controller, useFormContext } from 'react-hook-form'

import { SwitchCard } from '@/shared/ui/switch-card'

import type { USER_SWITCHES } from '../model/Options'
import type { TUserFormValues } from '../model/Schema'

type TUserSwitchProps = {
	name: (typeof USER_SWITCHES)[number]
	label: string
	hint: string
	/**
	 * Shorter accessible name when the label is long
	 */
	ariaLabel?: string
}

/**
 * Switch card bound to one of the user's on/off permissions
 */
export function UserSwitch(props: TUserSwitchProps) {
	const { name, label, hint, ariaLabel } = props

	const { control } = useFormContext<TUserFormValues>()
	return (
		<Controller
			control={control}
			name={`switches.${name}`}
			render={({ field }) => (
				<SwitchCard
					label={label}
					hint={hint}
					aria-label={ariaLabel}
					checked={field.value}
					onChange={field.onChange}
				/>
			)}
		/>
	)
}
