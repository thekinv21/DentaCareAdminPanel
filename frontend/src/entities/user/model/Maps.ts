import type { TSystemRoleId } from '@/entities/role/@x/user'

import type { TTone } from '@/shared/ui/badge'

import type { TBranch, TUserType } from './Types'

/**
 * Labels are message keys in the User namespace
 */
export const USER_TYPE: Record<
	TUserType,
	{
		label: string
		plural: string
		tone: TTone
		role: TSystemRoleId
	}
> = {
	chief: {
		label: 'chief',
		plural: 'management',
		tone: 'accent',
		role: 'chief',
	},
	doctor: {
		label: 'doctor',
		plural: 'doctors',
		tone: 'brand',
		role: 'doctor',
	},
	assistant: {
		label: 'assistant',
		plural: 'assistants',
		tone: 'info',
		role: 'assistant',
	},
	admin: {
		label: 'admin',
		plural: 'admins',
		tone: 'neutral',
		role: 'reception',
	},
	accountant: {
		label: 'accountant',
		plural: 'accounting',
		tone: 'warning',
		role: 'finance',
	},
}

export const USER_TYPES = Object.keys(USER_TYPE) as TUserType[]

export const BRANCH_LABEL: Record<TBranch, string> = {
	alaToo: 'alaToo',
	jal: 'jal',
}
