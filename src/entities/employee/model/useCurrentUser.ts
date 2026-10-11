'use client'

import { useTranslations } from 'next-intl'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'

import { CURRENT_USER } from '../api/Mock'

export function useCurrentUser() {
	const t = useTranslations('Employee')
	const format = useFormat()
	const fullName = format.name(CURRENT_USER.fullName)
	return {
		fullName,
		initials: getInitials(fullName),
		role: t(CURRENT_USER.role),
		branch: t(CURRENT_USER.branch),
	}
}
