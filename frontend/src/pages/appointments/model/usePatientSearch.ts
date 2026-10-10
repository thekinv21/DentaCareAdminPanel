'use client'

import type { KeyboardEvent } from 'react'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { PATIENTS } from '@/entities/patient'

import { getInitials } from '@/shared/lib/format'
import { translateOptional, useFormat } from '@/shared/lib/i18n'
import { avatarTone } from '@/shared/ui/avatar'

const MAX_RESULTS = 5

/**
 * Patient lookup of the appointment form: search query and the first matches
 */
export function usePatientSearch() {
	const t = useTranslations('AppointmentForm')
	const tPatient = useTranslations('Patient')
	const format = useFormat()
	const search = useForm({ defaultValues: { query: '' } })
	const query = useWatch({ control: search.control, name: 'query' })
	const needle = query.trim().toLowerCase()

	return {
		inputProps: {
			...search.register('query'),
			// Enter looks a patient up; it must not submit the surrounding appointment form
			onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
				if (event.key === 'Enter') event.preventDefault()
			},
		},
		results: PATIENTS.filter(
			p =>
				!needle ||
				`${p.fullName} ${p.id} ${p.phone}`.toLowerCase().includes(needle),
		)
			.slice(0, MAX_RESULTS)
			.map((p, index) => {
				const name = format.name(p.fullName)
				return {
					id: p.id,
					name,
					phone: p.phone,
					last: `${t('lastVisitShort')} ${translateOptional(tPatient, p.lastVisit)}`,
					initials: getInitials(name),
					tone: avatarTone(index),
				}
			}),
	}
}
