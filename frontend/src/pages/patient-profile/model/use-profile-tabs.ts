'use client'

import { useState } from 'react'

import { useI18n } from '@/shared/lib/i18n'

export type ProfileTab = 'chart' | 'plan' | 'history' | 'payments'

const TABS: { id: ProfileTab; label: string }[] = [
	{ id: 'chart', label: 'Зубная формула' },
	{ id: 'plan', label: 'План лечения' },
	{ id: 'history', label: 'История' },
	{ id: 'payments', label: 'Оплаты' },
]

export function useProfileTabs() {
	const { t } = useI18n()
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
