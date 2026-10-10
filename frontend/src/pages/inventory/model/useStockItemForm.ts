'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { useFormModal } from '@/shared/lib/form'
import { useToast } from '@/shared/ui/toast'

import { CATEGORY_LABEL, type TStockItem } from './Stock'
import {
	stockItemSchema,
	type TStockItemInput,
	type TStockItemValues,
} from './StockFormSchema'

const EMPTY: TStockItemInput = {
	name: '',
	sku: '',
	unit: 'pcs',
	category: 'cons',
	quantity: '0',
	minimum: '',
	cost: '',
	supplier: 'medsnabBishkek',
	expires: '',
	place: '',
	autoWriteOff: true,
}

/**
 * New/edit stock position in a modal
 */
export function useStockItemForm(
	onRemove: (item: TStockItem, onDone: () => void) => void,
) {
	const t = useTranslations('StockForm')
	const tInventory = useTranslations('Inventory')
	const toast = useToast()

	const methods = useForm<TStockItemInput, unknown, TStockItemValues>({
		resolver: zodResolver(stockItemSchema),
		defaultValues: EMPTY,
	})
	const modal = useFormModal<TStockItem>(item =>
		methods.reset(
			item
				? {
						...EMPTY,
						name: tInventory(item.name),
						sku: item.sku,
						unit: item.unit as TStockItemInput['unit'],
						category: item.category,
						quantity: String(item.quantity),
						minimum: String(item.minimum),
						cost: '185',
						supplier: item.supplier as TStockItemInput['supplier'],
						expires: item.expires,
						place: t('defaultPlace'),
					}
				: EMPTY,
		),
	)
	const item = modal.item

	return {
		...modal,
		methods,
		title: item ? tInventory(item.name) : t('newItem'),
		subtitle: item
			? `${item.sku} · ${tInventory(CATEGORY_LABEL[item.category])}`
			: t('createSubtitle'),
		saving: methods.formState.isSubmitting,
		submit: methods.handleSubmit(async () => {
			await mockRequest()
			modal.close()
			toast.show(item ? t('itemUpdated') : t('itemAdded'))
		}),
		remove: () => item && onRemove(item, modal.close),
	}
}

export type TStockItemFormModel = ReturnType<typeof useStockItemForm>
