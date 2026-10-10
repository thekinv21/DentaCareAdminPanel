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

	const roleInfo = ROLES.find(candidate => candidate.id === role)

	const access = role === 'store' ? [] : ROLE_ACCESS[role]

	const name = roleInfo ? labels.text(roleInfo.name) : role

	const rows = access.map(item => ({
		module: labels.moduleName(item.module),
		access: labels.access(item.access),
		isAllowed: item.access !== 'none',
	}))

	return { name, rows }
}
