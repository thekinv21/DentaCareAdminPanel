'use client'

import {
	ROLE_ACCESS,
	ROLES,
	type TSystemRoleId,
	useRoleLabels,
} from '@/entities/role'

/**
 * Role name and its access list for the preview next to the user form
 */
export function useRoleAccess(role: TSystemRoleId) {
	const labels = useRoleLabels()
	const info = ROLES.find(r => r.id === role)
	const access = role === 'store' ? [] : ROLE_ACCESS[role]

	return {
		name: info ? labels.text(info.name) : role,
		rows: access.map(item => ({
			module: labels.module(item.module),
			access: labels.access(item.access),
			allowed: item.access !== 'none',
		})),
	}
}
