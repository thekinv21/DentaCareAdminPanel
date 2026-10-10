import type { TDoctorId } from '@/entities/employee'

import type { TTone } from '@/shared/ui/badge'

export type TPlanStatus =
	'draft' | 'waiting' | 'approved' | 'progress' | 'done' | 'declined'

export type TTreatmentPlan = {
	id: string
	patientId: string
	patientName: string
	/**
	 * Message key of the TreatmentPlans namespace
	 */
	title: string
	teeth: string
	stepsDone: number
	stepsTotal: number
	value: number
	status: TPlanStatus
	doctorId: TDoctorId
	/**
	 * "dd.mm" of the current year, or a message key
	 */
	updated: string
}

export const PLAN_STATUS: Record<TPlanStatus, { label: string; tone: TTone }> =
	{
		draft: { label: 'draft', tone: 'neutral' },
		waiting: { label: 'awaitingConsent2', tone: 'warning' },
		approved: { label: 'approved', tone: 'info' },
		progress: { label: 'inProgress', tone: 'brand' },
		done: { label: 'completed', tone: 'ok' },
		declined: { label: 'declined', tone: 'danger' },
	}

export type TPlanFilter = 'all' | 'waiting' | 'progress' | 'closed'

const FILTER_STATUSES: Record<Exclude<TPlanFilter, 'all'>, TPlanStatus[]> = {
	waiting: ['waiting', 'draft'],
	progress: ['progress', 'approved'],
	closed: ['done', 'declined'],
}

export function matchesPlanFilter(plan: TTreatmentPlan, filter: TPlanFilter) {
	return filter === 'all' || FILTER_STATUSES[filter].includes(plan.status)
}
