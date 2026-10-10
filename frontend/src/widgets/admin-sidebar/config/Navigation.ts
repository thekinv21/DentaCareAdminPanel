import type { ComponentType } from 'react'

import {
	CalendarDays,
	ChartColumn,
	CreditCard,
	IdCard,
	LayoutDashboard,
	type LucideIcon,
	Package,
	Settings,
	ShieldCheck,
	UserCog,
	Users,
} from 'lucide-react'

import { ROUTES } from '@/shared/routes'
import { ToothIcon } from '@/shared/ui/logo'

export type TNavItem = {
	href: string
	label: string
	icon: LucideIcon | ComponentType<{ size?: number }>
	count?: { value: number; warning?: boolean }
}

type TNavGroup = {
	label: string
	items: TNavItem[]
}

export const NAVIGATION: TNavGroup[] = [
	{
		label: 'clinic',
		items: [
			{ href: ROUTES.dashboard, label: 'dashboard', icon: LayoutDashboard },
			{
				href: ROUTES.appointments,
				label: 'appointments',
				icon: CalendarDays,
				count: { value: 28 },
			},
			{ href: ROUTES.patients, label: 'patients', icon: Users },
			{ href: ROUTES.treatmentPlans, label: 'treatmentPlans', icon: ToothIcon },
		],
	},
	{
		label: 'finance',
		items: [
			{ href: ROUTES.billing, label: 'billing', icon: CreditCard },
			{
				href: ROUTES.inventory,
				label: 'inventory',
				icon: Package,
				count: { value: 7, warning: true },
			},
			{ href: ROUTES.reports, label: 'reports', icon: ChartColumn },
		],
	},
	{
		label: 'admin',
		items: [
			{ href: ROUTES.staff, label: 'staff', icon: IdCard },
			{ href: ROUTES.users, label: 'users', icon: UserCog },
			{ href: ROUTES.roles, label: 'rolesAndAccess', icon: ShieldCheck },
			{ href: ROUTES.settings, label: 'settings', icon: Settings },
		],
	},
]
