'use client'

import { useTranslations } from 'next-intl'

import { useAppointmentLabels } from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { useFormat } from '@/shared/lib/i18n'

import { APPOINTMENT_DOCTORS, BOOKING_SERVICES } from './AppointmentFormSchema'

const DOT = { brand: 'bg-brand', info: 'bg-info', accent: 'bg-accent' } as const

/**
 * Translated dentist and service chips of the appointment form
 */
export function useAppointmentOptions() {
	const t = useTranslations('AppointmentForm')
	const labels = useAppointmentLabels()
	const format = useFormat()

	return {
		doctors: APPOINTMENT_DOCTORS.map(id => ({
			id,
			label: format.name(DOCTORS[id].shortName),
			dot: DOT[DOCTORS[id].color],
		})),
		services: BOOKING_SERVICES.map(s => ({
			id: s.id as string,
			label: labels.procedure(s.id),
			trailing: s.price ? format.som(s.price) : t('byPlan'),
		})),
	}
}
