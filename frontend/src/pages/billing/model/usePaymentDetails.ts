'use client'

import { useTranslations } from 'next-intl'
import { useWatch } from 'react-hook-form'

import { type TPaymentMethodId, usePaymentMethods } from '@/entities/invoice'

import { useFormat } from '@/shared/lib/i18n'

import { mockQrPath } from '../lib/MockQr'
import type { TPaymentModel } from './usePayment'

const METHOD_SEED: Record<TPaymentMethodId, number> = {
	visa: 3,
	mbank: 7,
	komp: 11,
	optima: 13,
}

/**
 * Method tiles, entered amount and the matching terminal/QR instructions
 */
export function usePaymentDetails(payment: TPaymentModel) {
	const t = useTranslations('Billing')
	const paymentMethods = usePaymentMethods()
	const format = useFormat()
	const [amount, method] = useWatch({
		control: payment.methods.control,
		name: ['amount', 'method'],
	})
	const isCard = method === 'visa'
	const methodName = paymentMethods.byId(method).name

	return {
		methods: paymentMethods.all,
		methodName,
		amount: `${format.number(Number(amount) || 0)} ${t('som')}`,
		balance: `${format.number(payment.invoice.balance || payment.invoice.amount)} ${t('som')}`,
		isCard,
		qr: mockQrPath(METHOD_SEED[method] + payment.invoiceIndex * 5),
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

export type TPaymentDetails = ReturnType<typeof usePaymentDetails>
