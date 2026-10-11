'use client'

import { usePathname } from 'next/navigation'

import { ROUTES } from '@/shared/routes'

const ENTRY_ROUTES: string[] = [ROUTES.login, ROUTES.register]

export function useIsEntryRoute() {
	return ENTRY_ROUTES.includes(usePathname() ?? '')
}
