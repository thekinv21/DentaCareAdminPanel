'use client'

import { useTranslations } from 'next-intl'

import { DOCTORS } from '@/entities/employee'

import { useFormat } from '@/shared/lib/i18n'
import { Badge } from '@/shared/ui/badge'
import { ChoiceChips, ToggleChips } from '@/shared/ui/choice-chips'
import { Field, formGrid2, formGrid3, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { SwitchCard } from '@/shared/ui/switch-card'

import {
	ALLERGIES,
	CONDITIONS,
	INSURANCE,
	PATIENT_DOCTORS,
} from '../model/PatientFormSchema'
import type { TPatientFormModel } from '../model/usePatientForm'

type TPatientMedicalFieldsProps = { form: TPatientFormModel }

export function PatientMedicalFields({ form }: TPatientMedicalFieldsProps) {
	const t = useTranslations('PatientForm')
	const format = useFormat()
	const consentError = form.errorOf('consent')

	return (
		<>
			<FormSection
				title={t('medicalDetails')}
				aside={<Badge tone='danger'>{t('visibleToDoctor')}</Badge>}
			>
				<Field as='div' label={t('allergies')}>
					<ToggleChips
						aria-label={t('allergies')}
						options={ALLERGIES.map(id => ({
							id: id as string,
							label: t(`allergy_${id}`),
						}))}
						value={form.values.allergies ?? []}
						onChange={value => form.set('allergies', value)}
					/>
				</Field>
				<Field as='div' label={t('chronicConditions')}>
					<ToggleChips
						aria-label={t('conditions')}
						options={CONDITIONS.map(id => ({
							id: id as string,
							label: t(`condition_${id}`),
						}))}
						value={form.values.conditions ?? []}
						onChange={value => form.set('conditions', value)}
					/>
				</Field>
				<div className={formGrid3}>
					<Field as='div' label={t('insurance')}>
						<ChoiceChips
							aria-label={t('insurance')}
							options={INSURANCE.map(id => ({
								id,
								label: t(`insurance_${id}`),
							}))}
							value={form.values.insurance ?? 'none'}
							onChange={value => form.set('insurance', value)}
						/>
					</Field>
					<Field label={t('policyNumber')}>
						<input
							className={`${inputClass} font-mono`}
							placeholder='—'
							{...form.field('policy')}
						/>
					</Field>
					<Field as='div' label={t('treatingDoctor')}>
						<ChoiceChips
							aria-label={t('treatingDoctor')}
							options={PATIENT_DOCTORS.map(id => ({
								id,
								label: format.name(DOCTORS[id].shortName),
							}))}
							value={form.values.doctor ?? 'kas'}
							onChange={value => form.set('doctor', value)}
						/>
					</Field>
				</div>
			</FormSection>
			<FormSection title={t('consents')}>
				<div className={formGrid2}>
					<div className='flex flex-col gap-1.5'>
						<SwitchCard
							label={t('dataConsent')}
							hint={t('dataConsentHint')}
							checked={!!form.values.consent}
							onChange={value => form.set('consent', value)}
						/>
						{consentError && (
							<span className='text-xs font-semibold text-danger'>
								{consentError}
							</span>
						)}
					</div>
					<SwitchCard
						label={t('smsReminders')}
						hint={t('smsRemindersHint')}
						checked={!!form.values.smsReminders}
						onChange={value => form.set('smsReminders', value)}
					/>
				</div>
			</FormSection>
		</>
	)
}
