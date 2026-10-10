'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { useToast } from '@/shared/ui/toast'

import type { TStockItem } from './Stock'
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

function stockAfter(type: TMovementType, current: number, quantity: number) {
	if (type === 'in') return current + quantity
	if (type === 'out') return Math.max(0, current - quantity)
	return quantity
}

/**
 * Stock in, write-off or count correction for one position
 */
export function useStockMovement() {
	const t = useTranslations('StockForm')
	const tInventory = useTranslations('Inventory')
	const toast = useToast()
	const [item, setItem] = useState<TStockItem | null>(null)

	const methods = useForm<TMovementInput, unknown, TMovementValues>({
		resolver: zodResolver(movementSchema),
	})
	const [type = 'in', quantity] = useWatch({
		control: methods.control,
		name: ['type', 'quantity'],
	})
	const current = item?.quantity ?? 0
	const unit = item ? tInventory(item.unit) : ''
	const close = () => setItem(null)

	return {
		methods,
		open: !!item,
		openFor: (next: TStockItem) => {
			setItem(next)
			methods.reset({
				type: 'in',
				quantity: DEFAULT_QUANTITY.in,
				date: '09.10.2026',
				reason: t('reasonDefault_in'),
			})
		},
		close,
		name: item ? tInventory(item.name) : '',
		stockLine: item
			? t('stockLine', {
					quantity: `${item.quantity} ${unit}`,
					minimum: `${item.minimum} ${unit}`,
				})
			: '',
		type,
		changeType: (next: TMovementType) => {
			methods.setValue('type', next)
			methods.setValue(
				'quantity',
				next === 'adj' ? String(current) : DEFAULT_QUANTITY[next],
			)
			methods.setValue('reason', t(`reasonDefault_${next}`))
		},
		reasonLabel: t(`reasonLabel_${type}`),
		after: `${stockAfter(type, current, Number(quantity) || 0)} ${unit}`,
		saving: methods.formState.isSubmitting,
		submit: methods.handleSubmit(async values => {
			await mockRequest()
			close()
			toast.show(t(`movementDone_${values.type}`))
		}),
	}
}

export type TStockMovementModel = ReturnType<typeof useStockMovement>
