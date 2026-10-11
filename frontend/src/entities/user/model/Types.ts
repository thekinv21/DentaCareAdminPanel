import type { TSystemRoleId } from '@/entities/role/@x/user'

import type { TAuthUser } from '@/shared/model'
import type { TTone } from '@/shared/ui/badge'

export type TUserType = TAuthUser['type']

export type TBranch = TAuthUser['branch']

/**
 * An account in the user list: the session user plus role and status
 */
export type TUser = TAuthUser & {
	role: TSystemRoleId
	tone: TTone
	active: boolean
}
