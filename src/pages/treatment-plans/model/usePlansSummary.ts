'use client'

import { useTranslations } from 'next-intl'

import { useFormat } from '@/shared/lib/i18n'

/**
 * Mock totals until the backend exposes /treatment-plans/summary
 */
const PLANS_SUMMARY = {
	activePlans: 64,
	startedThisMonth: 6,
	awaitingConsent: 9,
	awaitingConsentValue: 312400,
	consentPercent: 78,
	consentPeriodDays: 90,
	consentTargetPercent: 70,
}

/**
 * KPI cards above the plan list
 */
export function usePlansSummary() {
	const t = useTranslations('TreatmentPlans')
	const format = useFormat()

	return {
		activePlans: String(PLANS_SUMMARY.activePlans),
		startedThisMonth: `+${PLANS_SUMMARY.startedThisMonth}`,
		awaitingConsent: String(PLANS_SUMMARY.awaitingConsent),
		awaitingConsentValue: t('totaling', {
			amount: format.som(PLANS_SUMMARY.awaitingConsentValue),
		}),
		consent: `${PLANS_SUMMARY.consentPercent}%`,
		consentTarget: t('periodWithTarget', {
			days: PLANS_SUMMARY.consentPeriodDays,
			percent: PLANS_SUMMARY.consentTargetPercent,
		}),
	}
}
