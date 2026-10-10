'use client'

import { useTranslations } from 'next-intl'

import { APPOINTMENT_LEGEND, APPOINTMENT_STATUS } from './Status'
import type { TAppointmentStatus } from './Types'

/**
 * Translated statuses, procedures and the status legend
 */
export function useAppointmentLabels() {
	const t = useTranslations('Appointment')
	return {
		status: (status: TAppointmentStatus) => t(APPOINTMENT_STATUS[status].label),
		/**
		 * `key` is a procedure message key, e.g. "exam" or "filling36"
		 */
		procedure: (key: string) => t(key),
		legend: APPOINTMENT_LEGEND.map(item => ({
			label: t(APPOINTMENT_STATUS[item.status].label),
			swatch: item.swatch,
		})),
	}
}
