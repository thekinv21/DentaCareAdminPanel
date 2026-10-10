'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/shared/lib/cn'
import { useFieldProps } from '@/shared/lib/form'
import { Field, FormField, formGrid2, inputClass } from '@/shared/ui/field'

import type { TMovementInput } from '../model/StockFormSchema'

type TStockMovementFieldsProps = { reasonLabel: string }

/**
 * Quantity, date and reason of a stock movement
 */
export function StockMovementFields({
	reasonLabel,
}: TStockMovementFieldsProps) {
	const t = useTranslations('StockForm')
	const inputProps = useFieldProps<TMovementInput>()

	return (
		<div className={formGrid2}>
			<FormField name='quantity' label={t('quantity')} required>
				<input
					inputMode='numeric'
					className={cn(inputClass, 'font-mono')}
					{...inputProps('quantity')}
				/>
			</FormField>
			<FormField name='date' label={t('date')}>
				<input
					className={cn(inputClass, 'font-mono')}
					{...inputProps('date')}
				/>
			</FormField>
			<Field label={reasonLabel} className='col-span-full'>
				<input className={inputClass} {...inputProps('reason')} />
			</Field>
		</div>
	)
}
