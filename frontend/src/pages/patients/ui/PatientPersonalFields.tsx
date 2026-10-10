'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { AffixInput } from '@/shared/ui/affix-input'
import { ChoiceChipsField } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid3, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import type { TPatientFormValues } from '../model/PatientFormSchema'
import { usePatientFormOptions } from '../model/usePatientFormOptions'

type TPatientPersonalFieldsProps = { duplicateError?: string }

export function PatientPersonalFields({
	duplicateError,
}: TPatientPersonalFieldsProps) {
	const t = useTranslations('PatientForm')
	const { control } = useFormContext<TPatientFormValues>()
	const inputProps = useFieldProps<TPatientFormValues>()
	const options = usePatientFormOptions()

	return (
		<>
			<FormSection title={t('personalDetails')}>
				<div className={formGrid3}>
					<FormField name='lastName' label={t('lastName')} required>
						<input
							className={inputClass}
							placeholder={t('lastName')}
							{...inputProps('lastName')}
						/>
					</FormField>
					<FormField name='firstName' label={t('firstName')} required>
						<input
							className={inputClass}
							placeholder={t('firstName')}
							{...inputProps('firstName')}
						/>
					</FormField>
					<Field label={t('middleName')}>
						<input
							className={inputClass}
							placeholder={t('optional')}
							{...inputProps('middleName')}
						/>
					</Field>
					<FormField name='birthDate' label={t('birthDate')} required>
						<input
							className={cn(inputClass, 'font-mono')}
							placeholder={t('datePlaceholder')}
							{...inputProps('birthDate')}
						/>
					</FormField>
					<Field as='div' label={t('gender')}>
						<ChoiceChipsField
							control={control}
							name='gender'
							aria-label={t('gender')}
							options={options.genders}
						/>
					</Field>
					<FormField name='pin' label={t('pin')}>
						<input
							className={cn(inputClass, 'font-mono')}
							placeholder={t('pinPlaceholder')}
							{...inputProps('pin')}
						/>
					</FormField>
				</div>
			</FormSection>
			<FormSection title={t('contacts')}>
				<div className={formGrid3}>
					<FormField
						name='phone'
						label={t('phone')}
						required
						error={duplicateError}
					>
						<AffixInput
							prefix='+996'
							type='tel'
							inputMode='tel'
							placeholder='555 123 456'
							{...inputProps('phone')}
						/>
					</FormField>
					<FormField name='email' label={t('email')}>
						<input
							className={inputClass}
							placeholder='name@mail.kg'
							{...inputProps('email')}
						/>
					</FormField>
					<Field as='div' label={t('smsLanguage')}>
						<ChoiceChipsField
							control={control}
							name='smsLanguage'
							aria-label={t('smsLanguage')}
							options={options.smsLanguages}
						/>
					</Field>
					<Field label={t('address')} className='col-span-full'>
						<input
							className={inputClass}
							placeholder={t('addressPlaceholder')}
							{...inputProps('address')}
						/>
					</Field>
				</div>
			</FormSection>
		</>
	)
}
