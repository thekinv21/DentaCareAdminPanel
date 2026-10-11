'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { ToggleChipsField } from '@/shared/ui/choice-chips'
import { FormField, inputClass } from '@/shared/ui/field'
import { FormSection } from '@/shared/ui/form-section'

import { SPECIALTIES } from '../model/Options'
import type { TUserFormValues } from '../model/UserFormSchema'

export function MedicSection() {
	const t = useTranslations('UserForm')

	const { control } = useFormContext<TUserFormValues>()

	const inputProps = useFieldProps<TUserFormValues>()

	return (
		<FormSection className='animate-fade' title={t('professionalDetails')}>
			<FormField name='specialties' as='div' label={t('specialties')} required>
				<ToggleChipsField
					control={control}
					name='specialties'
					aria-label={t('specialties')}
					options={SPECIALTIES.map(specialty => ({
						id: specialty,
						label: t(`specialty_${specialty}`),
					}))}
				/>
			</FormField>
			<FormField
				name='license'
				label={t('licenseNumber')}
				required
				className='max-w-80'
			>
				<input
					className={cn(inputClass, 'font-mono')}
					placeholder={t('licensePlaceholder')}
					{...inputProps('license')}
				/>
			</FormField>
		</FormSection>
	)
}
