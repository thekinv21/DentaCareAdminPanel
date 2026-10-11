'use client'

import { useTranslations } from 'next-intl'

import {
	NOW_TIME,
	TODAY_APPOINTMENTS,
	toMinutes,
	useAppointmentLabels,
} from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'
import { patientAvatarTone, PATIENTS } from '@/entities/patient'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'

/**
 * The appointment marked "next" today, with its patient's card details
 */
export function useNextPatient() {
	const t = useTranslations('Dashboard')
	const labels = useAppointmentLabels()
	const format = useFormat()

	const appointment = TODAY_APPOINTMENTS.find(item => item.status === 'next')
	if (!appointment) return null
	const patient = PATIENTS.find(item => item.id === appointment.patientId)
	const name = format.name(appointment.patientName)

	return {
		patientId: appointment.patientId,
		name,
		initials: getInitials(name),
		tone: patientAvatarTone(appointment.patientId),
		startsIn: t('startsIn', {
			time: appointment.time,
			minutes: toMinutes(appointment.time) - toMinutes(NOW_TIME),
		}),
		meta: patient ? t('ageCheckedIn', { age: patient.age }) : '',
		details: [
			{
				label: t('service'),
				value: labels.procedure(appointment.procedure, appointment.tooth),
			},
			{
				label: t('chair'),
				value: `${t('chairNumber', { n: appointment.chair })} · ${format.name(DOCTORS[appointment.doctorId].shortName)}`,
			},
			{
				label: t('duration'),
				value: t('minutesCount', { n: appointment.duration }),
			},
		],
		hasAllergy: !!patient?.flags.includes('allergy'),
		isMhifCovered: !!patient?.flags.includes('foms'),
	}
}
