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
	Users,
} from 'lucide-react'

import { ROUTES } from '@/shared/routes'
import { ToothIcon } from '@/shared/ui/logo'

export interface NavItem {
	href: string
	label: string
	icon: LucideIcon | ComponentType<{ size?: number }>
	count?: { value: number; warning?: boolean }
}

export interface NavGroup {
	label: string
	items: NavItem[]
}

export const NAVIGATION: NavGroup[] = [
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
			{ href: ROUTES.settings, label: 'settings', icon: Settings },
		],
	},
]
