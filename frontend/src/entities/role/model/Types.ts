import type { Tone } from '@/shared/ui/badge'

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
	/**
	 * Can be limited to the employee's own records
	 */
	scoped?: boolean
}

export type TPermissions = Record<string, TPermissionAction[]>

export type TRoleMember = { initials: string; tone: Tone }

export type TRole = {
	id: string
	/**
	 * Message key for system roles, raw text for custom ones
	 */
	name: string
	description: string
	color: string
	users: number
	permissionCount: number
	system: boolean
	/**
	 * Module message keys shown as chips on the role card
	 */
	modules: string[]
	members: TRoleMember[]
}
