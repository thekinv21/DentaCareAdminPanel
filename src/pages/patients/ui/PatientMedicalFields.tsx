'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { Badge } from '@/shared/ui/badge'
import { ChoiceChipsField, ToggleChipsField } from '@/shared/ui/choice-chips'
import { Field, formGrid3, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import type { TPatientFormValues } from '../model/PatientFormSchema'
import { usePatientFormOptions } from '../model/usePatientFormOptions'

export function PatientMedicalFields() {
	const t = useTranslations('PatientForm')
	const options = usePatientFormOptions()
	const { control } = useFormContext<TPatientFormValues>()
	const inputProps = useFieldProps<TPatientFormValues>()

	return (
		<FormSection
			title={t('medicalDetails')}
			aside={<Badge tone='danger'>{t('visibleToDoctor')}</Badge>}
		>
			<Field as='div' label={t('allergies')}>
				<ToggleChipsField
					control={control}
					name='allergies'
					aria-label={t('allergies')}
					options={options.allergies}
				/>
			</Field>
			<Field as='div' label={t('chronicConditions')}>
				<ToggleChipsField
					control={control}
					name='conditions'
					aria-label={t('conditions')}
					options={options.conditions}
				/>
			</Field>
			<div className={formGrid3}>
				<Field as='div' label={t('insurance')}>
					<ChoiceChipsField
						control={control}
						name='insurance'
						aria-label={t('insurance')}
						options={options.insurance}
					/>
				</Field>
				<Field label={t('policyNumber')}>
					<input
						className={cn(inputClass, 'font-mono')}
						placeholder='—'
						{...inputProps('policy')}
					/>
				</Field>
				<Field as='div' label={t('treatingDoctor')}>
					<ChoiceChipsField
						control={control}
						name='doctor'
						aria-label={t('treatingDoctor')}
						options={options.doctors}
					/>
				</Field>
			</div>
		</FormSection>
	)
}
