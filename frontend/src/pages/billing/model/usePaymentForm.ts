'use client'

import { useMemo, useState } from 'react'

import { useTranslations } from 'next-intl'

import {
	type Invoice,
	type PaymentMethodId,
	usePaymentMethods,
} from '@/entities/invoice'

import { useFormat } from '@/shared/lib/i18n'

import { mockQrPath } from '../lib/MockQr'

const METHOD_SEED: Record<PaymentMethodId, number> = {
	visa: 3,
	mbank: 7,
	komp: 11,
	optima: 13,
}

/**
 * Selected payment method and the matching terminal/QR instructions
 */
export function usePaymentForm(invoice: Invoice, invoiceIndex: number) {
	const t = useTranslations('Billing')
	const paymentMethods = usePaymentMethods()
	const format = useFormat()
	const [method, setMethod] = useState<PaymentMethodId>('mbank')
	const isCard = method === 'visa'
	const methodName = paymentMethods.byId(method).name
	const qr = useMemo(
		() => mockQrPath(METHOD_SEED[method] + invoiceIndex * 5),
		[method, invoiceIndex],
	)

	return {
		method,
		setMethod,
		methods: paymentMethods.all.map(item => ({
			id: item.id,
			name: item.name,
			kind: item.kind,
			checked: item.id === method,
		})),
		methodName,
		amount: format.number(invoice.balance || invoice.amount),
		isCard,
		qr,
		hint: isCard
			? {
					title: t('tapOrInsertCard'),
					text: t('theAmountHasBeen'),
					status: t('terminalWaitingForCard'),
				}
			: {
					title: t('scanTheQrIn', { bank: methodName }),
					text: t('thePatientConfirmsThe'),
					status: t('qrValidFor5'),
				},
	}
}

export type PaymentFormModel = ReturnType<typeof usePaymentForm>
