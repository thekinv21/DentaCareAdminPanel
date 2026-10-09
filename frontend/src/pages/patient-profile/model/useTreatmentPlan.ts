'use client'

import { useTranslations } from 'next-intl'

import { translateOptional, useFormat } from '@/shared/lib/i18n'

import { PLAN_STEPS } from './Profile'

const FOMS_COVERAGE = 6000

/**
 * Plan steps with translated labels and the total / coverage / due summary
 */
export function useTreatmentPlan() {
	const t = useTranslations('PatientProfile')
	const format = useFormat()
	const total = PLAN_STEPS.reduce((sum, step) => sum + step.price, 0)

	return {
		steps: PLAN_STEPS.map((step, index) => ({
			number: index + 1,
			procedure: t(step.procedure),
			tooth: step.tooth,
			date: translateOptional(t, step.date),
			dateMuted: !!step.dateMuted,
			status: { label: t(step.status.label), tone: step.status.tone },
			price: format.som(step.price),
		})),
		totals: [
			{
				label: t('total'),
				value: format.som(total),
				box: 'bg-raised',
				text: 'text-ink-muted',
			},
			{
				label: t('mhif'),
				value: `−${format.som(FOMS_COVERAGE)}`,
				box: 'bg-info-soft',
				text: 'text-info',
			},
			{
				label: t('amountDue'),
				value: format.som(total - FOMS_COVERAGE),
				box: 'bg-brand-soft',
				text: 'text-brand-strong',
			},
		],
	}
}
