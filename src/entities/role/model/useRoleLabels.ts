'use client'

import { useTranslations } from 'next-intl'

import { translateOptional } from '@/shared/lib/i18n'

/**
 * Translated role names and permission vocabulary; custom role names pass through
 */
export function useRoleLabels() {
	const t = useTranslations('Role')
	return {
		text: (keyOrText: string) => translateOptional(t, keyOrText),
		module: (key: string) => t(key),
		access: (key: string) => t(key === 'none' ? 'noAccess' : key),
		action: (key: string) => t(key),
		color: (key: string) => t(key),
	}
}
