import type { TSystemRoleId } from '@/entities/role/@x/user'

import type { TTone } from '@/shared/ui/badge'

export type TUserType =
	'chief' | 'doctor' | 'assistant' | 'admin' | 'accountant'

export type TBranch = 'alaToo' | 'jal'

export type TLastSeen =
	| { kind: 'online' | 'invited' }
	| { kind: 'today' | 'yesterday'; time: string }
	| { kind: 'date'; date: string }

export type TUser = {
	id: string
	fullName: string
	type: TUserType
	role: TSystemRoleId
	branch: TBranch
	phone: string
	email: string
	lastSeen: TLastSeen
	tone: TTone
	active: boolean
}
