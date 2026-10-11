'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { mockRequest } from '@/shared/api'
import { useConfirm } from '@/shared/ui/confirm-dialog'

import type { TServiceItem } from './Services'

/**
 * Removing a service from the price list; existing plans keep their price
 */
export function useServiceRemoval() {
	const t = useTranslations('ServiceForm')
	const tSettings = useTranslations('Settings')
	const confirm = useConfirm()
	const [removedCodes, setRemovedCodes] = useState<Set<string>>(new Set())

	const remove = (service: TServiceItem, onDone?: () => void) =>
		confirm({
			tone: 'danger',
			title: t('deleteServiceQuestion', { name: tSettings(service.name) }),
			description: t('deleteServiceDescription'),
			confirmText: t('deleteService'),
			pendingText: t('deleting'),
			successText: t('serviceDeleted'),
			onConfirm: () =>
				mockRequest().then(() => {
					setRemovedCodes(current => new Set([...current, service.code]))
					onDone?.()
				}),
		})

	return { removedCodes, remove }
}
