'use client'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { matchesText } from '@/shared/lib/search'
import type { TTone } from '@/shared/ui/badge'

import { STOCK } from '../api/Mock'
import { stockLevel, type TStockLevel } from '../lib/StockLevel'
import {
	CATEGORY_LABEL,
	STOCK_CATEGORIES,
	type TStockCategory,
	type TStockItem,
} from './Stock'

type TStockFilter = 'all' | 'low' | TStockCategory

/**
 * Query of the stock list: category/shortage tab and name or SKU search
 */
type TStockQuery = { category: TStockFilter; search: string }

const DEFAULT_QUERY: TStockQuery = { category: 'all', search: '' }

const CATEGORY_FILTERS: { id: TStockFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'low', label: 'low' },
	...STOCK_CATEGORIES.map(category => ({
		id: category,
		label: CATEGORY_LABEL[category],
	})),
]

const STOCK_LEVEL_VIEW: Record<
	TStockLevel,
	{ label: string; tone: TTone; barClass: string }
> = {
	ok: { label: 'inStock', tone: 'ok', barClass: 'bg-brand' },
	low: { label: 'low', tone: 'warning', barClass: 'bg-warning' },
	critical: { label: 'critical', tone: 'danger', barClass: 'bg-danger' },
}

const MIN_VISIBLE_FILL = 4
const FIRST_BAR_DELAY_MS = 240
const BAR_DELAY_STEP_MS = 40

function matchesCategory(item: TStockItem, category: TStockFilter) {
	if (category === 'all') return true
	if (category === 'low') return item.quantity < item.minimum
	return item.category === category
}

/**
 * A full bar means twice the minimum stock
 */
const fillPercent = (item: TStockItem) =>
	Math.max(
		MIN_VISIBLE_FILL,
		Math.min(100, Math.round((item.quantity / (item.minimum * 2)) * 100)),
	)

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

	const rows = STOCK.filter(
		item =>
			!removedSkus.has(item.sku) &&
			matchesCategory(item, category) &&
			matchesText(`${t(item.name)} ${item.sku}`, search),
	).map((item, index) => {
		const level = STOCK_LEVEL_VIEW[stockLevel(item)]
		const unit = t(item.unit)
		return {
			sku: item.sku,
			name: t(item.name),
			category: t(CATEGORY_LABEL[item.category]),
			quantity: `${item.quantity} ${unit}`,
			minimum: `${t('minimum')} ${item.minimum} ${unit}`,
			fillPercent: fillPercent(item),
			fillClass: level.barClass,
			animationDelay: FIRST_BAR_DELAY_MS + index * BAR_DELAY_STEP_MS,
			supplier: t(item.supplier),
			expires: item.expires,
			isExpiringSoon: !!item.expiresSoon,
			level: { label: t(level.label), tone: level.tone },
			move: () => onMove(item),
			edit: () => onEdit(item),
			remove: () => onRemove(item),
		}
	})

	return {
		filters,
		categories: CATEGORY_FILTERS.map(option => ({
			...option,
			label: t(option.label),
		})),
		rows,
	}
}

export type TStockTableModel = ReturnType<typeof useStockTable>
export type TStockRow = TStockTableModel['rows'][number]
