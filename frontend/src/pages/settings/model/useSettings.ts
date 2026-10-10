'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { LOCALE_META, LOCALES, translateOptional } from '@/shared/lib/i18n'

import { CLINIC_FIELDS } from './Clinic'
import { SECTIONS, type TSectionId } from './Sections'
import { SERVICES } from './Services'
import {
	INITIAL_HOURS,
	INITIAL_SWITCHES,
	SMS_TEMPLATES,
	type TSettingsFormValues,
} from './SettingsForm'

/**
 * Active section and the settings form with its save/dirty state
 */
export function useSettings() {
	const t = useTranslations('Settings')
	const [section, setSection] = useState<TSectionId>('payment')

	const methods = useForm<TSettingsFormValues>({
		defaultValues: {
			clinic: Object.fromEntries(
				CLINIC_FIELDS.map(field => [
					field.name,
					translateOptional(t, field.value),
				]),
			) as TSettingsFormValues['clinic'],
			timeZone: 'Asia/Bishkek',
			currency: 'KGS',
			slotInterval: '15',
			lunch: '13:00 – 14:00',
			bookingWindow: 'next30',
			hours: INITIAL_HOURS,
			...INITIAL_SWITCHES,
			defaultLanguage: 'ru',
			smsLanguage: 'patient',
			dateFormat: 'dmy',
			amountFormat: 'som',
			templates: SMS_TEMPLATES,
		},
	})
	const banks = useWatch({ control: methods.control, name: 'banks' })
	const connectedBanks = Object.values(banks).filter(Boolean).length
	const { isDirty, isSubmitting, isSubmitSuccessful } = methods.formState
	const current = SECTIONS.find(item => item.id === section) ?? SECTIONS[0]

	const sectionHint: Record<TSectionId, string> = {
		clinic: t('companyDetailsAddressChairs'),
		hours: t('workingHoursHint'),
		services: t('servicesCount', { n: SERVICES.length }),
		payment: t('banksCount', { n: connectedBanks }),
		languages: LOCALES.map(locale => LOCALE_META[locale].code).join(' · '),
		notifications: t('smsAndEmail'),
	}

	return {
		methods,
		section,
		sections: SECTIONS.map(item => ({
			id: item.id,
			label: t(item.label),
			hint: sectionHint[item.id],
			isSelected: item.id === section,
			badge: item.id === 'payment' ? connectedBanks : null,
		})),
		selectSection: setSection,
		current: { label: t(current.label), description: t(current.description) },
		saved: isSubmitSuccessful,
		dirty: isDirty,
		saving: isSubmitting,
		submit: methods.handleSubmit(async values => {
			await mockRequest()
			methods.reset(values)
		}),
		reset: () => methods.reset(),
	}
}

export type TSettingsModel = ReturnType<typeof useSettings>
