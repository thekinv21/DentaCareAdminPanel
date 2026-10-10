'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { LOCALE_META, LOCALES } from '@/shared/lib/i18n'
import { AffixInput } from '@/shared/ui/affix-input'
import { ChoiceChipsField } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid3, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { Select } from '@/shared/ui/select'

import type { TUserFormValues } from '../model/UserFormSchema'

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
				<FormField name='email' label={t('email')}>
					<input
						type='email'
						className={inputClass}
						placeholder='name@denta.kg'
						{...inputProps('email')}
					/>
				</FormField>
				<Field label={t('birthDate')}>
					<input
						className={cn(inputClass, 'font-mono')}
						placeholder={t('datePlaceholder')}
						{...inputProps('birthDate')}
					/>
				</Field>
				<Field label={t('branch')} required>
					<Select {...inputProps('branch')}>
						<option value='alaToo'>{t('branchAlaToo')}</option>
						<option value='jal'>{t('branchJal')}</option>
					</Select>
				</Field>
				<Field as='div' label={t('interfaceLanguage')}>
					<ChoiceChipsField
						control={control}
						name='language'
						aria-label={t('interfaceLanguage')}
						options={LOCALES.map(locale => ({
							id: locale,
							label: LOCALE_META[locale].code,
						}))}
					/>
				</Field>
				<Field as='div' label={t('gender')}>
					<ChoiceChipsField
						control={control}
						name='gender'
						aria-label={t('gender')}
						options={[
							{ id: 'm' as const, label: t('male') },
							{ id: 'f' as const, label: t('female') },
						]}
					/>
				</Field>
			</div>
		</FormSection>
	)
}
