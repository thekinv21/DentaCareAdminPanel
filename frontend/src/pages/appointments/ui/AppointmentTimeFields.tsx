'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { Alert } from '@/shared/ui/alert'
import { ChoiceChipsField } from '@/shared/ui/choice-chips'
import {
	Field,
	FormField,
	formGrid2,
	formGrid3,
	inputClass,
} from '@/shared/ui/field'

import type { TAppointmentFormValues } from '../model/AppointmentFormSchema'
import { useAppointmentOptions } from '../model/useAppointmentOptions'
import { useChairConflict } from '../model/useChairConflict'

type TAppointmentTimeFieldsProps = {
	eventKey?: string
	removedKeys: Set<string>
}

export function AppointmentTimeFields({
	eventKey,
	removedKeys,
}: TAppointmentTimeFieldsProps) {
	const t = useTranslations('AppointmentForm')

	const { control } = useFormContext<TAppointmentFormValues>()
	const inputProps = useFieldProps<TAppointmentFormValues>()

	const options = useAppointmentOptions()
	const conflict = useChairConflict({ eventKey, removedKeys })

	return (
		<>
			<div className={formGrid2}>
				<Field as='div' label={t('doctor')} required>
					<ChoiceChipsField
						control={control}
						name='doctor'
						aria-label={t('doctor')}
						options={options.doctors.map(doctor => ({
							id: doctor.id,
							label: doctor.label,
							leading: (
								<span className={cn('size-2 rounded-full', doctor.dotClass)} />
							),
						}))}
					/>
				</Field>
				<Field as='div' label={t('chair')} required>
					<ChoiceChipsField
						control={control}
						name='chair'
						aria-label={t('chair')}
						options={options.chairs}
						chipClassName='min-w-12 justify-center'
					/>
				</Field>
			</div>
			<div className={formGrid3}>
				<FormField name='date' label={t('date')} required>
					<input
						className={cn(inputClass, 'font-mono')}
						{...inputProps('date')}
					/>
				</FormField>
				<Field as='div' label={t('start')} required>
					<ChoiceChipsField
						control={control}
						name='start'
						aria-label={t('startTime')}
						options={options.startSlots}
						chipClassName='px-2.25 font-mono'
					/>
				</Field>
				<Field as='div' label={t('duration')}>
					<ChoiceChipsField
						control={control}
						name='duration'
						aria-label={t('duration')}
						options={options.durations}
						chipClassName='px-2.25'
					/>
				</Field>
			</div>
			{conflict && (
				<Alert tone='warning' size='sm'>
					<b>{conflict}</b> {t('conflictHint')}
				</Alert>
			)}
		</>
	)
}
