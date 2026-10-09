'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

export type ProfileTab = 'chart' | 'plan' | 'history' | 'payments'

const TABS: { id: ProfileTab; label: string }[] = [
	{ id: 'chart', label: 'toothChart' },
	{ id: 'plan', label: 'treatmentPlan' },
	{ id: 'history', label: 'history' },
	{ id: 'payments', label: 'billing' },
]

export function useProfileTabs() {
	const t = useTranslations('PatientProfile')
	const [tab, setTab] = useState<ProfileTab>('chart')
	return {
		tab,
		setTab,
		tabs: TABS.map(item => ({
			...item,
			label: t(item.label),
			selected: item.id === tab,
		})),
	}
}

export type ProfileTabsModel = ReturnType<typeof useProfileTabs>
