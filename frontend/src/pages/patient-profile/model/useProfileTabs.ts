'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

export type TProfileTab = 'chart' | 'plan' | 'history' | 'payments'

const TABS: { id: TProfileTab; label: string }[] = [
	{ id: 'chart', label: 'toothChart' },
	{ id: 'plan', label: 'treatmentPlan' },
	{ id: 'history', label: 'history' },
	{ id: 'payments', label: 'billing' },
]

export function useProfileTabs() {
	const t = useTranslations('PatientProfile')
	const [tab, setTab] = useState<TProfileTab>('chart')
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

export type TProfileTabsModel = ReturnType<typeof useProfileTabs>
