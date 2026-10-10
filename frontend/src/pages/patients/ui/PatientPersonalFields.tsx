'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { AffixInput } from '@/shared/ui/affix-input'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid3, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import type { TPatientFormValues } from '../model/PatientFormSchema'

type TPatientPersonalFieldsProps = { duplicateError?: string }

export function PatientPersonalFields({
	duplicateError,
}: TPatientPersonalFieldsProps) {
	const t = useTranslations('PatientForm')
	const { control } = useFormContext<TPatientFormValues>()
	const inputProps = useFieldProps<TPatientFormValues>()

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
							className={`${inputClass} font-mono`}
							placeholder={t('datePlaceholder')}
							{...inputProps('birthDate')}
						/>
					</FormField>
					<Field as='div' label={t('gender')}>
						<Controller
							control={control}
							name='gender'
							render={({ field }) => (
								<ChoiceChips
									aria-label={t('gender')}
									options={[
										{ id: 'f' as const, label: t('female') },
										{ id: 'm' as const, label: t('male') },
									]}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</Field>
					<FormField name='pin' label={t('pin')}>
						<input
							className={`${inputClass} font-mono`}
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
					<FormField name='email' label='Email'>
						<input
							className={inputClass}
							placeholder='name@mail.kg'
							{...inputProps('email')}
						/>
					</FormField>
					<Field as='div' label={t('smsLanguage')}>
						<Controller
							control={control}
							name='smsLanguage'
							render={({ field }) => (
								<ChoiceChips
									aria-label={t('smsLanguage')}
									options={[
										{ id: 'ru' as const, label: 'Русский' },
										{ id: 'ky' as const, label: 'Кыргызча' },
									]}
									value={field.value}
									onChange={field.onChange}
								/>
							)}
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
