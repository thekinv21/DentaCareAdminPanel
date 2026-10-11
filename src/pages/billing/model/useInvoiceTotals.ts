'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import { useFormat } from '@/shared/lib/i18n'

import { FOMS_SHARE, type TInvoiceFormInput } from './InvoiceFormSchema'

/**
 * Live totals of the invoice form: sum, discount, ФОМС share and amount due
 */
export function useInvoiceTotals() {
	const format = useFormat()
	const { control } = useFormContext<TInvoiceFormInput>()
	const [items = [], discountPercent, foms] = useWatch({
		control,
		name: ['items', 'discount', 'foms'],
	})

	const sum = items.reduce(
		(total, item) => total + (Number(item.price) || 0),
		0,
	)
	const discount = Math.round((sum * (Number(discountPercent) || 0)) / 100)
	const fomsShare =
		foms === 'yes' ? Math.round((sum - discount) * FOMS_SHARE) : 0

	return {
		sum: format.som(sum),
		discount: `−${format.som(discount)}`,
		foms: fomsShare ? `−${format.som(fomsShare)}` : '—',
		total: format.som(sum - discount - fomsShare),
	}
}
