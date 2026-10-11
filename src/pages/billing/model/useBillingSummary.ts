'use client'

import { useTranslations } from 'next-intl'

import { useFormat } from '@/shared/lib/i18n'

/**
 * Mock month totals until the backend exposes /billing/summary
 */
const BILLING_SUMMARY = {
	receivedThisMonth: 2184300,
	receivedChangePercent: 9,
	amountDue: 218400,
	debtorCount: 23,
	overdue: 46900,
	overdueInvoiceCount: 6,
}

/**
 * KPI cards above the invoice list
 */
export function useBillingSummary() {
	const t = useTranslations('Billing')
	const format = useFormat()

	return {
		received: format.number(BILLING_SUMMARY.receivedThisMonth),
		receivedChange: `+${BILLING_SUMMARY.receivedChangePercent}%`,
		amountDue: format.number(BILLING_SUMMARY.amountDue),
		debtors: t('patientsCount', { n: BILLING_SUMMARY.debtorCount }),
		overdue: format.number(BILLING_SUMMARY.overdue),
		overdueInvoices: t('invoicesOlderThan30Days', {
			n: BILLING_SUMMARY.overdueInvoiceCount,
		}),
	}
}
