'use client'

import { useTranslations } from 'next-intl'

import { DOCTORS } from '@/entities/employee'

import { useFormat } from '@/shared/lib/i18n'

import { VISITS } from './PatientChart'

/**
 * Past visits, newest first, with the dentist of each
 */

export function useVisitHistory() {
	const t = useTranslations('PatientProfile')
	const format = useFormat()

	return VISITS.map((visit, index) => ({
		key: `${visit.date}-${visit.title}`,
		title: t(visit.title),
		tooth: visit.tooth,
		meta: `${visit.date} · ${format.name(DOCTORS[visit.doctorId].shortName)}`,
		note: visit.note ? t(visit.note) : undefined,
		isDone: visit.isDone,
		isLast: index === VISITS.length - 1,
	}))
}
