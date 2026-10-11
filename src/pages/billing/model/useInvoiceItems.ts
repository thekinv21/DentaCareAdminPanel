'use client'

import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import { useFormat } from '@/shared/lib/i18n'

import type { TInvoiceFormInput } from './InvoiceFormSchema'

const NEW_ITEM = { name: 'itemConsultation', tooth: '—', price: '1000' }

/**
 * Editable service rows of the invoice form with their prices
 */
export function useInvoiceItems() {
	const t = useTranslations('InvoiceForm')
	const format = useFormat()
	const { control } = useFormContext<TInvoiceFormInput>()
	const items = useFieldArray({ control, name: 'items' })
	const values = useWatch({ control, name: 'items' })

	return {
		rows: items.fields.map((field, index) => ({
			key: field.id,
			index,
			sum: format.som(Number(values[index]?.price) || 0),
			remove: () => items.remove(index),
		})),
		add: () => items.append({ ...NEW_ITEM, name: t(NEW_ITEM.name) }),
	}
}

export type TInvoiceItemRow = ReturnType<typeof useInvoiceItems>['rows'][number]
