import type { ComponentType } from 'react'

import { type LucideIcon, ShieldCheck, UserCog } from 'lucide-react'

import { ROUTES } from '@/shared/routes'

export type TNavItem = {
	href: string
	label: string
	icon: LucideIcon | ComponentType<{ size?: number }>
}

type TNavGroup = {
	label: string
	items: TNavItem[]
}

export const NAVIGATION: TNavGroup[] = [
	{
		label: 'admin',
		items: [
			{ href: ROUTES.users, label: 'users', icon: UserCog },
			{ href: ROUTES.roles, label: 'rolesAndAccess', icon: ShieldCheck },
		],
	},
]
