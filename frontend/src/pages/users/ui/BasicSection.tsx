'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { AffixInput } from '@/shared/ui/affix-input'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid2, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'
import { Select } from '@/shared/ui/select'

import type { TUserFormValues } from '../model/UserFormSchema'
import type { TUserFormModel } from '../model/useUserForm'

type TBasicSectionProps = {
	types: TUserFormModel['types']
	onTypeChange: TUserFormModel['onTypeChange']
}

export function BasicSection({ types, onTypeChange }: TBasicSectionProps) {
	const t = useTranslations('UserForm')

	const { control } = useFormContext<TUserFormValues>()

	const inputProps = useFieldProps<TUserFormValues>()

	return (
		<FormSection title={t('basicDetails')}>
			<div className={formGrid2}>
				<Field as='div' label={t('userType')} className='col-span-full'>
					<Controller
						control={control}
						name='type'
						render={({ field }) => (
							<ChoiceChips
								aria-label={t('userType')}
								options={types}
								value={field.value}
								onChange={onTypeChange}
							/>
						)}
					/>
				</Field>
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
				<Field label={t('branch')} required>
					<Select {...inputProps('branch')}>
						<option value='alaToo'>{t('branchAlaToo')}</option>
						<option value='jal'>{t('branchJal')}</option>
					</Select>
				</Field>
			</div>
		</FormSection>
	)
}
