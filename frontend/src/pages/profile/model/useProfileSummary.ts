'use client'

import { useTranslations } from 'next-intl'
import { useFormState } from 'react-hook-form'

import { useCurrentUser } from '@/entities/employee'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'

import { PROFILE_FACTS } from './Profile'
import type { TProfileFormValues } from './ProfileFormSchema'

/**
 * Card next to the profile form: the signed-in user, stats and contacts.
 * Name, phone and email follow the last saved form values, not the unsaved input
 */
export function useProfileSummary() {
	const t = useTranslations('Profile')

	const format = useFormat()

	const currentUser = useCurrentUser()

	const { defaultValues } = useFormState<TProfileFormValues>()

	const saved = defaultValues?.profile

	const { workingHours } = PROFILE_FACTS

	const fullName =
		[saved?.firstName, saved?.lastName].filter(Boolean).join(' ') ||
		currentUser.fullName

	const user = { ...currentUser, fullName, initials: getInitials(fullName) }

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

	return { user, stats, contacts }
}
