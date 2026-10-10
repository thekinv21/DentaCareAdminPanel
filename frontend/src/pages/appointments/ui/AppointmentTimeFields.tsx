'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { Alert } from '@/shared/ui/alert'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import {
	Field,
	FormField,
	formGrid2,
	formGrid3,
	inputClass,
} from '@/shared/ui/field'

import {
	CHAIRS,
	DURATIONS,
	START_SLOTS,
	type TAppointmentFormValues,
} from '../model/AppointmentFormSchema'
import { useAppointmentOptions } from '../model/useAppointmentOptions'
import { useChairConflict } from '../model/useChairConflict'

type TAppointmentTimeFieldsProps = { eventKey?: string }

export function AppointmentTimeFields({
	eventKey,
}: TAppointmentTimeFieldsProps) {
	const t = useTranslations('AppointmentForm')

	const { control } = useFormContext<TAppointmentFormValues>()
	const inputProps = useFieldProps<TAppointmentFormValues>()

	const options = useAppointmentOptions()
	const conflict = useChairConflict(eventKey)

	return (
		<>
			<div className={formGrid2}>
				<Field as='div' label={t('doctor')} required>
					<Controller
						control={control}
						name='doctor'
						render={({ field }) => (
							<ChoiceChips
								aria-label={t('doctor')}
								options={options.doctors.map(d => ({
									id: d.id,
									label: d.label,
									leading: (
										<span className={cn('size-2 rounded-full', d.dot)} />
									),
								}))}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</Field>
				<Field as='div' label={t('chair')} required>
					<Controller
						control={control}
						name='chair'
						render={({ field }) => (
							<ChoiceChips
								aria-label={t('chair')}
								options={CHAIRS.map(n => ({
									id: n as number,
									label: String(n),
								}))}
								value={field.value}
								onChange={field.onChange}
								chipClassName='min-w-12 justify-center'
							/>
						)}
					/>
				</Field>
			</div>
			<div className={formGrid3}>
				<FormField name='date' label={t('date')} required>
					<input
						className={`${inputClass} font-mono`}
						{...inputProps('date')}
					/>
				</FormField>
				<Field as='div' label={t('start')} required>
					<Controller
						control={control}
						name='start'
						render={({ field }) => (
							<ChoiceChips
								aria-label={t('startTime')}
								options={(START_SLOTS.includes(field.value)
									? START_SLOTS
									: [...START_SLOTS, field.value]
								).map(time => ({ id: time, label: time }))}
								value={field.value}
								onChange={field.onChange}
								chipClassName='px-2.25 font-mono'
							/>
						)}
					/>
				</Field>
				<Field as='div' label={t('duration')}>
					<Controller
						control={control}
						name='duration'
						render={({ field }) => (
							<ChoiceChips
								aria-label={t('duration')}
								options={DURATIONS.map(min => ({
									id: min as number,
									label: t('minutes', { n: min }),
								}))}
								value={field.value}
								onChange={field.onChange}
								chipClassName='px-2.25'
							/>
						)}
					/>
				</Field>
			</div>
			{conflict && (
				<Alert tone='warning' className='text-[13px] leading-4.75'>
					<b>{conflict}</b> {t('conflictHint')}
				</Alert>
			)}
		</>
	)
}
