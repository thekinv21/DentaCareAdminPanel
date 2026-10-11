'use client'

import type { KeyboardEvent } from 'react'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import {
	patientAvatarTone,
	PATIENTS,
	usePatientLabels,
} from '@/entities/patient'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { matchesText } from '@/shared/lib/search'

const MAX_RESULTS = 5

/**
 * Patient lookup of the appointment form: search query and the first matches
 */
export function usePatientSearch() {
	const t = useTranslations('AppointmentForm')
	const patientLabels = usePatientLabels()
	const format = useFormat()
	const search = useForm({ defaultValues: { query: '' } })
	const query = useWatch({ control: search.control, name: 'query' })

	return {
		inputProps: {
			...search.register('query'),
			// Enter looks a patient up; it must not submit the surrounding appointment form
			onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
				if (event.key === 'Enter') event.preventDefault()
			},
		},
		results: PATIENTS.filter(patient =>
			matchesText(`${patient.fullName} ${patient.id} ${patient.phone}`, query),
		)
			.slice(0, MAX_RESULTS)
			.map(patient => {
				const name = format.name(patient.fullName)
				return {
					id: patient.id,
					name,
					phone: patient.phone,
					lastVisit: `${t('lastVisitShort')} ${patientLabels.lastVisit(patient)}`,
					initials: getInitials(name),
					tone: patientAvatarTone(patient.id),
				}
			}),
	}
}

export type TPatientSearchResult = ReturnType<
	typeof usePatientSearch
>['results'][number]
