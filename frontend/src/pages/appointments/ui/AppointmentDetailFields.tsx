'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { useAppointmentLabels } from '@/entities/appointment'

import { cn } from '@/shared/lib/cn'
import { ChoiceChips, ToggleChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2, inputClass, textareaClass } from '@/shared/ui/field'
import { SwitchCard } from '@/shared/ui/switch-card'

import {
	FORM_STATUSES,
	SOURCES,
	type TAppointmentFormValues,
} from '../model/AppointmentFormSchema'
import { useAppointmentOptions } from '../model/useAppointmentOptions'

type TAppointmentDetailFieldsProps = { isEdit: boolean }

export function AppointmentDetailFields({
	isEdit,
}: TAppointmentDetailFieldsProps) {
	const t = useTranslations('AppointmentForm')

	const labels = useAppointmentLabels()
	const options = useAppointmentOptions()

	const { control, register } = useFormContext<TAppointmentFormValues>()

	return (
		<>
			<Field as='div' label={t('services')}>
				<Controller
					control={control}
					name='services'
					render={({ field }) => (
						<ToggleChips
							aria-label={t('services')}
							options={options.services}
							value={field.value}
							onChange={field.onChange}
							chipClassName='min-h-9 text-ink'
						/>
					)}
				/>
			</Field>
			<div className={formGrid2}>
				<Field label={t('tooth')} hint={t('toothHint')}>
					<input
						className={`${inputClass} font-mono`}
						placeholder={t('toothPlaceholder')}
						{...register('tooth')}
					/>
				</Field>
				<Field as='div' label={t('source')}>
					<Controller
						control={control}
						name='source'
						render={({ field }) => (
							<ChoiceChips
								aria-label={t('source')}
								options={SOURCES.map(id => ({ id, label: t(`source_${id}`) }))}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</Field>
			</div>
			{isEdit && (
				<Field as='div' label={t('status')}>
					<Controller
						control={control}
						name='status'
						render={({ field }) => (
							<ChoiceChips
								aria-label={t('status')}
								options={FORM_STATUSES.map(s => ({
									id: s.id,
									label: labels.status(s.id),
									leading: (
										<span className={cn('size-2 rounded-full', s.dot)} />
									),
								}))}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
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
				<Controller
					control={control}
					name='sms24'
					render={({ field }) => (
						<SwitchCard
							label={t('sms24')}
							hint={t('inPatientLanguage')}
							checked={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					name='sms2'
					render={({ field }) => (
						<SwitchCard
							label={t('sms2')}
							hint={t('withAddressAndRoom')}
							checked={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
		</>
	)
}
