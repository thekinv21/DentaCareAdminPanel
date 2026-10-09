'use client'

import { useState } from 'react'

import { getInitials } from '@/shared/lib/format'
import { useI18n } from '@/shared/lib/i18n'
import { avatarTone } from '@/shared/ui/avatar'

import { matchesPlanFilter, PLAN_STATUS, type PlanFilter } from './plan-status'
import { TREATMENT_PLANS } from './plans'

const FILTERS: { id: PlanFilter; label: string }[] = [
	{ id: 'all', label: 'Все' },
	{ id: 'waiting', label: 'Ждут' },
	{ id: 'progress', label: 'В работе' },
	{ id: 'closed', label: 'Закрытые' },
]

const BAR_CLASS = { done: 'bg-success', declined: 'bg-line-strong' } as Record<
	string,
	string
>

/**
 * Plan list filtered by stage, with progress and translated labels
 */
export function usePlansTable() {
	const { t, format } = useI18n()
	const [filter, setFilter] = useState<PlanFilter>('all')

	const filters = FILTERS.map(option => ({
		id: option.id,
		label: t(option.label),
		count: TREATMENT_PLANS.filter(plan => matchesPlanFilter(plan, option.id))
			.length,
	}))

	const rows = TREATMENT_PLANS.filter(plan =>
		matchesPlanFilter(plan, filter),
	).map(plan => {
		const index = TREATMENT_PLANS.indexOf(plan)
		const status = PLAN_STATUS[plan.status]
		return {
			key: plan.patientId,
			patientId: plan.patientId,
			patientName: format.name(plan.patientName),
			initials: getInitials(format.name(plan.patientName)),
			tone: avatarTone(index),
			meta: `${plan.patientId} · ${format.name(plan.doctor)}`,
			title: t(plan.title),
			updated: `${t('Обновлён')} ${t(plan.updated)}`,
			teeth: t(plan.teeth),
			progress: plan.stepsTotal
				? Math.max(4, Math.round((plan.stepsDone / plan.stepsTotal) * 100))
				: 0,
			progressDelay: 240 + index * 40,
			progressClass: BAR_CLASS[plan.status] ?? 'bg-brand',
			steps: t('{done} из {total}', {
				done: plan.stepsDone,
				total: plan.stepsTotal,
			}),
			value: format.som(plan.value),
			status: { label: t(status.label), tone: status.tone },
		}
	})

	return { filter, setFilter, filters, rows }
}
