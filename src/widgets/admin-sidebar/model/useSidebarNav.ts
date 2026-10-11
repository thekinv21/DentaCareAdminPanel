'use client'

import { usePathname } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'

import { NAVIGATION, type TNavItem } from '../config/Navigation'

export type TSidebarItem = TNavItem & {
	active: boolean
}

export type TSidebarGroup = {
	label: string
	items: TSidebarItem[]
}

function isActive(pathname: string, href: string) {
	return pathname === href || pathname.startsWith(`${href}/`)
}

export function useSidebarNav() {
	const pathname = usePathname() ?? ''
	const t = useTranslations('AdminSidebar')

	const groups: TSidebarGroup[] = NAVIGATION.map(group => ({
		label: t(group.label),
		items: group.items.map(item => ({
			...item,
			label: t(item.label),
			active: isActive(pathname, item.href),
		})),
	}))

	return { groups, profileActive: isActive(pathname, ROUTES.profile) }
}
