'use client'

import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { ChoiceChips } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid2, inputClass } from '@/shared/ui/field'

import {
	STOCK_CATEGORIES,
	STOCK_UNITS,
	type TStockItemInput,
} from '../model/StockFormSchema'

/**
 * Name, SKU, unit and category of a stock position
 */
export function StockItemBasics() {
	const t = useTranslations('StockForm')
	const { control } = useFormContext<TStockItemInput>()
	const inputProps = useFieldProps<TStockItemInput>()

	return (
		<div className={formGrid2}>
			<FormField
				name='name'
				label={t('name')}
				required
				className='col-span-full'
			>
				<input
					className={inputClass}
					placeholder={t('namePlaceholder')}
					{...inputProps('name')}
				/>
			</FormField>
			<Field label={t('sku')}>
				<input
					className={`${inputClass} font-mono`}
					placeholder='ANS-0000'
					{...inputProps('sku')}
				/>
			</Field>
			<Field as='div' label={t('unit')}>
				<Controller
					control={control}
					name='unit'
					render={({ field }) => (
						<ChoiceChips
							aria-label={t('unit')}
							options={STOCK_UNITS.map(id => ({ id, label: t(`unit_${id}`) }))}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</Field>
			<Field as='div' label={t('category')} required className='col-span-full'>
				<Controller
					control={control}
					name='category'
					render={({ field }) => (
						<ChoiceChips
							aria-label={t('category')}
							options={STOCK_CATEGORIES.map(id => ({
								id,
								label: t(`category_${id}`),
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
