'use client'

import { usePathname } from 'next/navigation'

import { useI18n } from '@/shared/lib/i18n'
import { ROUTES } from '@/shared/routes'

import { NAVIGATION } from '../config/navigation'

function isActive(pathname: string, href: string) {
	if (href === ROUTES.dashboard) return pathname === href
	return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Navigation groups with translated labels and the active route marked
 */
export function useSidebarNav() {
	const pathname = usePathname() ?? ''
	const { t } = useI18n()

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
