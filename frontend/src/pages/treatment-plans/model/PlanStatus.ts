import type { Tone } from '@/shared/ui/badge'

import type { TreatmentPlan } from './Plans'

export type PlanStatus =
	'draft' | 'waiting' | 'approved' | 'progress' | 'done' | 'declined'

export const PLAN_STATUS: Record<PlanStatus, { label: string; tone: Tone }> = {
	draft: { label: 'draft', tone: 'neutral' },
	waiting: { label: 'awaitingConsent2', tone: 'warning' },
	approved: { label: 'approved', tone: 'info' },
	progress: { label: 'inProgress', tone: 'brand' },
	done: { label: 'completed', tone: 'ok' },
	declined: { label: 'declined', tone: 'danger' },
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
