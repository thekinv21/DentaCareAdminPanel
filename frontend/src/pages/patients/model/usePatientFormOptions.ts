'use client'

import { useTranslations } from 'next-intl'

import { DOCTOR_IDS, DOCTORS } from '@/entities/employee'

import { LOCALE_META, useFormat } from '@/shared/lib/i18n'

import { ALLERGIES, CONDITIONS, INSURANCE } from './PatientFormSchema'

/**
 * Translated chip options of the patient card
 */
export function usePatientFormOptions() {
	const t = useTranslations('PatientForm')
	const format = useFormat()

	return {
		allergies: ALLERGIES.map(allergy => ({
			id: allergy,
			label: t(`allergy_${allergy}`),
		})),
		conditions: CONDITIONS.map(condition => ({
			id: condition,
			label: t(`condition_${condition}`),
		})),
		insurance: INSURANCE.map(insurance => ({
			id: insurance,
			label: t(`insurance_${insurance}`),
		})),
		doctors: DOCTOR_IDS.map(doctorId => ({
			id: doctorId,
			label: format.name(DOCTORS[doctorId].shortName),
		})),
		genders: [
			{ id: 'f' as const, label: t('female') },
			{ id: 'm' as const, label: t('male') },
		],
		smsLanguages: (['ru', 'ky'] as const).map(locale => ({
			id: locale,
			label: LOCALE_META[locale].name,
		})),
	}
}
