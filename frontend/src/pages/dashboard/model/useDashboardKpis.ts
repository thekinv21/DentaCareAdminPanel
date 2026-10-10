'use client'

import { useTranslations } from 'next-intl'

import { useFormat } from '@/shared/lib/i18n'

/**
 * Mock day totals until the backend exposes /dashboard/summary
 */
const DAY_SUMMARY = {
	appointments: 28,
	appointmentsChange: 4,
	completedLastWeek: 9,
	chairUtilizationPercent: 86,
	revenue: 142500,
	revenueChangePercent: 12,
	awaitingPayment: 18400,
	debtorCount: 3,
}

/**
 * KPI cards at the top of the dashboard
 */
export function useDashboardKpis() {
	const t = useTranslations('Dashboard')
	const format = useFormat()

	return {
		appointments: String(DAY_SUMMARY.appointments),
		appointmentsChange: `+${DAY_SUMMARY.appointmentsChange}`,
		appointmentsComparison: t('vsSameDayLastWeek', {
			completed: DAY_SUMMARY.completedLastWeek,
		}),
		utilizationPercent: DAY_SUMMARY.chairUtilizationPercent,
		utilization: `${DAY_SUMMARY.chairUtilizationPercent}%`,
		revenue: format.number(DAY_SUMMARY.revenue),
		revenueChange: `+${DAY_SUMMARY.revenueChangePercent}%`,
		awaitingPayment: format.number(DAY_SUMMARY.awaitingPayment),
		debtors: t('patientsWithLink', { n: DAY_SUMMARY.debtorCount }),
	}
}
