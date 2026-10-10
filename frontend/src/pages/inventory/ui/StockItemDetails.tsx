'use client'

import { useTranslations } from 'next-intl'

import { useFieldProps } from '@/shared/lib/form'
import { Field, FormField, formGrid3, inputClass } from '@/shared/ui/field'

import { SUPPLIERS, type TStockItemInput } from '../model/StockFormSchema'

const monoInput = `${inputClass} font-mono`

/**
 * Stock levels, price, supplier, expiry and storage place of a position
 */
export function StockItemDetails() {
	const t = useTranslations('StockForm')
	const tInventory = useTranslations('Inventory')
	const inputProps = useFieldProps<TStockItemInput>()

	return (
		<div className={formGrid3}>
			<FormField name='quantity' label={t('currentStock')}>
				<input
					inputMode='numeric'
					className={monoInput}
					{...inputProps('quantity')}
				/>
			</FormField>
			<FormField
				name='minimum'
				label={t('minimumStock')}
				required
				hint={t('minimumHint')}
			>
				<input
					inputMode='numeric'
					className={monoInput}
					{...inputProps('minimum')}
				/>
			</FormField>
			<Field label={t('purchasePrice')}>
				<input
					inputMode='numeric'
					className={monoInput}
					{...inputProps('cost')}
				/>
			</Field>
			<Field label={t('supplier')}>
				<select className={inputClass} {...inputProps('supplier')}>
					{SUPPLIERS.map(id => (
						<option key={id} value={id}>
							{tInventory(id)}
						</option>
					))}
				</select>
			</Field>
			<Field label={t('expiryDate')}>
				<input
					className={monoInput}
					placeholder={t('expiryPlaceholder')}
					{...inputProps('expires')}
				/>
			</Field>
			<Field label={t('storagePlace')}>
				<input
					className={inputClass}
					placeholder={t('storagePlaceholder')}
					{...inputProps('place')}
				/>
			</Field>
		</div>
	)
}
