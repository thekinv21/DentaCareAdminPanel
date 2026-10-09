'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { useToast } from '@/shared/ui/toast'

import type { StockItem } from './Stock'
import {
	movementSchema,
	type TMovementInput,
	type TMovementType,
	type TMovementValues,
} from './StockFormSchema'

const DEFAULT_QUANTITY: Record<TMovementType, string> = {
	in: '20',
	out: '2',
	adj: '0',
}

/**
 * Stock in, write-off or count correction for one position
 */
export function useStockMovement() {
	const t = useTranslations('StockForm')
	const tInventory = useTranslations('Inventory')
	const tValidation = useTranslations('Validation')
	const toast = useToast()
	const [item, setItem] = useState<StockItem | null>(null)

	const form = useForm<TMovementInput, unknown, TMovementValues>({
		resolver: zodResolver(movementSchema),
	})
	const values = useWatch({ control: form.control })
	const { errors, isSubmitting } = form.formState
	const type = values.type ?? 'in'
	const quantity = Number(values.quantity) || 0
	const current = item?.quantity ?? 0
	const after =
		type === 'in'
			? current + quantity
			: type === 'out'
				? Math.max(0, current - quantity)
				: quantity

	const setType = (next: TMovementType) => {
		form.setValue('type', next)
		form.setValue(
			'quantity',
			next === 'adj' ? String(current) : DEFAULT_QUANTITY[next],
		)
		form.setValue('reason', t(`reasonDefault_${next}`))
	}
	const unit = item ? tInventory(item.unit) : ''

	return {
		open: !!item,
		openFor: (next: StockItem) => {
			setItem(next)
			form.reset({
				type: 'in',
				quantity: DEFAULT_QUANTITY.in,
				date: '09.10.2026',
				reason: t('reasonDefault_in'),
			})
		},
		close: () => setItem(null),
		name: item ? tInventory(item.name) : '',
		stockLine: item
			? t('stockLine', {
					quantity: `${item.quantity} ${unit}`,
					minimum: `${item.minimum} ${unit}`,
				})
			: '',
		type,
		setType,
		reasonLabel: t(`reasonLabel_${type}`),
		after: `${after} ${unit}`,
		register: form.register,
		quantityError: errors.quantity?.message
			? tValidation(errors.quantity.message)
			: undefined,
		saving: isSubmitting,
		save: form.handleSubmit(async () => {
			await mockRequest()
			setItem(null)
			toast.show(t(`movementDone_${type}`))
		}),
	}
}

export type TStockMovementModel = ReturnType<typeof useStockMovement>
