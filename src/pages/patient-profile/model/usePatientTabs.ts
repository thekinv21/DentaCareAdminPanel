'use client'

import { type KeyboardEvent, useState } from 'react'

import { useTranslations } from 'next-intl'

type TPatientTab = 'chart' | 'plan' | 'history' | 'payments'

const TABS: { id: TPatientTab; label: string }[] = [
	{ id: 'chart', label: 'toothChart' },
	{ id: 'plan', label: 'treatmentPlan' },
	{ id: 'history', label: 'history' },
	{ id: 'payments', label: 'billing' },
]

export const PATIENT_TABPANEL_ID = 'patient-tabpanel'
export const patientTabId = (tab: TPatientTab) => `patient-tab-${tab}`

/**
 * Sections of the patient record; arrow keys move between the tabs
 */

export function usePatientTabs() {
	const t = useTranslations('PatientProfile')
	const [tab, setTab] = useState<TPatientTab>('chart')

	const moveBy = (step: number) => {
		const index = TABS.findIndex(item => item.id === tab)
		const next = TABS[(index + step + TABS.length) % TABS.length]
		setTab(next.id)
		document.getElementById(patientTabId(next.id))?.focus()
	}

	return {
		tab,
		setTab,
		tabs: TABS.map(item => ({
			...item,
			label: t(item.label),
			isSelected: item.id === tab,
		})),
		onTabKeyDown: (event: KeyboardEvent) => {
			if (event.key === 'ArrowRight') moveBy(1)
			if (event.key === 'ArrowLeft') moveBy(-1)
		},
	}
}

export type TPatientTabsModel = ReturnType<typeof usePatientTabs>
