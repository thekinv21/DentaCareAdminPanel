'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { CHAIR_NUMBERS } from '@/entities/employee'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { ChoiceChipsField } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid3, inputClass } from '@/shared/ui/field'

import type { TShiftFormValues } from '../model/ShiftFormSchema'

const timeInputClass = cn(inputClass, 'font-mono')

/**
 * Hours and chair of a working shift
 */
export function ShiftTimeFields() {
	const t = useTranslations('ShiftForm')
	const { control } = useFormContext<TShiftFormValues>()
	const inputProps = useFieldProps<TShiftFormValues>()

	return (
		<div className={formGrid3}>
			<FormField name='from' label={t('start')}>
				<input type='time' className={timeInputClass} {...inputProps('from')} />
			</FormField>
			<FormField name='to' label={t('end')}>
				<input type='time' className={timeInputClass} {...inputProps('to')} />
			</FormField>
			<Field as='div' label={t('chair')}>
				<ChoiceChipsField
					control={control}
					name='chair'
					aria-label={t('chair')}
					options={CHAIR_NUMBERS.map(chair => ({
						id: chair,
						label: String(chair),
					}))}
					chipClassName='min-w-10 justify-center'
				/>
			</Field>
		</div>
	)
}
