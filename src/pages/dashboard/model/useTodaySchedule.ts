'use client'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import {
	type TAppointment,
	TODAY_APPOINTMENTS,
	useAppointmentLabels,
} from '@/entities/appointment'
import { CHAIR_NUMBERS, DOCTOR_IDS, DOCTORS } from '@/entities/employee'
import { patientAvatarTone } from '@/entities/patient'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'

type TScheduleFilter = 'all' | 'upcoming' | 'done'

/**
 * Query of today's schedule
 */
type TScheduleQuery = { phase: TScheduleFilter }

const isFinished = (appointment: TAppointment) =>
	appointment.status === 'done' || appointment.status === 'noshow'

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

	const rows = TODAY_APPOINTMENTS.filter(appointment =>
		matchesPhase(appointment, phase),
	).map(appointment => {
		const patientName = format.name(appointment.patientName)
		return {
			id: appointment.id,
			time: appointment.time,
			patientId: appointment.patientId,
			patientName,
			initials: getInitials(patientName),
			tone: patientAvatarTone(appointment.patientId),
			procedure: labels.procedure(appointment.procedure, appointment.tooth),
			details: `${format.name(DOCTORS[appointment.doctorId].shortName)} · ${t('minutesCount', { n: appointment.duration })}`,
			chair: t('chairNumber', { n: appointment.chair }),
			status: appointment.status,
			canInvite: appointment.status === 'next',
		}
	})

	return {
		filters,
		phases: [
			{ id: 'all' as const, label: t('all') },
			{ id: 'upcoming' as const, label: t('upcoming') },
			{ id: 'done' as const, label: t('completed') },
		],
		description: t('chairsAndDentists', {
			chairs: CHAIR_NUMBERS.length,
			dentists: DOCTOR_IDS.length,
		}),
		rows,
	}
}

export type TTodayScheduleRow = ReturnType<
	typeof useTodaySchedule
>['rows'][number]
