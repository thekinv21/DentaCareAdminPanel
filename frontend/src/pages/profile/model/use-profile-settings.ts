'use client'

import { useState } from 'react'

import { LOCALE_META, LOCALES, useI18n } from '@/shared/lib/i18n'
import { type ThemePreference, useTheme } from '@/shared/lib/theme'

import {
	INITIAL_PREFERENCES,
	NOTIFICATION_CHANNELS,
	NOTIFICATION_EVENTS,
	SECURITY_OPTIONS,
	SESSIONS,
} from './profile'

export type ProfileTab = 'profile' | 'security' | 'notifications'

const LANGUAGE_NOTE = {
	ru: 'По умолчанию',
	ky: 'Государственный язык',
	en: 'Международный',
}
const THEMES: { id: ThemePreference; label: string }[] = [
	{ id: 'system', label: 'Как в системе' },
	{ id: 'light', label: 'Светлая' },
	{ id: 'dark', label: 'Тёмная' },
]

/**
 * Profile tabs, personal preferences, sessions; language and theme apply immediately
 */
export function useProfileSettings() {
	const { t, locale, setLocale } = useI18n()
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
			{ id: 'profile' as const, label: t('Профиль') },
			{ id: 'security' as const, label: t('Безопасность') },
			{ id: 'notifications' as const, label: t('Уведомления') },
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
				when: t(session.when),
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
			label: t(channel.label),
		})),
		events: NOTIFICATION_EVENTS.map(event => ({
			id: event.id,
			label: t(event.label),
			hint: t(event.hint),
			channels: NOTIFICATION_CHANNELS.map(channel => ({
				id: channel.id,
				checked: prefs[`${event.id}_${channel.id}`],
				flip: () => flip(`${event.id}_${channel.id}`),
				aria: `${t(event.label)}: ${t(channel.aria)}`,
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
