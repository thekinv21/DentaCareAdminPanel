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
	CURRENT_SESSION_ID,
	NOTIFICATION_CHANNELS,
	NOTIFICATION_EVENTS,
	PROFILE_FACTS,
	SECURITY_OPTIONS,
	SESSIONS,
} from './Profile'

type TProfileTab = 'profile' | 'security' | 'notifications'
type TSession = (typeof SESSIONS)[number]

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
	const [endedSessionIds, setEndedSessionIds] = useState<string[]>([])

	const lastActiveText = ({ lastActive }: TSession) => {
		if (lastActive.kind === 'now') return t('now')
		if (lastActive.kind === 'date') return lastActive.date
		return lastActive.kind === 'today'
			? t('todayAt', { time: lastActive.time })
			: t('yesterdayAt', { time: lastActive.time })
	}

	// values for the placeholders of the security texts
	const securityParams = {
		phone: PROFILE_FACTS.maskedPhone,
		minutes: PROFILE_FACTS.autoLockMinutes,
	}

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
			isChecked: id === locale,
			select: () => setLocale(id),
		})),
		theme,
		themes: THEMES.map(item => ({ ...item, label: t(item.label) })),
		setTheme,
		passwordHint: t('passwordAgeHint', { days: PROFILE_FACTS.passwordAgeDays }),
		dailyScheduleLabel: t('dailyScheduleAt', {
			time: PROFILE_FACTS.dailyScheduleTime,
		}),
		security: SECURITY_OPTIONS.map(option => ({
			id: option.id,
			label: t(option.label, securityParams),
			hint: t(option.hint, securityParams),
		})),
		sessions: SESSIONS.filter(
			session => !endedSessionIds.includes(session.id),
		).map(session => ({
			id: session.id,
			device: session.device,
			place: t(session.place),
			lastActive: lastActiveText(session),
			isCurrent: session.id === CURRENT_SESSION_ID,
			end: () => setEndedSessionIds(current => [...current, session.id]),
		})),
		endOtherSessions: () =>
			setEndedSessionIds(
				SESSIONS.filter(session => session.id !== CURRENT_SESSION_ID).map(
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
				ariaLabel: `${t(event.label)}: ${translateOptional(t, channel.ariaLabel)}`,
			})),
		})),
	}
}

export type TProfileSettingsModel = ReturnType<typeof useProfileSettings>
export type TProfileSession = TProfileSettingsModel['sessions'][number]
export type TProfileNotificationEvent = TProfileSettingsModel['events'][number]
