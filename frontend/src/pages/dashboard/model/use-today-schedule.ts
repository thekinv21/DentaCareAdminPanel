'use client'

import { useState } from 'react'

import { type Appointment, TODAY_APPOINTMENTS } from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { getInitials } from '@/shared/lib/format'
import { useI18n } from '@/shared/lib/i18n'
import { avatarTone } from '@/shared/ui/avatar'

export type ScheduleFilter = 'all' | 'upcoming' | 'done'

const isFinished = (a: Appointment) =>
	a.status === 'done' || a.status === 'noshow'

/**
 * Today's appointments filtered by phase and mapped to display rows
 */
export function useTodaySchedule() {
	const { t, format } = useI18n()
	const [filter, setFilter] = useState<ScheduleFilter>('all')

	const rows = TODAY_APPOINTMENTS.filter(a =>
		filter === 'all'
			? true
			: filter === 'done'
				? isFinished(a)
				: !isFinished(a),
	).map(a => ({
		id: a.id,
		time: a.time,
		patientId: a.patientId,
		patientName: format.name(a.patientName),
		initials: getInitials(format.name(a.patientName)),
		tone: avatarTone(TODAY_APPOINTMENTS.indexOf(a)),
		procedure: t(a.procedure),
		details: `${format.name(DOCTORS[a.doctorId].shortName)} · ${a.duration} ${t('мин')}`,
		chair: t('Кресло {n}', { n: a.chair }),
		status: a.status,
		canInvite: a.status === 'next',
	}))

	const filters: { id: ScheduleFilter; label: string }[] = [
		{ id: 'all', label: t('Все') },
		{ id: 'upcoming', label: t('Предстоящие') },
		{ id: 'done', label: t('Завершённые') },
	]

	return { filter, setFilter, filters, rows }
}
