'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { ChoiceChipsField, ToggleChipsField } from '@/shared/ui/choice-chips'
import { Field, formGrid2, inputClass, textareaClass } from '@/shared/ui/field'
import { SwitchCardField } from '@/shared/ui/switch-card'

import type { TAppointmentFormValues } from '../model/AppointmentFormSchema'
import { useAppointmentOptions } from '../model/useAppointmentOptions'

type TAppointmentDetailFieldsProps = { isEdit: boolean }

export function AppointmentDetailFields({
	isEdit,
}: TAppointmentDetailFieldsProps) {
	const t = useTranslations('AppointmentForm')

	const options = useAppointmentOptions()
	const { control, register } = useFormContext<TAppointmentFormValues>()

	return (
		<>
			<Field as='div' label={t('services')}>
				<ToggleChipsField
					control={control}
					name='services'
					aria-label={t('services')}
					options={options.services}
					chipClassName='min-h-9 text-ink'
				/>
			</Field>
			<div className={formGrid2}>
				<Field label={t('tooth')} hint={t('toothHint')}>
					<input
						className={cn(inputClass, 'font-mono')}
						placeholder={t('toothPlaceholder')}
						{...register('tooth')}
					/>
				</Field>
				<Field as='div' label={t('source')}>
					<ChoiceChipsField
						control={control}
						name='source'
						aria-label={t('source')}
						options={options.sources}
					/>
				</Field>
			</div>
			{isEdit && (
				<Field as='div' label={t('status')}>
					<ChoiceChipsField
						control={control}
						name='status'
						aria-label={t('status')}
						options={options.statuses.map(status => ({
							id: status.id,
							label: status.label,
							leading: (
								<span className={cn('size-2 rounded-full', status.dotClass)} />
							),
						}))}
					/>
				</Field>
			)}
			<Field label={t('noteForDoctor')}>
				<textarea
					className={textareaClass}
					placeholder={t('notePlaceholder')}
					{...register('note')}
				/>
			</Field>
			<div className={formGrid2}>
				<SwitchCardField
					control={control}
					name='smsDayBefore'
					label={t('smsDayBefore')}
					hint={t('inPatientLanguage')}
				/>
				<SwitchCardField
					control={control}
					name='smsTwoHoursBefore'
					label={t('smsTwoHoursBefore')}
					hint={t('withAddressAndRoom')}
				/>
			</div>
		</>
	)
}
