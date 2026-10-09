'use client'

import { useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import {
	LOCALE_META,
	LOCALES,
	translateOptional,
	useChangeLocale,
} from '@/shared/lib/i18n'
import { type ThemePreference, useTheme } from '@/shared/lib/theme'

import {
	INITIAL_PREFERENCES,
	NOTIFICATION_CHANNELS,
	NOTIFICATION_EVENTS,
	SECURITY_OPTIONS,
	SESSIONS,
} from './Profile'

export type ProfileTab = 'profile' | 'security' | 'notifications'

const LANGUAGE_NOTE = {
	ru: 'default',
	ky: 'stateLanguage',
	en: 'international',
}
const THEMES: { id: ThemePreference; label: string }[] = [
	{ id: 'system', label: 'systemDefault' },
	{ id: 'light', label: 'light' },
	{ id: 'dark', label: 'dark' },
]

/**
 * Profile tabs, personal preferences, sessions; language and theme apply immediately
 */
export function useProfileSettings() {
	const t = useTranslations('Profile')
	const locale = useLocale()
	const setLocale = useChangeLocale()
	const { theme, setTheme } = useTheme()
	const [tab, setTab] = useState<ProfileTab>('profile')
	const [prefs, setPrefs] = useState(INITIAL_PREFERENCES)
	const [ended, setEnded] = useState<string[]>([])
	const [saved, setSaved] = useState(false)

	const flip = (id: string) => {
		setPrefs(current => ({ ...current, [id]: !current[id] }))
		setSaved(false)
	}

	return {
		tab,
		tabs: [
			{ id: 'profile' as const, label: t('profile') },
			{ id: 'security' as const, label: t('security') },
			{ id: 'notifications' as const, label: t('notifications') },
		],
		selectTab: (next: ProfileTab) => {
			setTab(next)
			setSaved(false)
		},
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
			...option,
			label: t(option.label),
			hint: t(option.hint),
			checked: prefs[option.id],
			flip: () => flip(option.id),
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
			...channel,
			label: translateOptional(t, channel.label),
		})),
		events: NOTIFICATION_EVENTS.map(event => ({
			id: event.id,
			label: t(event.label),
			hint: t(event.hint),
			channels: NOTIFICATION_CHANNELS.map(channel => ({
				id: channel.id,
				checked: prefs[`${event.id}_${channel.id}`],
				flip: () => flip(`${event.id}_${channel.id}`),
				aria: `${t(event.label)}: ${translateOptional(t, channel.aria)}`,
			})),
		})),
		saved,
		save: () => setSaved(true),
		reset: () => {
			setPrefs(INITIAL_PREFERENCES)
			setSaved(false)
		},
	}
}

export type ProfileSettingsModel = ReturnType<typeof useProfileSettings>
