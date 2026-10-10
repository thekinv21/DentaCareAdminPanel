import type { TSystemRoleId } from '@/entities/role/@x/user'

import type { TAuthUser } from '@/shared/model'
import type { TTone } from '@/shared/ui/badge'

export type TUserType = TAuthUser['type']

export type TBranch = TAuthUser['branch']

export type TLastSeen =
	| { kind: 'online' | 'invited' }
	| { kind: 'today' | 'yesterday'; time: string }
	| { kind: 'date'; date: string }

/**
 * An account in the user list: the session user plus role, activity and status
 */
export type TUser = TAuthUser & {
	role: TSystemRoleId
	lastSeen: TLastSeen
	tone: TTone
	active: boolean
}
