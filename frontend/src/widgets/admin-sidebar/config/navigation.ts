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
		label: 'Клиника',
		items: [
			{ href: ROUTES.dashboard, label: 'Главная', icon: LayoutDashboard },
			{
				href: ROUTES.appointments,
				label: 'Записи',
				icon: CalendarDays,
				count: { value: 28 },
			},
			{ href: ROUTES.patients, label: 'Пациенты', icon: Users },
			{ href: ROUTES.treatmentPlans, label: 'Планы лечения', icon: ToothIcon },
		],
	},
	{
		label: 'Финансы',
		items: [
			{ href: ROUTES.billing, label: 'Оплаты', icon: CreditCard },
			{
				href: ROUTES.inventory,
				label: 'Склад',
				icon: Package,
				count: { value: 7, warning: true },
			},
			{ href: ROUTES.reports, label: 'Отчёты', icon: ChartColumn },
		],
	},
	{
		label: 'Управление',
		items: [
			{ href: ROUTES.staff, label: 'Сотрудники', icon: IdCard },
			{ href: ROUTES.settings, label: 'Настройки', icon: Settings },
		],
	},
]
