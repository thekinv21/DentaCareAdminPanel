'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid2, inputClass } from '@/shared/ui/field'

import {
	SERVICE_CATEGORIES,
	SERVICE_DURATIONS,
	type TServiceFormInput,
} from '../model/ServiceFormSchema'
import { SERVICE_CATEGORY } from '../model/Services'

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
					className={`${inputClass} font-mono`}
					placeholder='T-00'
					{...inputProps('code')}
				/>
			</Field>
			<Field as='div' label={t('category')} required className='col-span-full'>
				<Controller
					control={control}
					name='category'
					render={({ field }) => (
						<ChoiceChips
							aria-label={t('category')}
							options={SERVICE_CATEGORIES.map(id => ({
								id,
								label: tSettings(SERVICE_CATEGORY[id]),
							}))}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</Field>
			<FormField name='price' label={t('priceSom')} required>
				<input
					inputMode='numeric'
					className={`${inputClass} font-mono`}
					{...inputProps('price')}
				/>
			</FormField>
			<Field as='div' label={t('duration')}>
				<Controller
					control={control}
					name='minutes'
					render={({ field }) => (
						<ChoiceChips
							aria-label={t('duration')}
							options={SERVICE_DURATIONS.map(min => ({
								id: min as number,
								label: t('minutes', { n: min }),
							}))}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</Field>
		</div>
	)
}
