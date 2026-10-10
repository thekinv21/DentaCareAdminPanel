'use client'

import { useTranslations } from 'next-intl'

import { useCurrentUser } from '@/entities/employee'

import { useFormat } from '@/shared/lib/i18n'

import { PROFILE_FACTS, PROFILE_FIELDS } from './Profile'

const fieldValue = (name: (typeof PROFILE_FIELDS)[number]['name']) =>
	PROFILE_FIELDS.find(field => field.name === name)?.value ?? ''

/**
 * Card next to the profile form: the signed-in user, stats and contacts
 */
export function useProfileSummary() {
	const t = useTranslations('Profile')
	const format = useFormat()
	const user = useCurrentUser()
	const { workingHours } = PROFILE_FACTS

	return {
		user,
		stats: PROFILE_FACTS.stats.map(stat => ({
			label: t(stat.label),
			value:
				typeof stat.value === 'number' ? format.number(stat.value) : stat.value,
		})),
		contacts: [
			{ kind: 'phone' as const, text: fieldValue('phone'), isMono: true },
			{ kind: 'email' as const, text: fieldValue('email'), isMono: false },
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
		],
	}
}
