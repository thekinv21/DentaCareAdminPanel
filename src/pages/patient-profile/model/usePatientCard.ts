'use client'

import { useTranslations } from 'next-intl'

import { DOCTORS } from '@/entities/employee'
import { PATIENTS } from '@/entities/patient'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'

import { PATIENT_CARD } from './PatientChart'

/**
 * Header card of the patient record. The record is mocked: every id opens the
 * same chart until GET /patients/:id exists.
 */
export function usePatientCard(patientId: string) {
	const t = useTranslations('PatientProfile')
	const format = useFormat()
	const patient = PATIENTS.find(item => item.id === patientId) ?? PATIENTS[0]
	const name = format.name(patient.fullName)

	return {
		id: patientId,
		name,
		initials: getInitials(name),
		tone: 'brand' as const,
		details: t('patientDetails', {
			gender: t(`genderShort_${PATIENT_CARD.gender}`),
			age: patient.age,
			birthDate: PATIENT_CARD.birthDate,
		}),
		phone: patient.phone,
		doctor: t('attendingDentist', {
			name: format.name(DOCTORS[PATIENT_CARD.doctorId].shortName),
		}),
		allergies: PATIENT_CARD.allergies.map(allergy => t(allergy)),
		isMhifCovered: patient.flags.includes('foms'),
		balanceDue: patient.balance
			? t('balanceDue', { amount: format.som(patient.balance) })
			: null,
	}
}

export type TPatientCardModel = ReturnType<typeof usePatientCard>
