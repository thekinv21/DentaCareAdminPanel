'use client'

import { useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import {
	LOCALE_META,
	LOCALES,
	translateOptional,
	useChangeLocale,
} from '@/shared/lib/i18n'
import { type TThemePreference, useTheme } from '@/shared/lib/theme'

import {
	NOTIFICATION_CHANNELS,
	NOTIFICATION_EVENTS,
	SECURITY_OPTIONS,
	SESSIONS,
} from './Profile'

type TProfileTab = 'profile' | 'security' | 'notifications'

const LANGUAGE_NOTE = {
	ru: 'default',
	ky: 'stateLanguage',
	en: 'international',
}
const THEMES: { id: TThemePreference; label: string }[] = [
	{ id: 'system', label: 'systemDefault' },
	{ id: 'light', label: 'light' },
	{ id: 'dark', label: 'dark' },
]

/**
 * Profile tabs, preference rows and sessions; language and theme apply immediately
 */
export function useProfileSettings() {
	const t = useTranslations('Profile')
	const locale = useLocale()
	const setLocale = useChangeLocale()
	const { theme, setTheme } = useTheme()
	const [tab, setTab] = useState<TProfileTab>('profile')
	const [ended, setEnded] = useState<string[]>([])

	return {
		tab,
		tabs: [
			{ id: 'profile' as const, label: t('profile') },
			{ id: 'security' as const, label: t('security') },
			{ id: 'notifications' as const, label: t('notifications') },
		],
		selectTab: setTab,
		languages: LOCALES.map(id => ({
			id,
			...LOCALE_META[id],
			note: t(LANGUAGE_NOTE[id]),
			checked: id === locale,
			select: () => setLocale(id),
		})),
		theme,
		themes: THEMES.map(item => ({ ...item, label: t(item.label) })),
		setTheme,
		security: SECURITY_OPTIONS.map(option => ({
			id: option.id,
			label: t(option.label),
			hint: t(option.hint),
		})),
		sessions: SESSIONS.filter(session => !ended.includes(session.id)).map(
			session => ({
				...session,
				where: t(session.where),
				when: translateOptional(t, session.when),
				current: session.id === 'cur',
				end: () => setEnded(current => [...current, session.id]),
			}),
		),
		endOtherSessions: () =>
			setEnded(
				SESSIONS.filter(session => session.id !== 'cur').map(
					session => session.id,
				),
			),
		channels: NOTIFICATION_CHANNELS.map(channel => ({
			id: channel.id,
			label: translateOptional(t, channel.label),
		})),
		events: NOTIFICATION_EVENTS.map(event => ({
			id: event.id,
			label: t(event.label),
			hint: t(event.hint),
			channels: NOTIFICATION_CHANNELS.map(channel => ({
				id: channel.id,
				pref: `${event.id}_${channel.id}`,
				aria: `${t(event.label)}: ${translateOptional(t, channel.aria)}`,
			})),
		})),
	}
}

export type TProfileSettingsModel = ReturnType<typeof useProfileSettings>
