'use client'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { getInitials } from '@/shared/lib/format'
import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { avatarTone } from '@/shared/ui/avatar'

import { TREATMENT_PLANS, type TTreatmentPlan } from './Plans'
import { matchesPlanFilter, PLAN_STATUS, type TPlanFilter } from './PlanStatus'

/**
 * Query of the plan list: stage tab and patient/tooth search
 */
type TPlansFilter = { status: TPlanFilter; search: string }

const DEFAULT_FILTER: TPlansFilter = { status: 'all', search: '' }

const FILTERS: { id: TPlanFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'waiting', label: 'waiting' },
	{ id: 'progress', label: 'inProgress' },
	{ id: 'closed', label: 'closed' },
]

const BAR_CLASS: Partial<Record<TTreatmentPlan['status'], string>> = {
	done: 'bg-success',
	declined: 'bg-line-strong',
}

function matchesSearch(plan: TTreatmentPlan, search: string) {
	const needle = search.trim().toLowerCase()
	return (
		!needle ||
		`${plan.patientName} ${plan.patientId} ${plan.teeth}`
			.toLowerCase()
			.includes(needle)
	)
}

type TPlansTableOptions = {
	removedKeys: Set<string>
	onEdit: (plan: TTreatmentPlan) => void
	onRemove: (plan: TTreatmentPlan) => void
}

/**
 * Plan list filtered by stage and search, with progress and translated labels
 */
export function usePlansTable(options: TPlansTableOptions) {
	const { removedKeys, onEdit, onRemove } = options

	const t = useTranslations('TreatmentPlans')
	const format = useFormat()
	const filters = useForm<TPlansFilter>({ defaultValues: DEFAULT_FILTER })
	const [status, search] = useWatch({
		control: filters.control,
		name: ['status', 'search'],
	})

	const rows = TREATMENT_PLANS.filter(
		plan =>
			!removedKeys.has(plan.patientId) &&
			matchesPlanFilter(plan, status) &&
			matchesSearch(plan, search),
	).map(plan => {
		const index = TREATMENT_PLANS.indexOf(plan)
		const planStatus = PLAN_STATUS[plan.status]
		const patientName = format.name(plan.patientName)
		return {
			key: plan.patientId,
			patientId: plan.patientId,
			patientName,
			initials: getInitials(patientName),
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
			steps: t('of', { done: plan.stepsDone, total: plan.stepsTotal }),
			value: format.som(plan.value),
			status: { label: t(planStatus.label), tone: planStatus.tone },
			edit: () => onEdit(plan),
			remove: () => onRemove(plan),
		}
	})

	return {
		filters,
		statuses: FILTERS.map(option => ({
			id: option.id,
			label: t(option.label),
			count: TREATMENT_PLANS.filter(plan => matchesPlanFilter(plan, option.id))
				.length,
		})),
		rows,
	}
}

export type TPlansTableModel = ReturnType<typeof usePlansTable>
