export type StockCategory = 'anes' | 'cons' | 'rest' | 'endo' | 'impl'

export const CATEGORY_LABEL: Record<StockCategory, string> = {
	anes: 'Анестетики',
	cons: 'Расходники',
	rest: 'Пломбирование',
	endo: 'Эндодонтия',
	impl: 'Имплантология',
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
		name: 'Лидокаин 2% с адреналином',
		sku: 'ANS-0102',
		category: 'anes',
		quantity: 12,
		minimum: 40,
		unit: 'карп.',
		supplier: 'МедСнаб Бишкек',
		expires: '03.2027',
	},
	{
		name: 'Артикаин 4%',
		sku: 'ANS-0110',
		category: 'anes',
		quantity: 18,
		minimum: 30,
		unit: 'карп.',
		supplier: 'МедСнаб Бишкек',
		expires: '12.10.2026',
		expiresSoon: true,
	},
	{
		name: 'Перчатки нитриловые · M',
		sku: 'CON-0011',
		category: 'cons',
		quantity: 6,
		minimum: 20,
		unit: 'уп.',
		supplier: 'Дент-Азия',
		expires: '2028',
	},
	{
		name: 'Маски медицинские',
		sku: 'CON-0024',
		category: 'cons',
		quantity: 48,
		minimum: 30,
		unit: 'уп.',
		supplier: 'Дент-Азия',
		expires: '2028',
	},
	{
		name: 'Композит A2 · 4 г',
		sku: 'RES-0201',
		category: 'rest',
		quantity: 22,
		minimum: 10,
		unit: 'шпр.',
		supplier: 'МедСнаб Бишкек',
		expires: '06.2027',
	},
	{
		name: 'Протравочный гель 37%',
		sku: 'RES-0215',
		category: 'rest',
		quantity: 6,
		minimum: 8,
		unit: 'шпр.',
		supplier: 'МедСнаб Бишкек',
		expires: '19.10.2026',
		expiresSoon: true,
	},
	{
		name: 'Гуттаперчевые штифты',
		sku: 'END-0302',
		category: 'endo',
		quantity: 9,
		minimum: 15,
		unit: 'уп.',
		supplier: 'Дент-Азия',
		expires: '2029',
	},
	{
		name: 'Файлы NiTi',
		sku: 'END-0310',
		category: 'endo',
		quantity: 34,
		minimum: 20,
		unit: 'уп.',
		supplier: 'МедСнаб Бишкек',
		expires: '—',
	},
	{
		name: 'Слюноотсосы',
		sku: 'CON-0040',
		category: 'cons',
		quantity: 410,
		minimum: 200,
		unit: 'шт.',
		supplier: 'Дент-Азия',
		expires: '—',
	},
	{
		name: 'Формирователи десны',
		sku: 'IMP-0405',
		category: 'impl',
		quantity: 4,
		minimum: 6,
		unit: 'шт.',
		supplier: 'Имплант-Сервис',
		expires: '—',
	},
]

export type StockLevel = 'ok' | 'low' | 'critical'

export function stockLevel(item: StockItem): StockLevel {
	if (item.quantity < item.minimum * 0.5) return 'critical'
	if (item.quantity < item.minimum) return 'low'
	return 'ok'
}
