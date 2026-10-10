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
		 * `procedureKey` is a procedure message key, e.g. "filling"
		 */
		procedure: (procedureKey: string, tooth?: string) =>
			tooth
				? t('procedureOnTooth', { procedure: t(procedureKey), tooth })
				: t(procedureKey),
		legend: APPOINTMENT_LEGEND.map(item => ({
			label: t(APPOINTMENT_STATUS[item.status].label),
			swatch: item.swatch,
		})),
	}
}
