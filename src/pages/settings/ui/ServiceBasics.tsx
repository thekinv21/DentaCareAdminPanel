'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { APPOINTMENT_DURATIONS } from '@/entities/appointment'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { ChoiceChipsField } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid2, inputClass } from '@/shared/ui/field'

import type { TServiceFormInput } from '../model/ServiceFormSchema'
import { SERVICE_CATEGORIES, SERVICE_CATEGORY_LABEL } from '../model/Services'

/**
 * Name, code, category, price and duration of a price list entry
 */
export function ServiceBasics() {
	const t = useTranslations('ServiceForm')
	const tSettings = useTranslations('Settings')
	const { control } = useFormContext<TServiceFormInput>()
	const inputProps = useFieldProps<TServiceFormInput>()

	return (
		<div className={formGrid2}>
			<FormField name='name' label={t('name')} required>
				<input
					className={inputClass}
					placeholder={t('namePlaceholder')}
					{...inputProps('name')}
				/>
			</FormField>
			<Field label={t('code')}>
				<input
					className={cn(inputClass, 'font-mono')}
					placeholder='T-00'
					{...inputProps('code')}
				/>
			</Field>
			<Field as='div' label={t('category')} required className='col-span-full'>
				<ChoiceChipsField
					control={control}
					name='category'
					aria-label={t('category')}
					options={SERVICE_CATEGORIES.map(category => ({
						id: category,
						label: tSettings(SERVICE_CATEGORY_LABEL[category]),
					}))}
				/>
			</Field>
			<FormField name='price' label={t('priceSom')} required>
				<input
					inputMode='numeric'
					className={cn(inputClass, 'font-mono')}
					{...inputProps('price')}
				/>
			</FormField>
			<Field as='div' label={t('duration')}>
				<ChoiceChipsField
					control={control}
					name='minutes'
					aria-label={t('duration')}
					options={APPOINTMENT_DURATIONS.map(minutes => ({
						id: minutes,
						label: t('minutes', { n: minutes }),
					}))}
				/>
			</Field>
		</div>
	)
}
