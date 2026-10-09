'use client'

import { useState } from 'react'

import { useI18n } from '@/shared/lib/i18n'
import type { Tone } from '@/shared/ui/badge'

import {
	CATEGORY_LABEL,
	STOCK,
	type StockCategory,
	type StockLevel,
	stockLevel,
} from './stock'

export type StockFilter = 'all' | 'low' | Exclude<StockCategory, 'impl'>

const FILTERS: { id: StockFilter; label: string }[] = [
	{ id: 'all', label: 'Все' },
	{ id: 'low', label: 'Мало' },
	{ id: 'anes', label: 'Анестетики' },
	{ id: 'cons', label: 'Расходники' },
	{ id: 'rest', label: 'Пломбирование' },
	{ id: 'endo', label: 'Эндодонтия' },
]

const LEVEL: Record<StockLevel, { label: string; tone: Tone; bar: string }> = {
	ok: { label: 'В наличии', tone: 'ok', bar: 'bg-brand' },
	low: { label: 'Мало', tone: 'warning', bar: 'bg-warning' },
	critical: { label: 'Критично', tone: 'danger', bar: 'bg-danger' },
}

/**
 * Stock positions filtered by category or shortage, with level bars
 */
export function useStockTable() {
	const { t } = useI18n()
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
			minimum: `${t('Минимум')} ${item.minimum} ${unit}`,
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
			action: t(low ? 'Заказать' : 'Списать'),
		}
	})

	return {
		filter,
		setFilter,
		filters: FILTERS.map(option => ({ ...option, label: t(option.label) })),
		rows,
	}
}
