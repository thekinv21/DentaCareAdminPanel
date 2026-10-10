'use client'

import { useTranslations } from 'next-intl'

import { PAYMENT_METHODS } from './Maps'
import type { TPaymentMethodId } from './Types'

/**
 * Payment methods with translated name, tile code and kind
 */
export function usePaymentMethods() {
	const t = useTranslations('Invoice')
	const method = (id: TPaymentMethodId) => ({
		...PAYMENT_METHODS[id],
		name: t(`methodName.${id}`),
		code: t(`methodCode.${id}`),
		kind: t(PAYMENT_METHODS[id].kind),
	})
	return {
		all: (Object.keys(PAYMENT_METHODS) as TPaymentMethodId[]).map(method),
		byId: method,
	}
}
