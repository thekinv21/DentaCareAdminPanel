export const STOCK_CATEGORIES = [
	'anesthetics',
	'consumables',
	'restorative',
	'endodontics',
	'implantology',
	'hygiene',
] as const

export type TStockCategory = (typeof STOCK_CATEGORIES)[number]

/**
 * Message key of each category in the Inventory namespace
 */
export const CATEGORY_LABEL: Record<TStockCategory, string> = {
	anesthetics: 'anesthetics',
	consumables: 'consumables',
	restorative: 'fillingPlacement',
	endodontics: 'endodontics',
	implantology: 'implantology',
	hygiene: 'hygiene',
}

export type TStockItem = {
	name: string
	sku: string
	category: TStockCategory
	quantity: number
	minimum: number
	unit: string
	supplier: string
	expires: string
	/**
	 * Expires within 30 days
	 */
	expiresSoon?: boolean
}
