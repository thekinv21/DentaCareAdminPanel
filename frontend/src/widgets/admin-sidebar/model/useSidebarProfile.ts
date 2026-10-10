'use client'

import { useUserLabels } from '@/entities/user'

import { useAuth } from '@/shared/lib/auth'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'

export function useSidebarProfile() {
	const { user } = useAuth()

	const format = useFormat()

	const labels = useUserLabels()

	const fullName = user ? format.name(user.fullName) : ''

	const initials = getInitials(fullName)

	const role = user ? labels.type(user.type) : ''

	const branch = user ? labels.branch(user.branch) : ''

	return { fullName, initials, role, branch }
}
