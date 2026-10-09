export type StockCategory = 'anes' | 'cons' | 'rest' | 'endo' | 'impl'

export const CATEGORY_LABEL: Record<StockCategory, string> = {
	anes: 'anesthetics',
	cons: 'consumables',
	rest: 'fillingPlacement',
	endo: 'endodontics',
	impl: 'implantology',
}

export interface StockItem {
	name: string
	sku: string
	category: StockCategory
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

/**
 * Mock data until the backend exposes /inventory
 */
export const STOCK: StockItem[] = [
	{
		name: 'lidocaine2WithEpinephrine',
		sku: 'ANS-0102',
		category: 'anes',
		quantity: 12,
		minimum: 40,
		unit: 'cart',
		supplier: 'medsnabBishkek',
		expires: '03.2027',
	},
	{
		name: 'articaine4',
		sku: 'ANS-0110',
		category: 'anes',
		quantity: 18,
		minimum: 30,
		unit: 'cart',
		supplier: 'medsnabBishkek',
		expires: '12.10.2026',
		expiresSoon: true,
	},
	{
		name: 'nitrileGlovesM',
		sku: 'CON-0011',
		category: 'cons',
		quantity: 6,
		minimum: 20,
		unit: 'pk',
		supplier: 'dentAsia',
		expires: '2028',
	},
	{
		name: 'medicalMasks',
		sku: 'CON-0024',
		category: 'cons',
		quantity: 48,
		minimum: 30,
		unit: 'pk',
		supplier: 'dentAsia',
		expires: '2028',
	},
	{
		name: 'compositeA24G',
		sku: 'RES-0201',
		category: 'rest',
		quantity: 22,
		minimum: 10,
		unit: 'syr',
		supplier: 'medsnabBishkek',
		expires: '06.2027',
	},
	{
		name: 'etchingGel37',
		sku: 'RES-0215',
		category: 'rest',
		quantity: 6,
		minimum: 8,
		unit: 'syr',
		supplier: 'medsnabBishkek',
		expires: '19.10.2026',
		expiresSoon: true,
	},
	{
		name: 'guttaPerchaPoints',
		sku: 'END-0302',
		category: 'endo',
		quantity: 9,
		minimum: 15,
		unit: 'pk',
		supplier: 'dentAsia',
		expires: '2029',
	},
	{
		name: 'nitiFiles',
		sku: 'END-0310',
		category: 'endo',
		quantity: 34,
		minimum: 20,
		unit: 'pk',
		supplier: 'medsnabBishkek',
		expires: '—',
	},
	{
		name: 'salivaEjectors',
		sku: 'CON-0040',
		category: 'cons',
		quantity: 410,
		minimum: 200,
		unit: 'pcs',
		supplier: 'dentAsia',
		expires: '—',
	},
	{
		name: 'healingAbutments',
		sku: 'IMP-0405',
		category: 'impl',
		quantity: 4,
		minimum: 6,
		unit: 'pcs',
		supplier: 'implantServis',
		expires: '—',
	},
]

export type StockLevel = 'ok' | 'low' | 'critical'

export function stockLevel(item: StockItem): StockLevel {
	if (item.quantity < item.minimum * 0.5) return 'critical'
	if (item.quantity < item.minimum) return 'low'
	return 'ok'
}
