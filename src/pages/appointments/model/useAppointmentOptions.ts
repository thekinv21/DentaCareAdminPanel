'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import {
	APPOINTMENT_DURATIONS,
	useAppointmentLabels,
} from '@/entities/appointment'
import {
	CHAIR_NUMBERS,
	DOCTOR_DOT_CLASS,
	DOCTOR_IDS,
	DOCTORS,
} from '@/entities/employee'

import { useFormat } from '@/shared/lib/i18n'

import type { TAppointmentFormValues } from './AppointmentFormSchema'
import {
	BOOKING_SERVICES,
	BOOKING_SOURCES,
	FORM_STATUS_DOT_CLASS,
	FORM_STATUSES,
	START_SLOTS,
} from './AppointmentOptions'

/**
 * Translated chip options of the appointment form
 */
export function useAppointmentOptions() {
	const t = useTranslations('AppointmentForm')
	const labels = useAppointmentLabels()
	const format = useFormat()
	const { control } = useFormContext<TAppointmentFormValues>()
	const start = useWatch({ control, name: 'start' })

	// an edited event can start outside the standard slots; keep its time selectable
	const startSlots = START_SLOTS.includes(start)
		? START_SLOTS
		: [...START_SLOTS, start]

	return {
		doctors: DOCTOR_IDS.map(doctorId => ({
			id: doctorId,
			label: format.name(DOCTORS[doctorId].shortName),
			dotClass: DOCTOR_DOT_CLASS[DOCTORS[doctorId].color],
		})),
		chairs: CHAIR_NUMBERS.map(chair => ({ id: chair, label: String(chair) })),
		startSlots: startSlots.map(time => ({ id: time, label: time })),
		durations: APPOINTMENT_DURATIONS.map(minutes => ({
			id: minutes,
			label: t('minutes', { n: minutes }),
		})),
		services: BOOKING_SERVICES.map(service => ({
			id: service.id,
			label: labels.procedure(service.id),
			trailing: service.price ? format.som(service.price) : t('byPlan'),
		})),
		sources: BOOKING_SOURCES.map(source => ({
			id: source,
			label: t(`source_${source}`),
		})),
		statuses: FORM_STATUSES.map(status => ({
			id: status,
			label: labels.status(status),
			dotClass: FORM_STATUS_DOT_CLASS[status],
		})),
	}
}
