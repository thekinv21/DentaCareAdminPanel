'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import { mockRequest } from '@/shared/api'
import { translateOptional } from '@/shared/lib/i18n'

import { CLINIC_FIELDS } from './Clinic'
import { BANK_DETAILS } from './Payments'
import { SECTIONS, type TSectionId } from './Sections'
import {
	INITIAL_HOURS,
	INITIAL_TOGGLES,
	SMS_TEMPLATES,
	type TSettingsFormValues,
} from './SettingsForm'

const BANK_TOGGLES = BANK_DETAILS.map(bank => `toggles.${bank.id}` as const)

/**
 * Active section and the settings form with its save/dirty state
 */
export function useSettings() {
	const t = useTranslations('Settings')
	const [section, setSection] = useState<TSectionId>('pay')

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
			toggles: INITIAL_TOGGLES,
			defaultLanguage: 'ru',
			smsLanguage: 'patient',
			dateFormat: 'dmy',
			amountFormat: 'som',
			templates: SMS_TEMPLATES,
		},
	})
	const banksOn = useWatch({ control: methods.control, name: BANK_TOGGLES })
	const { isDirty, isSubmitting, isSubmitSuccessful } = methods.formState
	const current = SECTIONS.find(item => item.id === section) ?? SECTIONS[0]

	return {
		methods,
		section,
		sections: SECTIONS.map(item => ({
			id: item.id,
			label: t(item.label),
			hint: translateOptional(t, item.hint),
			selected: item.id === section,
			badge: item.id === 'pay' ? banksOn.filter(Boolean).length : null,
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
