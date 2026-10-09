'use client'

import { PAYMENT_METHODS, REVENUE_BY_METHOD } from '@/entities/invoice'

import { useI18n } from '@/shared/lib/i18n'

const TOP_SHARE = Math.max(...REVENUE_BY_METHOD.map(item => item.percent))

/**
 * October revenue by bank, scaled against the largest share
 */
export function useRevenueSplit() {
	const { t, format } = useI18n()
	return REVENUE_BY_METHOD.map(item => ({
		id: item.method,
		name: t(PAYMENT_METHODS[item.method].name),
		sum: format.som(item.sum),
		percent: item.percent,
		bar: (item.percent / TOP_SHARE) * 100,
		barClass: PAYMENT_METHODS[item.method].barClass,
	}))
}
