'use client'

import { useTranslations } from 'next-intl'

import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'

import { CURRENT_USER } from '../api/Mock'

export function useCurrentUser() {
	const t = useTranslations('Employee')

	const format = useFormat()

	const fullName = format.name(CURRENT_USER.fullName)

	const initials = getInitials(fullName)

	const role = t(CURRENT_USER.role)

	const branch = t(CURRENT_USER.branch)

	return { fullName, initials, role, branch }
}
