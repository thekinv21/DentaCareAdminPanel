'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import type { Tone } from '@/shared/ui/badge'

import {
	CATEGORY_LABEL,
	STOCK,
	type StockCategory,
	type StockLevel,
	stockLevel,
} from './Stock'

export type StockFilter = 'all' | 'low' | Exclude<StockCategory, 'impl'>

const FILTERS: { id: StockFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'low', label: 'low' },
	{ id: 'anes', label: 'anesthetics' },
	{ id: 'cons', label: 'consumables' },
	{ id: 'rest', label: 'fillingPlacement' },
	{ id: 'endo', label: 'endodontics' },
]

const LEVEL: Record<StockLevel, { label: string; tone: Tone; bar: string }> = {
	ok: { label: 'inStock', tone: 'ok', bar: 'bg-brand' },
	low: { label: 'low', tone: 'warning', bar: 'bg-warning' },
	critical: { label: 'critical', tone: 'danger', bar: 'bg-danger' },
}

/**
 * Stock positions filtered by category or shortage, with level bars
 */
export function useStockTable() {
	const t = useTranslations('Inventory')
	const [filter, setFilter] = useState<StockFilter>('all')

	const rows = STOCK.filter(item =>
		filter === 'all'
			? true
			: filter === 'low'
				? item.quantity < item.minimum
				: item.category === filter,
	).map((item, index) => {
		const level = LEVEL[stockLevel(item)]
		const unit = t(item.unit)
		const low = item.quantity < item.minimum
		return {
			key: item.sku,
			name: t(item.name),
			sku: item.sku,
			category: t(CATEGORY_LABEL[item.category]),
			quantity: `${item.quantity} ${unit}`,
			minimum: `${t('minimum')} ${item.minimum} ${unit}`,
			fill: Math.max(
				4,
				Math.min(100, Math.round((item.quantity / (item.minimum * 2)) * 100)),
			),
			fillClass: level.bar,
			delay: 240 + index * 40,
			supplier: t(item.supplier),
			expires: item.expires,
			expiresSoon: !!item.expiresSoon,
			level: { label: t(level.label), tone: level.tone },
			action: t(low ? 'order' : 'writeOff'),
		}
	})

	return {
		filter,
		setFilter,
		filters: FILTERS.map(option => ({ ...option, label: t(option.label) })),
		rows,
	}
}
