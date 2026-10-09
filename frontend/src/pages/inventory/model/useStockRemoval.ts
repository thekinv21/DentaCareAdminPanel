'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { mockRequest } from '@/shared/api'
import { useConfirm } from '@/shared/ui/confirm-dialog'

import type { StockItem } from './Stock'

/**
 * Deleting a stock position with "Undo" in the toast
 */
export function useStockRemoval() {
	const t = useTranslations('StockForm')
	const tInventory = useTranslations('Inventory')
	const confirm = useConfirm()
	const [removedSkus, setRemovedSkus] = useState<Set<string>>(new Set())

	const change = (sku: string, removed: boolean) =>
		setRemovedSkus(current => {
			const next = new Set(current)
			if (removed) next.add(sku)
			else next.delete(sku)
			return next
		})

	const remove = (item: StockItem, onDone?: () => void) =>
		confirm({
			tone: 'danger',
			title: t('deleteItemQuestion'),
			description: t('deleteItemDescription'),
			subject: {
				title: tInventory(item.name),
				subtitle: t('skuStock', {
					sku: item.sku,
					quantity: `${item.quantity} ${tInventory(item.unit)}`,
				}),
				initials: '—',
			},
			confirmText: t('delete'),
			pendingText: t('deleting'),
			successText: t('itemDeleted'),
			undo: { onUndo: () => change(item.sku, false), text: t('itemRestored') },
			onConfirm: () =>
				mockRequest().then(() => {
					change(item.sku, true)
					onDone?.()
				}),
		})

	return { removedSkus, remove }
}
