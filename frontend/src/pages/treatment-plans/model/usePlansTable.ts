'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { getInitials } from '@/shared/lib/format'
import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { avatarTone } from '@/shared/ui/avatar'

import { TREATMENT_PLANS, type TreatmentPlan } from './Plans'
import { matchesPlanFilter, PLAN_STATUS, type PlanFilter } from './PlanStatus'

const FILTERS: { id: PlanFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'waiting', label: 'waiting' },
	{ id: 'progress', label: 'inProgress' },
	{ id: 'closed', label: 'closed' },
]

const BAR_CLASS = { done: 'bg-success', declined: 'bg-line-strong' } as Record<
	string,
	string
>

/**
 * Plan list filtered by stage, with progress and translated labels
 */
type TPlansTableOptions = {
	removedKeys: Set<string>
	onEdit: (plan: TreatmentPlan) => void
	onRemove: (plan: TreatmentPlan) => void
}

export function usePlansTable({
	removedKeys,
	onEdit,
	onRemove,
}: TPlansTableOptions) {
	const t = useTranslations('TreatmentPlans')
	const format = useFormat()
	const [filter, setFilter] = useState<PlanFilter>('all')

	const filters = FILTERS.map(option => ({
		id: option.id,
		label: t(option.label),
		count: TREATMENT_PLANS.filter(plan => matchesPlanFilter(plan, option.id))
			.length,
	}))

	const rows = TREATMENT_PLANS.filter(
		plan => !removedKeys.has(plan.patientId) && matchesPlanFilter(plan, filter),
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
			updated: `${t('updated')} ${translateOptional(t, plan.updated)}`,
			teeth: translateOptional(t, plan.teeth),
			progress: plan.stepsTotal
				? Math.max(4, Math.round((plan.stepsDone / plan.stepsTotal) * 100))
				: 0,
			progressDelay: 240 + index * 40,
			progressClass: BAR_CLASS[plan.status] ?? 'bg-brand',
			steps: t('of', {
				done: plan.stepsDone,
				total: plan.stepsTotal,
			}),
			value: format.som(plan.value),
			status: { label: t(status.label), tone: status.tone },
			edit: () => onEdit(plan),
			remove: () => onRemove(plan),
		}
	})

	return { filter, setFilter, filters, rows }
}

export type TPlansTableModel = ReturnType<typeof usePlansTable>
