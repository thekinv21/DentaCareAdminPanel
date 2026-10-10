'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { DOCTORS } from '@/entities/employee'

import { useFieldProps } from '@/shared/lib/form'
import { useFormat } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { ChoiceChips, ToggleChips } from '@/shared/ui/choice-chips'
import {
	Field,
	FieldError,
	formGrid2,
	formGrid3,
	inputClass,
} from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCard } from '@/shared/ui/switch-card'

import {
	ALLERGIES,
	CONDITIONS,
	INSURANCE,
	PATIENT_DOCTORS,
	type TPatientFormValues,
} from '../model/PatientFormSchema'

export function PatientMedicalFields() {
	const t = useTranslations('PatientForm')
	const format = useFormat()
	const { control } = useFormContext<TPatientFormValues>()
	const inputProps = useFieldProps<TPatientFormValues>()

	return (
		<>
			<FormSection
				title={t('medicalDetails')}
				aside={<Badge tone='danger'>{t('visibleToDoctor')}</Badge>}
			>
				<Field as='div' label={t('allergies')}>
					<Controller
						control={control}
						name='allergies'
						render={({ field }) => (
							<ToggleChips
								aria-label={t('allergies')}
								options={ALLERGIES.map(id => ({
									id: id as string,
									label: t(`allergy_${id}`),
								}))}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</Field>
				<Field as='div' label={t('chronicConditions')}>
					<Controller
						control={control}
						name='conditions'
						render={({ field }) => (
							<ToggleChips
								aria-label={t('conditions')}
								options={CONDITIONS.map(id => ({
									id: id as string,
									label: t(`condition_${id}`),
								}))}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</Field>
				<div className={formGrid3}>
					<Field as='div' label={t('insurance')}>
						<Controller
							control={control}
							name='insurance'
							render={({ field }) => (
								<ChoiceChips
									aria-label={t('insurance')}
									options={INSURANCE.map(id => ({
										id,
										label: t(`insurance_${id}`),
									}))}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</Field>
					<Field label={t('policyNumber')}>
						<input
							className={`${inputClass} font-mono`}
							placeholder='—'
							{...inputProps('policy')}
						/>
					</Field>
					<Field as='div' label={t('treatingDoctor')}>
						<Controller
							control={control}
							name='doctor'
							render={({ field }) => (
								<ChoiceChips
									aria-label={t('treatingDoctor')}
									options={PATIENT_DOCTORS.map(id => ({
										id,
										label: format.name(DOCTORS[id].shortName),
									}))}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</Field>
				</div>
			</FormSection>
			<FormSection title={t('consents')}>
				<div className={formGrid2}>
					<div className='flex flex-col gap-1.5'>
						<Controller
							control={control}
							name='consent'
							render={({ field }) => (
								<SwitchCard
									label={t('dataConsent')}
									hint={t('dataConsentHint')}
									checked={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
						<FieldError name='consent' />
					</div>
					<Controller
						control={control}
						name='smsReminders'
						render={({ field }) => (
							<SwitchCard
								label={t('smsReminders')}
								hint={t('smsRemindersHint')}
								checked={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</div>
			</FormSection>
		</>
	)
}
