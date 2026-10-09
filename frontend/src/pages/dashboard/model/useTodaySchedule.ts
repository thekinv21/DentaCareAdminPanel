'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import {
	type Appointment,
	TODAY_APPOINTMENTS,
	useAppointmentLabels,
} from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { avatarTone } from '@/shared/ui/avatar'

export type ScheduleFilter = 'all' | 'upcoming' | 'done'

const isFinished = (a: Appointment) =>
	a.status === 'done' || a.status === 'noshow'

/**
 * Today's appointments filtered by phase and mapped to display rows
 */
export function useTodaySchedule() {
	const t = useTranslations('Dashboard')
	const labels = useAppointmentLabels()
	const format = useFormat()
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
		procedure: labels.procedure(a.procedure),
		details: `${format.name(DOCTORS[a.doctorId].shortName)} · ${a.duration} ${t('min')}`,
		chair: t('chairNumber', { n: a.chair }),
		status: a.status,
		canInvite: a.status === 'next',
	}))

	const filters: { id: ScheduleFilter; label: string }[] = [
		{ id: 'all', label: t('all') },
		{ id: 'upcoming', label: t('upcoming') },
		{ id: 'done', label: t('completed') },
	]

	return { filter, setFilter, filters, rows }
}
