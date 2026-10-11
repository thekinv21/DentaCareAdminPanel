export type TSystemRoleId =
	'owner' | 'chief' | 'doctor' | 'assistant' | 'reception' | 'finance' | 'store'

export type TPermissionAction = 'view' | 'create' | 'edit' | 'delete'

export type TPermissionModule = {
	id: string
	/**
	 * Message keys in the Role namespace
	 */
	name: string
	hint: string
	actions: TPermissionAction[]
}

export type TPermissions = Record<string, TPermissionAction[]>

export type TRole = {
	id: string
	/**
	 * Message key for system roles, raw text for custom ones
	 */
	name: string
	description: string
	color: string
	users: number
	system: boolean
	permissions: TPermissions
}

/**
 * Role choice as the backend sends it: ready-to-show label, no translation
 */
export type TRoleOption = { id: string; label: string }
