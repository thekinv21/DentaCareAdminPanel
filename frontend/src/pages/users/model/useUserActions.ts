'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { type TUser, USERS } from '@/entities/user'

import { mockRequest } from '@/shared/api'
import { useFormat } from '@/shared/lib/i18n'
import { useConfirm } from '@/shared/ui/confirm-dialog'

/**
 * The user list (mock edits stay in memory) with activation and deletion
 * through the confirmation dialog
 */
export function useUserActions() {
	const t = useTranslations('Users')

	const format = useFormat()

	const confirm = useConfirm()

	const [currentUsers, setCurrentUsers] = useState<TUser[]>(USERS)

	const updateUser = (id: string, change: Partial<TUser>) =>
		setCurrentUsers(list =>
			list.map(user => (user.id === id ? { ...user, ...change } : user)),
		)

	const toSubject = (user: TUser) => ({
		title: format.name(user.fullName),
		subtitle: user.email,
		tone: user.tone,
	})

	const onToggleActive = (user: TUser) => {
		const isActive = !user.active

		confirm({
			tone: isActive ? 'success' : 'warning',
			title: isActive ? t('restoreAccessQuestion') : t('deactivateQuestion'),
			description: isActive
				? t('restoreAccessDescription')
				: t('deactivateDescription'),
			subject: toSubject(user),
			confirmText: isActive ? t('activate') : t('deactivate'),
			pendingText: isActive ? t('enabling') : t('disabling'),
			successText: isActive ? t('accessRestored') : t('userDeactivated'),
			onConfirm: () =>
				mockRequest().then(() => updateUser(user.id, { active: isActive })),
		})
	}

	const onDelete = (user: TUser) =>
		confirm({
			tone: 'danger',
			title: t('deleteUserQuestion'),
			description: t('deleteUserDescription'),
			subject: toSubject(user),
			confirmText: t('delete'),
			pendingText: t('deleting'),
			successText: t('userDeleted'),
			onConfirm: () =>
				mockRequest().then(() =>
					setCurrentUsers(list => list.filter(item => item.id !== user.id)),
				),
		})

	return { currentUsers, onToggleActive, onDelete }
}
