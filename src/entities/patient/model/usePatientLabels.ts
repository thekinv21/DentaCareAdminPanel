'use client'

import { useTranslations } from 'next-intl'

import { MOCK_TODAY } from '@/shared/config'
import { isoToDisplayDate } from '@/shared/lib/date'

import type { TPatient } from './Types'

const TODAY_DISPLAY = isoToDisplayDate(MOCK_TODAY)

/**
 * Translated age and visit dates of a patient
 */
export function usePatientLabels() {
	const t = useTranslations('Patient')

	return {
		age: (patient: Pick<TPatient, 'age'>) => t('ageYears', { n: patient.age }),
		lastVisit: (patient: Pick<TPatient, 'lastVisit'>) =>
			patient.lastVisit === TODAY_DISPLAY ? t('today') : patient.lastVisit,
		nextVisit: (patient: Pick<TPatient, 'nextVisit' | 'isNextVisitToday'>) => {
			if (!patient.nextVisit) return null
			return patient.isNextVisitToday
				? t('todayAt', { time: patient.nextVisit })
				: patient.nextVisit
		},
	}
}
