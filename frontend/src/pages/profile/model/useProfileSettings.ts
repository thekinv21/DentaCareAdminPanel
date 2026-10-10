'use client'

import { useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { useAuth } from '@/shared/lib/auth'
import {
	LOCALE_META,
	LOCALES,
	translateOptional,
	useChangeLocale,
	useFormat,
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

const PROFILE_TABS = ['profile', 'security', 'notifications'] as const
type TProfileTab = (typeof PROFILE_TABS)[number]
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

const OTHER_SESSION_IDS = SESSIONS.filter(
	session => session.id !== CURRENT_SESSION_ID,
).map(session => session.id)
const SESSION_DATE_FORMAT: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
}

/**
 * Profile tabs, preference rows and sessions; language and theme apply immediately
 */
export function useProfileSettings() {
	const t = useTranslations('Profile')

	const format = useFormat()

	const { user } = useAuth()

	const locale = useLocale()

	const setLocale = useChangeLocale()

	const { theme, setTheme } = useTheme()

	const [tab, onTabChange] = useState<TProfileTab>('profile')

	const [endedSessionIds, setEndedSessionIds] = useState<string[]>([])

	const lastActiveText = ({ lastActive }: TSession) => {
		if (lastActive.kind === 'now') return t('now')

		if (lastActive.kind === 'date')
			return format.date(lastActive.date, SESSION_DATE_FORMAT)

		return lastActive.kind === 'today'
			? t('todayAt', { time: lastActive.time })
			: t('yesterdayAt', { time: lastActive.time })
	}

	// values for the placeholders of the security texts
	const securityParams = {
		phone: PROFILE_FACTS.maskedPhone,
		minutes: PROFILE_FACTS.autoLockMinutes,
	}

	const tabs = PROFILE_TABS.map(id => ({ id, label: t(id) }))

	const languages = LOCALES.map(id => ({
		id,
		...LOCALE_META[id],
		note: t(LANGUAGE_NOTE[id]),
		isChecked: id === locale,
		onSelect: () => setLocale(id),
	}))

	const themes = THEMES.map(item => ({ ...item, label: t(item.label) }))

	const passwordHint = t('passwordAgeHint', {
		days: PROFILE_FACTS.passwordAgeDays,
	})

	const dailyScheduleLabel = t('dailyScheduleAt', {
		time: PROFILE_FACTS.dailyScheduleTime,
	})

	const security = SECURITY_OPTIONS.map(option => ({
		id: option.id,
		label: t(option.label, securityParams),
		hint: t(option.hint, securityParams),
	}))

	const sessions = SESSIONS.filter(
		session => !endedSessionIds.includes(session.id),
	).map(session => ({
		id: session.id,
		device: session.device,
		place: t(session.place),
		lastActive: lastActiveText(session),
		isCurrent: session.id === CURRENT_SESSION_ID,
		onEnd: () => setEndedSessionIds(current => [...current, session.id]),
	}))

	const onEndOtherSessions = () => setEndedSessionIds(OTHER_SESSION_IDS)

	const channels = NOTIFICATION_CHANNELS.map(channel => ({
		id: channel.id,
		label: translateOptional(t, channel.label),
		ariaLabel: translateOptional(t, channel.ariaLabel),
	}))

	const events = NOTIFICATION_EVENTS.map(event => {
		const label = t(event.label)

		return {
			id: event.id,
			label,
			hint: t(event.hint),
			channels: channels.map(channel => ({
				id: channel.id,
				ariaLabel: `${label}: ${channel.ariaLabel}`,
			})),
		}
	})

	const crumb = `${t('account')} · ${format.name(user?.fullName ?? '')}`

	return {
		crumb,
		tab,
		tabs,
		onTabChange,
		languages,
		theme,
		themes,
		setTheme,
		passwordHint,
		dailyScheduleLabel,
		security,
		sessions,
		onEndOtherSessions,
		channels,
		events,
	}
}

export type TProfileSettingsModel = ReturnType<typeof useProfileSettings>
export type TProfileSession = TProfileSettingsModel['sessions'][number]
export type TProfileNotificationEvent = TProfileSettingsModel['events'][number]
