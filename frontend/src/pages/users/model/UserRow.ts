import type { TUser, TUserType } from '@/entities/user'

import type { TTone } from '@/shared/ui/badge'

export type TUserRow = {
	id: string
	name: string
	initials: string
	tone: TUser['tone']
	email: string
	phone: string
	type: { id: TUserType; label: string; tone: TTone }
	role: { label: string; color?: string }
	branch: string
	lastSeen: string
	isActive: boolean
	/**
	 * Raw name, phone and email the search box matches against
	 */
	searchText: string
	onToggleActive: () => void
	onDelete: () => void
}
