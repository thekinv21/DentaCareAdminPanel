'use client'

import { usePathname } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { ROUTES } from '@/shared/routes'

import { NAVIGATION } from '../config/Navigation'

function isActive(pathname: string, href: string) {
	if (href === ROUTES.dashboard) return pathname === href
	return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Navigation groups with translated labels and the active route marked
 */
export function useSidebarNav() {
	const pathname = usePathname() ?? ''
	const t = useTranslations('AdminSidebar')

	const groups = NAVIGATION.map(group => ({
		label: t(group.label),
		items: group.items.map(item => ({
			...item,
			label: t(item.label),
			active: isActive(pathname, item.href),
		})),
	}))

	return { groups, profileActive: isActive(pathname, ROUTES.profile) }
}
