'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import { shortPersonName } from '@/entities/appointment'
import { DOCTORS } from '@/entities/employee'

import { displayDateToIso } from '@/shared/lib/date'
import { useFormat } from '@/shared/lib/i18n'

import { endTime, type TAppointmentFormValues } from './AppointmentFormSchema'
import { BOOKING_SERVICES } from './AppointmentOptions'

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
	const iso = displayDateToIso(date)
	const totalPrice = BOOKING_SERVICES.filter(service =>
		services.includes(service.id),
	).reduce((sum, service) => sum + service.price, 0)

	return {
		timeRange: `${start}–${endTime(start, duration)}`,
		dateLong: iso
			? format.date(iso, { weekday: 'long', day: 'numeric', month: 'long' })
			: date,
		rows: [
			{
				label: t('patient'),
				value: patientName
					? format.name(shortPersonName(patientName))
					: t('notSelected'),
			},
			{ label: t('doctor'), value: format.name(DOCTORS[doctor].shortName) },
			{ label: t('chair'), value: t('chairN', { n: chair }) },
			{ label: t('servicesCount'), value: String(services.length) },
		],
		total: format.som(totalPrice),
	}
}
