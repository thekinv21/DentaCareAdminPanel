'use client'

import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'
import { useFormState } from 'react-hook-form'

import { useUserLabels } from '@/entities/user'

import { useAuth } from '@/shared/lib/auth'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'

import { PROFILE_FACTS } from './Profile'
import type { TProfileFormValues } from './ProfileFormSchema'

/**
 * Card next to the profile form: the signed-in user, stats and contacts.
 * Name, phone and email follow the last saved form values, not the unsaved input
 */
export function useProfileSummary() {
	const t = useTranslations('Profile')

	const format = useFormat()

	const labels = useUserLabels()

	const router = useRouter()

	const { user: authUser, signOut } = useAuth()

	const { defaultValues } = useFormState<TProfileFormValues>()

	const saved = defaultValues?.profile

	const { workingHours } = PROFILE_FACTS

	const fullName =
		[saved?.firstName, saved?.lastName].filter(Boolean).join(' ') ||
		(authUser ? format.name(authUser.fullName) : '')

	const user = {
		fullName,
		initials: getInitials(fullName),
		role: authUser ? labels.type(authUser.type) : '',
	}

	const stats = PROFILE_FACTS.stats.map(stat => ({
		label: t(stat.label),
		value:
			stat.kind === 'percent'
				? format.percent(stat.value)
				: format.number(stat.value),
	}))

	const contacts = [
		{ kind: 'phone' as const, text: saved?.phone ?? '', isMono: true },
		{ kind: 'email' as const, text: saved?.email ?? '', isMono: false },
		{
			kind: 'workplace' as const,
			text: t('workplaceLine', { chair: PROFILE_FACTS.chair }),
			isMono: false,
		},
		{
			kind: 'hours' as const,
			text: t('workingHoursLine', workingHours),
			isMono: true,
		},
	]

	const onSignOut = () => {
		signOut()

		router.push(ROUTES.login)
	}

	return { user, stats, contacts, onSignOut }
}
