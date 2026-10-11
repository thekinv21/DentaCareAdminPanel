'use client'

import { REVENUE_BY_METHOD, usePaymentMethods } from '@/entities/invoice'

import { useFormat } from '@/shared/lib/i18n'

const LARGEST_PERCENT = Math.max(...REVENUE_BY_METHOD.map(item => item.percent))

/**
 * October revenue by bank, scaled against the largest share
 */
export function useRevenueSplit() {
	const paymentMethods = usePaymentMethods()
	const format = useFormat()
	return REVENUE_BY_METHOD.map(item => {
		const method = paymentMethods.byId(item.method)
		return {
			id: item.method,
			name: method.name,
			sum: format.som(item.sum),
			percent: item.percent,
			barPercent: (item.percent / LARGEST_PERCENT) * 100,
			barClass: method.barClass,
		}
	})
}

export type TRevenueShare = ReturnType<typeof useRevenueSplit>[number]
