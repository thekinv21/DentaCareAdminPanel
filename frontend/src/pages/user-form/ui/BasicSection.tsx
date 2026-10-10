'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { AffixInput } from '@/shared/ui/affix-input'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid3, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import { INTERFACE_LANGUAGES } from '../model/Options'
import type { TUserFormValues } from '../model/Schema'

export function BasicSection() {
	const t = useTranslations('UserForm')
	const { control } = useFormContext<TUserFormValues>()
	const inputProps = useFieldProps<TUserFormValues>()

	return (
		<FormSection title={t('basicDetails')}>
			<div className={formGrid3}>
				<FormField name='lastName' label={t('lastName')} required>
					<input
						className={inputClass}
						placeholder={t('lastNamePlaceholder')}
						{...inputProps('lastName')}
					/>
				</FormField>
				<FormField name='firstName' label={t('firstName')} required>
					<input
						className={inputClass}
						placeholder={t('firstNamePlaceholder')}
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
				<FormField
					name='phone'
					label={t('mobilePhone')}
					required
					hint={t('usedForLoginAndSms')}
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
						type='email'
						className={inputClass}
						placeholder='name@denta.kg'
						{...inputProps('email')}
					/>
				</FormField>
				<Field label={t('birthDate')}>
					<input
						className={`${inputClass} font-mono`}
						placeholder={t('datePlaceholder')}
						{...inputProps('birthDate')}
					/>
				</Field>
				<Field label={t('branch')} required>
					<select className={inputClass} {...inputProps('branch')}>
						<option value='alaToo'>{t('branchAlaToo')}</option>
						<option value='jal'>{t('branchJal')}</option>
					</select>
				</Field>
				<Field as='div' label={t('interfaceLanguage')}>
					<Controller
						control={control}
						name='language'
						render={({ field }) => (
							<ChoiceChips
								aria-label={t('interfaceLanguage')}
								options={INTERFACE_LANGUAGES.map(id => ({
									id,
									label: id.toUpperCase(),
								}))}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</Field>
				<Field as='div' label={t('gender')}>
					<Controller
						control={control}
						name='gender'
						render={({ field }) => (
							<ChoiceChips
								aria-label={t('gender')}
								options={[
									{ id: 'm' as const, label: t('male') },
									{ id: 'f' as const, label: t('female') },
								]}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</Field>
			</div>
		</FormSection>
	)
}
