'use client'

import { useTranslations } from 'next-intl'

import { useFormat } from '@/shared/lib/i18n'

import { CURRENT_USER } from '../api/Mock'

/**
 * Signed-in staff member with translated role and branch
 */
export function useCurrentUser() {
	const t = useTranslations('Employee')
	const format = useFormat()
	return {
		fullName: format.name(CURRENT_USER.fullName),
		initials: t(CURRENT_USER.initials),
		role: t(CURRENT_USER.role),
		branch: t(CURRENT_USER.branch),
	}
}
