'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { shortPersonName } from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { useFormat } from '@/shared/lib/i18n'

import {
	BOOKING_SERVICES,
	endTime,
	ruToIso,
	type TAppointmentFormValues,
} from './AppointmentFormSchema'

/**
 * Aside of the appointment modal: time range, date, people and cost
 */
export function useAppointmentSummary(patientName?: string) {
	const t = useTranslations('AppointmentForm')
	const format = useFormat()
	const { control } = useFormContext<TAppointmentFormValues>()
	const [date, start, duration, doctor, chair, services] = useWatch({
		control,
		name: ['date', 'start', 'duration', 'doctor', 'chair', 'services'],
	})
	const iso = ruToIso(date)
	const total = BOOKING_SERVICES.filter(s => services.includes(s.id)).reduce(
		(sum, s) => sum + s.price,
		0,
	)

	return {
		time: `${start}–${endTime(start, duration)}`,
		dateLong: iso
			? format.date(iso, { weekday: 'long', day: 'numeric', month: 'long' })
			: date,
		rows: [
			[
				t('patient'),
				patientName
					? format.name(shortPersonName(patientName))
					: t('notSelected'),
			],
			[t('doctor'), format.name(DOCTORS[doctor].shortName)],
			[t('chair'), t('chairN', { n: chair })],
			[t('servicesCount'), String(services.length)],
		],
		total: format.som(total),
	}
}
