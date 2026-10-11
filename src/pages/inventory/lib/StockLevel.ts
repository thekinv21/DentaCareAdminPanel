import type { TStockItem } from '../model/Stock'

/**
 * Below half of the minimum is critical
 */
const CRITICAL_SHARE = 0.5

export type TStockLevel = 'ok' | 'low' | 'critical'

export function stockLevel(item: TStockItem): TStockLevel {
	if (item.quantity < item.minimum * CRITICAL_SHARE) return 'critical'
	if (item.quantity < item.minimum) return 'low'
	return 'ok'
}
