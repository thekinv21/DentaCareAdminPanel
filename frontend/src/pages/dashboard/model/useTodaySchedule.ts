'use client'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import {
	type TAppointment,
	TODAY_APPOINTMENTS,
	useAppointmentLabels,
} from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { avatarTone } from '@/shared/ui/avatar'

type TScheduleFilter = 'all' | 'upcoming' | 'done'

/**
 * Query of today's schedule
 */
type TScheduleQuery = { phase: TScheduleFilter }

const isFinished = (a: TAppointment) =>
	a.status === 'done' || a.status === 'noshow'

function matchesPhase(appointment: TAppointment, phase: TScheduleFilter) {
	if (phase === 'all') return true
	return phase === 'done' ? isFinished(appointment) : !isFinished(appointment)
}

/**
 * Today's appointments filtered by phase and mapped to display rows
 */
export function useTodaySchedule() {
	const t = useTranslations('Dashboard')
	const labels = useAppointmentLabels()
	const format = useFormat()
	const filters = useForm<TScheduleQuery>({ defaultValues: { phase: 'all' } })
	const phase = useWatch({ control: filters.control, name: 'phase' })

	const rows = TODAY_APPOINTMENTS.filter(a => matchesPhase(a, phase)).map(
		a => ({
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
		}),
	)

	const phases: { id: TScheduleFilter; label: string }[] = [
		{ id: 'all', label: t('all') },
		{ id: 'upcoming', label: t('upcoming') },
		{ id: 'done', label: t('completed') },
	]

	return { filters, phases, rows }
}
