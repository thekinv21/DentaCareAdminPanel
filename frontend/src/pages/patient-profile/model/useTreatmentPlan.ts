'use client'

import { useTranslations } from 'next-intl'

import { DOCTORS } from '@/entities/employee'

import { useFormat } from '@/shared/lib/i18n'

import { PLAN_AGREEMENT, PLAN_STEPS } from './PatientChart'

/**
 * Mock amount the state insurance (MHIF) pays for this plan
 */
const MHIF_COVERAGE = 6000

/**
 * Plan steps with translated labels and the total / coverage / due summary
 */
export function useTreatmentPlan() {
	const t = useTranslations('PatientProfile')
	const format = useFormat()
	const total = PLAN_STEPS.reduce((sum, step) => sum + step.price, 0)

	return {
		agreement: t('agreedWithPatientOn', {
			date: PLAN_AGREEMENT.date,
			doctor: format.name(DOCTORS[PLAN_AGREEMENT.doctorId].shortName),
		}),
		steps: PLAN_STEPS.map((step, index) => ({
			number: index + 1,
			procedure: t(step.procedure),
			tooth: step.tooth,
			date: !step.date
				? t('notAssigned')
				: step.date.kind === 'today'
					? t('todayAt', { time: step.date.time })
					: step.date.value,
			isDateMissing: !step.date,
			status: { label: t(step.status.label), tone: step.status.tone },
			price: format.som(step.price),
		})),
		totals: [
			{ kind: 'total' as const, label: t('total'), value: format.som(total) },
			{
				kind: 'coverage' as const,
				label: t('mhif'),
				value: `−${format.som(MHIF_COVERAGE)}`,
			},
			{
				kind: 'due' as const,
				label: t('amountDue'),
				value: format.som(total - MHIF_COVERAGE),
			},
		],
	}
}
