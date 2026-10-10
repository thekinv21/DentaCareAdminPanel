'use client'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import type { TTone } from '@/shared/ui/badge'

import {
	CATEGORY_LABEL,
	STOCK,
	stockLevel,
	type TStockCategory,
	type TStockItem,
	type TStockLevel,
} from './Stock'

type TStockFilter = 'all' | 'low' | Exclude<TStockCategory, 'impl'>

/**
 * Query of the stock list: category/shortage tab and name or SKU search
 */
type TStockQuery = { category: TStockFilter; search: string }

const DEFAULT_QUERY: TStockQuery = { category: 'all', search: '' }

const FILTERS: { id: TStockFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'low', label: 'low' },
	{ id: 'anes', label: 'anesthetics' },
	{ id: 'cons', label: 'consumables' },
	{ id: 'rest', label: 'fillingPlacement' },
	{ id: 'endo', label: 'endodontics' },
]

const LEVEL: Record<TStockLevel, { label: string; tone: TTone; bar: string }> =
	{
		ok: { label: 'inStock', tone: 'ok', bar: 'bg-brand' },
		low: { label: 'low', tone: 'warning', bar: 'bg-warning' },
		critical: { label: 'critical', tone: 'danger', bar: 'bg-danger' },
	}

function matchesCategory(item: TStockItem, category: TStockFilter) {
	if (category === 'all') return true
	if (category === 'low') return item.quantity < item.minimum
	return item.category === category
}

type TStockTableOptions = {
	removedSkus: Set<string>
	onMove: (item: TStockItem) => void
	onEdit: (item: TStockItem) => void
	onRemove: (item: TStockItem) => void
}

/**
 * Stock positions filtered by category or shortage and search, with level bars
 */
export function useStockTable(options: TStockTableOptions) {
	const { removedSkus, onMove, onEdit, onRemove } = options

	const t = useTranslations('Inventory')
	const filters = useForm<TStockQuery>({ defaultValues: DEFAULT_QUERY })
	const [category, search] = useWatch({
		control: filters.control,
		name: ['category', 'search'],
	})
	const needle = search.trim().toLowerCase()

	const rows = STOCK.filter(
		item =>
			!removedSkus.has(item.sku) &&
			matchesCategory(item, category) &&
			(!needle || `${t(item.name)} ${item.sku}`.toLowerCase().includes(needle)),
	).map((item, index) => {
		const level = LEVEL[stockLevel(item)]
		const unit = t(item.unit)
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
			move: () => onMove(item),
			edit: () => onEdit(item),
			remove: () => onRemove(item),
		}
	})

	return {
		filters,
		categories: FILTERS.map(option => ({ ...option, label: t(option.label) })),
		rows,
	}
}

export type TStockTableModel = ReturnType<typeof useStockTable>
