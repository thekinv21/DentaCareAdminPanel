'use client'

import { useController } from 'react-hook-form'

import { CheckboxOption } from '@/shared/ui/checkbox'

import type { TConfirmOptions } from './ConfirmTypes'
import type { TConfirmDialogModel } from './useConfirmDialog'

type TCheckOption = NonNullable<TConfirmOptions['options']>[number]

type TConfirmCheckOptionsProps = {
	options: TCheckOption[]
	control: TConfirmDialogModel['control']
}

/**
 * Side effects the user can switch on or off, e.g. "Send an SMS"
 */
export function ConfirmCheckOptions({
	options,
	control,
}: TConfirmCheckOptionsProps) {
	return (
		<div className='flex flex-col gap-0.5'>
			{options.map(option => (
				<ConfirmCheckOption key={option.id} option={option} control={control} />
			))}
		</div>
	)
}

type TConfirmCheckOptionProps = {
	option: TCheckOption
	control: TConfirmDialogModel['control']
}

function ConfirmCheckOption({ option, control }: TConfirmCheckOptionProps) {
	const { field } = useController({ control, name: `options.${option.id}` })

	return (
		<CheckboxOption
			checked={field.value}
			onChange={field.onChange}
			label={option.label}
			hint={option.hint}
		/>
	)
}
