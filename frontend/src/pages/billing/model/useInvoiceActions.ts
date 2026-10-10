'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { type TInvoice, usePaymentMethods } from '@/entities/invoice'

import { mockRequest } from '@/shared/api'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useConfirm } from '@/shared/ui/confirm-dialog'

/**
 * Voiding an unpaid invoice (reason required) and refunding a paid one
 */
export function useInvoiceActions() {
	const t = useTranslations('InvoiceForm')
	const paymentMethods = usePaymentMethods()
	const format = useFormat()
	const confirm = useConfirm()
	const [voided, setVoided] = useState<Set<string>>(new Set())

	const methodName = (invoice: TInvoice) =>
		paymentMethods.byId(invoice.method).name
	const confirmSubject = (invoice: TInvoice, subtitle: string) => {
		const name = format.name(invoice.patientName)
		return { title: name, subtitle, initials: getInitials(name) }
	}

	return {
		voided,
		voidInvoice: (invoice: TInvoice) =>
			confirm({
				tone: 'danger',
				title: t('voidQuestion', { number: invoice.number }),
				description: t('voidDescription'),
				reasons: [
					t('reasonWrongServices'),
					t('reasonDuplicate'),
					t('reasonWrongPatient'),
					t('reasonLateDiscount'),
				],
				reasonRequired: true,
				subject: confirmSubject(
					invoice,
					`${invoice.number} · ${format.som(invoice.amount)}`,
				),
				confirmText: t('void'),
				pendingText: t('voiding'),
				successText: t('invoiceVoided', { number: invoice.number }),
				onConfirm: () =>
					mockRequest().then(() =>
						setVoided(current => new Set([...current, invoice.number])),
					),
			}),
		refund: (invoice: TInvoice) => {
			let attempts = 0
			const amount = format.som(invoice.amount)
			confirm({
				tone: 'warning',
				title: t('refundQuestion'),
				description: t('refundDescription', { method: methodName(invoice) }),
				choice: {
					label: t('refundAmount'),
					value: 'full',
					items: [
						{ id: 'full', label: t('refundFull'), hint: amount },
						{
							id: 'part',
							label: t('refundPartial'),
							hint: t('refundPartialHint'),
						},
						{
							id: 'dep',
							label: t('refundToDeposit'),
							hint: t('refundToDepositHint'),
						},
					],
				},
				countdown: 3,
				subject: confirmSubject(
					invoice,
					`${invoice.number} · ${methodName(invoice)}`,
				),
				confirmText: t('refundAmountButton', { amount }),
				pendingText: t('sendingToBank'),
				successText: t('refundSent'),
				onConfirm: () => {
					attempts += 1
					return mockRequest(undefined, {
						fail: attempts === 1 ? t('bankUnavailable') : undefined,
					})
				},
			})
		},
	}
}
