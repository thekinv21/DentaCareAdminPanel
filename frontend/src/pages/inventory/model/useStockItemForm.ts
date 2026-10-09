'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { useToast } from '@/shared/ui/toast'

import { CATEGORY_LABEL, type StockItem } from './Stock'
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
	onRemove: (item: StockItem, onDone: () => void) => void,
) {
	const t = useTranslations('StockForm')
	const tInventory = useTranslations('Inventory')
	const tValidation = useTranslations('Validation')
	const toast = useToast()
	const [open, setOpen] = useState(false)
	const [item, setItem] = useState<StockItem | null>(null)

	const form = useForm<TStockItemInput, unknown, TStockItemValues>({
		resolver: zodResolver(stockItemSchema),
		defaultValues: EMPTY,
	})
	const values = useWatch({ control: form.control })
	const { errors, isSubmitting } = form.formState

	const openWith = (next: StockItem | null) => {
		setItem(next)
		form.reset(
			next
				? {
						...EMPTY,
						name: tInventory(next.name),
						sku: next.sku,
						unit: next.unit as TStockItemInput['unit'],
						category: next.category,
						quantity: String(next.quantity),
						minimum: String(next.minimum),
						cost: '185',
						supplier: next.supplier as TStockItemInput['supplier'],
						expires: next.expires,
						place: t('defaultPlace'),
					}
				: EMPTY,
		)
		setOpen(true)
	}
	const close = () => setOpen(false)

	return {
		open,
		isEdit: !!item,
		title: item ? tInventory(item.name) : t('newItem'),
		subtitle: item
			? `${item.sku} · ${tInventory(CATEGORY_LABEL[item.category])}`
			: t('createSubtitle'),
		openCreate: () => openWith(null),
		openEdit: (next: StockItem) => openWith(next),
		close,
		values,
		setUnit: (value: TStockItemInput['unit']) => form.setValue('unit', value),
		setCategory: (value: TStockItemInput['category']) =>
			form.setValue('category', value),
		setAuto: (value: boolean) => form.setValue('autoWriteOff', value),
		field: (name: keyof TStockItemInput) => ({
			'aria-invalid': !!errors[name],
			...form.register(name),
		}),
		errorOf: (name: keyof TStockItemInput) => {
			const message = errors[name]?.message
			return message ? tValidation(message) : undefined
		},
		saving: isSubmitting,
		save: form.handleSubmit(async () => {
			await mockRequest()
			close()
			toast.show(item ? t('itemUpdated') : t('itemAdded'))
		}),
		remove: () => item && onRemove(item, close),
	}
}

export type TStockItemFormModel = ReturnType<typeof useStockItemForm>
