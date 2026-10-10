import { PERMISSION_MODULES, type TPermissions } from '@/entities/role'

/**
 * Number of module actions switched on
 */
export const countGranted = (permissions: TPermissions) =>
	PERMISSION_MODULES.reduce(
		(n, m) => n + m.actions.filter(a => permissions[m.id]?.includes(a)).length,
		0,
	)
