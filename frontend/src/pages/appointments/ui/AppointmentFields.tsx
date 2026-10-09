'use client'

import { useTranslations } from 'next-intl'

import { useAppointmentLabels } from '@/entities/appointment'

import { cn } from '@/shared/lib/cn'
import { Alert } from '@/shared/ui/alert'
import { ChoiceChips, ToggleChips } from '@/shared/ui/choice-chips'
import {
	Field,
	formGrid2,
	formGrid3,
	inputClass,
	textareaClass,
} from '@/shared/ui/field'
import { SwitchCard } from '@/shared/ui/switch-card'

import {
	CHAIRS,
	DURATIONS,
	FORM_STATUSES,
	SOURCES,
	START_SLOTS,
} from '../model/AppointmentFormSchema'
import type { TAppointmentFormModel } from '../model/useAppointmentForm'

type TAppointmentFieldsProps = { form: TAppointmentFormModel }

export function AppointmentFields({ form }: TAppointmentFieldsProps) {
	const t = useTranslations('AppointmentForm')
	const labels = useAppointmentLabels()
	const { values } = form
	const starts = START_SLOTS.includes(values.start)
		? START_SLOTS
		: [...START_SLOTS, values.start]

	return (
		<>
			<div className={formGrid2}>
				<Field as='div' label={t('doctor')} required>
					<ChoiceChips
						aria-label={t('doctor')}
						options={form.doctorOptions.map(d => ({
							id: d.id,
							label: d.label,
							leading: <span className={cn('size-2 rounded-full', d.dot)} />,
						}))}
						value={values.doctor}
						onChange={value => form.set('doctor', value)}
					/>
				</Field>
				<Field as='div' label={t('chair')} required>
					<ChoiceChips
						aria-label={t('chair')}
						options={CHAIRS.map(n => ({ id: n as number, label: String(n) }))}
						value={values.chair}
						onChange={value => form.set('chair', value)}
						chipClassName='min-w-12 justify-center'
					/>
				</Field>
			</div>
			<div className={formGrid3}>
				<Field label={t('date')} required error={form.errorOf('date')}>
					<input
						className={`${inputClass} font-mono`}
						{...form.field('date')}
					/>
				</Field>
				<Field as='div' label={t('start')} required>
					<ChoiceChips
						aria-label={t('startTime')}
						options={starts.map(time => ({ id: time, label: time }))}
						value={values.start}
						onChange={value => form.set('start', value)}
						chipClassName='px-2.25 font-mono'
					/>
				</Field>
				<Field as='div' label={t('duration')}>
					<ChoiceChips
						aria-label={t('duration')}
						options={DURATIONS.map(min => ({
							id: min as number,
							label: t('minutes', { n: min }),
						}))}
						value={values.duration}
						onChange={value => form.set('duration', value)}
						chipClassName='px-2.25'
					/>
				</Field>
			</div>
			{form.conflict && (
				<Alert tone='warning' className='text-[13px] leading-4.75'>
					<b>{form.conflict}</b> {t('conflictHint')}
				</Alert>
			)}
			<Field as='div' label={t('services')}>
				<ToggleChips
					aria-label={t('services')}
					options={form.serviceOptions}
					value={values.services}
					onChange={value => form.set('services', value)}
					chipClassName='min-h-9 text-ink'
				/>
			</Field>
			<div className={formGrid2}>
				<Field label={t('tooth')} hint={t('toothHint')}>
					<input
						className={`${inputClass} font-mono`}
						placeholder={t('toothPlaceholder')}
						{...form.field('tooth')}
					/>
				</Field>
				<Field as='div' label={t('source')}>
					<ChoiceChips
						aria-label={t('source')}
						options={SOURCES.map(id => ({ id, label: t(`source_${id}`) }))}
						value={values.source}
						onChange={value => form.set('source', value)}
					/>
				</Field>
			</div>
			{form.isEdit && (
				<Field as='div' label={t('status')}>
					<ChoiceChips
						aria-label={t('status')}
						options={FORM_STATUSES.map(s => ({
							id: s.id,
							label: labels.status(s.id),
							leading: <span className={cn('size-2 rounded-full', s.dot)} />,
						}))}
						value={values.status}
						onChange={value => form.set('status', value)}
					/>
				</Field>
			)}
			<Field label={t('noteForDoctor')}>
				<textarea
					className={textareaClass}
					placeholder={t('notePlaceholder')}
					{...form.field('note')}
				/>
			</Field>
			<div className={formGrid2}>
				<SwitchCard
					label={t('sms24')}
					hint={t('inPatientLanguage')}
					checked={values.sms24}
					onChange={value => form.set('sms24', value)}
				/>
				<SwitchCard
					label={t('sms2')}
					hint={t('withAddressAndRoom')}
					checked={values.sms2}
					onChange={value => form.set('sms2', value)}
				/>
			</div>
		</>
	)
}
