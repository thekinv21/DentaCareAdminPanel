'use client'

import { useTranslations } from 'next-intl'

import { useFormat } from '@/shared/lib/i18n'

import { STOCK_CATEGORIES } from './Stock'

/**
 * Mock totals until the backend exposes /inventory/summary
 */
const INVENTORY_SUMMARY = {
	itemCount: 186,
	lastStockCount: '01.10.2026',
	belowMinimum: 7,
	alreadyOrdered: 3,
	expiringSoon: 4,
	expiringValue: 9280,
	totalValue: 468900,
}

/**
 * Page subtitle and KPI cards of the inventory
 */
export function useInventorySummary() {
	const t = useTranslations('Inventory')
	const format = useFormat()

	return {
		crumb: t('pageCrumb', {
			count: INVENTORY_SUMMARY.itemCount,
			date: INVENTORY_SUMMARY.lastStockCount,
		}),
		belowMinimum: String(INVENTORY_SUMMARY.belowMinimum),
		alreadyOrdered: t('alreadyOrdered', {
			n: INVENTORY_SUMMARY.alreadyOrdered,
		}),
		expiringSoon: String(INVENTORY_SUMMARY.expiringSoon),
		expiringValue: t('totaling', {
			amount: format.som(INVENTORY_SUMMARY.expiringValue),
		}),
		totalValue: format.number(INVENTORY_SUMMARY.totalValue),
		categories: t('categoriesCount', { n: STOCK_CATEGORIES.length }),
	}
}
