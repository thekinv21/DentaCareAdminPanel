'use client'

import { useTranslations } from 'next-intl'

import { translateOptional } from '@/shared/lib/i18n'

/**
 * Translated role names and permission vocabulary; custom role names pass through
 */
export function useRoleLabels() {
	const t = useTranslations('Role')

	const text = (keyOrText: string) => translateOptional(t, keyOrText)

	const moduleName = (key: string) => t(key)

	const action = (key: string) => t(key)

	const color = (key: string) => t(key)

	return { text, moduleName, action, color }
}
