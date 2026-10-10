'use client'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { DOCTORS } from '@/entities/employee'
import { patientAvatarTone } from '@/entities/patient'

import { getInitials } from '@/shared/lib/format'
import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { matchesText } from '@/shared/lib/search'

import { TREATMENT_PLANS } from '../api/Mock'
import {
	matchesPlanFilter,
	PLAN_STATUS,
	type TPlanFilter,
	type TTreatmentPlan,
} from './Plans'

/**
 * Query of the plan list: stage tab and patient/tooth search
 */
type TPlansQuery = { status: TPlanFilter; search: string }

const DEFAULT_QUERY: TPlansQuery = { status: 'all', search: '' }

const STATUS_FILTERS: { id: TPlanFilter; label: string }[] = [
	{ id: 'all', label: 'all' },
	{ id: 'waiting', label: 'waiting' },
	{ id: 'progress', label: 'inProgress' },
	{ id: 'closed', label: 'closed' },
]

const PROGRESS_BAR_CLASS: Partial<Record<TTreatmentPlan['status'], string>> = {
	done: 'bg-success',
	declined: 'bg-line-strong',
}

/**
 * A started plan always shows a sliver of progress
 */
const MIN_VISIBLE_PROGRESS = 4
const FIRST_BAR_DELAY_MS = 240
const BAR_DELAY_STEP_MS = 40

type TPlansTableOptions = {
	removedIds: Set<string>
	onEdit: (plan: TTreatmentPlan) => void
	onRemove: (plan: TTreatmentPlan) => void
}

/**
 * Plan list filtered by stage and search, with progress and translated labels
 */
export function usePlansTable(options: TPlansTableOptions) {
	const { removedIds, onEdit, onRemove } = options

	const t = useTranslations('TreatmentPlans')
	const format = useFormat()
	const filters = useForm<TPlansQuery>({ defaultValues: DEFAULT_QUERY })
	const [status, search] = useWatch({
		control: filters.control,
		name: ['status', 'search'],
	})

	const rows = TREATMENT_PLANS.filter(
		plan =>
			!removedIds.has(plan.id) &&
			matchesPlanFilter(plan, status) &&
			matchesText(
				`${plan.patientName} ${plan.patientId} ${plan.teeth}`,
				search,
			),
	).map((plan, index) => {
		const planStatus = PLAN_STATUS[plan.status]
		const patientName = format.name(plan.patientName)
		return {
			id: plan.id,
			patientId: plan.patientId,
			patientName,
			initials: getInitials(patientName),
			tone: patientAvatarTone(plan.patientId),
			meta: `${plan.patientId} · ${format.name(DOCTORS[plan.doctorId].shortName)}`,
			title: t(plan.title),
			updated: `${t('updated')} ${translateOptional(t, plan.updated)}`,
			teeth: translateOptional(t, plan.teeth),
			progress: plan.stepsTotal
				? Math.max(
						MIN_VISIBLE_PROGRESS,
						Math.round((plan.stepsDone / plan.stepsTotal) * 100),
					)
				: 0,
			progressDelay: FIRST_BAR_DELAY_MS + index * BAR_DELAY_STEP_MS,
			progressClass: PROGRESS_BAR_CLASS[plan.status] ?? 'bg-brand',
			steps: t('of', { done: plan.stepsDone, total: plan.stepsTotal }),
			value: format.som(plan.value),
			status: { label: t(planStatus.label), tone: planStatus.tone },
			edit: () => onEdit(plan),
			remove: () => onRemove(plan),
		}
	})

	return {
		filters,
		statuses: STATUS_FILTERS.map(option => ({
			id: option.id,
			label: t(option.label),
			count: TREATMENT_PLANS.filter(plan => matchesPlanFilter(plan, option.id))
				.length,
		})),
		rows,
	}
}

export type TPlansTableModel = ReturnType<typeof usePlansTable>
export type TPlanRow = TPlansTableModel['rows'][number]
