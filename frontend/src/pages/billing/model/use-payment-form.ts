'use client'

import { useMemo, useState } from 'react'

import {
	type Invoice,
	PAYMENT_METHODS,
	type PaymentMethodId,
} from '@/entities/invoice'

import { useI18n } from '@/shared/lib/i18n'

import { mockQrPath } from '../lib/mock-qr'

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
	const { t, format } = useI18n()
	const [method, setMethod] = useState<PaymentMethodId>('mbank')
	const isCard = method === 'visa'
	const methodName = t(PAYMENT_METHODS[method].name)
	const qr = useMemo(
		() => mockQrPath(METHOD_SEED[method] + invoiceIndex * 5),
		[method, invoiceIndex],
	)

	return {
		method,
		setMethod,
		methods: Object.values(PAYMENT_METHODS).map(item => ({
			id: item.id,
			name: t(item.name),
			kind: t(item.kind),
			checked: item.id === method,
		})),
		methodName,
		amount: format.number(invoice.balance || invoice.amount),
		isCard,
		qr,
		hint: isCard
			? {
					title: t('Приложите или вставьте карту'),
					text: t('Сумма отправлена на терминал у стойки администратора.'),
					status: t('Терминал · ожидает карту'),
				}
			: {
					title: t('Сканируйте QR в приложении {bank}', { bank: methodName }),
					text: t(
						'Пациент подтверждает платёж в мобильном банке. Статус обновится автоматически.',
					),
					status: t('QR действителен 5:00'),
				},
	}
}

export type PaymentFormModel = ReturnType<typeof usePaymentForm>
