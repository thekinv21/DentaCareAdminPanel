'use client'

import { REVENUE_BY_METHOD, usePaymentMethods } from '@/entities/invoice'

import { useFormat } from '@/shared/lib/i18n'

const TOP_SHARE = Math.max(...REVENUE_BY_METHOD.map(item => item.percent))

/**
 * October revenue by bank, scaled against the largest share
 */
export function useRevenueSplit() {
	const methods = usePaymentMethods()
	const format = useFormat()
	return REVENUE_BY_METHOD.map(item => {
		const method = methods.byId(item.method)
		return {
			id: item.method,
			name: method.name,
			sum: format.som(item.sum),
			percent: item.percent,
			bar: (item.percent / TOP_SHARE) * 100,
			barClass: method.barClass,
		}
	})
}
