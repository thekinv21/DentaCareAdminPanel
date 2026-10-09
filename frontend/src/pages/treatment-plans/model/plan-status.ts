import type { Tone } from '@/shared/ui/badge'

import type { TreatmentPlan } from './plans'

export type PlanStatus =
	'draft' | 'waiting' | 'approved' | 'progress' | 'done' | 'declined'

export const PLAN_STATUS: Record<PlanStatus, { label: string; tone: Tone }> = {
	draft: { label: 'Черновик', tone: 'neutral' },
	waiting: { label: 'Ждёт согласия', tone: 'warning' },
	approved: { label: 'Согласован', tone: 'info' },
	progress: { label: 'В работе', tone: 'brand' },
	done: { label: 'Завершён', tone: 'ok' },
	declined: { label: 'Отклонён', tone: 'danger' },
}

export type PlanFilter = 'all' | 'waiting' | 'progress' | 'closed'

const FILTER_STATUSES: Record<Exclude<PlanFilter, 'all'>, PlanStatus[]> = {
	waiting: ['waiting', 'draft'],
	progress: ['progress', 'approved'],
	closed: ['done', 'declined'],
}

export function matchesPlanFilter(plan: TreatmentPlan, filter: PlanFilter) {
	return filter === 'all' || FILTER_STATUSES[filter].includes(plan.status)
}
