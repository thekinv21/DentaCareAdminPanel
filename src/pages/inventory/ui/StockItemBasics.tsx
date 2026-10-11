'use client'

import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { useFieldProps } from '@/shared/lib/form'
import { ChoiceChipsField } from '@/shared/ui/choice-chips'
import { Field, FormField, formGrid2, inputClass } from '@/shared/ui/field'

import { STOCK_CATEGORIES } from '../model/Stock'
import { STOCK_UNITS, type TStockItemInput } from '../model/StockFormSchema'

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
				<ChoiceChipsField
					control={control}
					name='unit'
					aria-label={t('unit')}
					options={STOCK_UNITS.map(unit => ({
						id: unit,
						label: t(`unit_${unit}`),
					}))}
				/>
			</Field>
			<Field as='div' label={t('category')} required className='col-span-full'>
				<ChoiceChipsField
					control={control}
					name='category'
					aria-label={t('category')}
					options={STOCK_CATEGORIES.map(category => ({
						id: category,
						label: t(`category_${category}`),
					}))}
				/>
			</Field>
		</div>
	)
}
