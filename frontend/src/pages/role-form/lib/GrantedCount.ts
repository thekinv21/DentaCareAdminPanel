import { PERMISSION_MODULES, type TPermissions } from '@/entities/role'

/**
 * Number of module actions switched on
 */
export const countGranted = (permissions: TPermissions) =>
	PERMISSION_MODULES.reduce(
		(total, permissionModule) =>
			total +
			permissionModule.actions.filter(action =>
				permissions[permissionModule.id]?.includes(action),
			).length,
		0,
	)
