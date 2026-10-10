'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { type TUser, USERS, useUserLabels } from '@/entities/user'

import { mockRequest } from '@/shared/api'
import { getInitials } from '@/shared/lib/format'
import { useFormat } from '@/shared/lib/i18n'
import { useConfirm } from '@/shared/ui/confirm-dialog'

/**
 * The user list (mock edits stay in memory) with activation and deletion
 * through the confirmation dialog
 */
export function useUserActions() {
	const t = useTranslations('Users')

	const labels = useUserLabels()

	const format = useFormat()

	const confirm = useConfirm()

	const [currentUsers, setCurrentUsers] = useState<TUser[]>(USERS)

	const updateUser = (id: string, change: Partial<TUser>) =>
		setCurrentUsers(list =>
			list.map(user => (user.id === id ? { ...user, ...change } : user)),
		)

	const toConfirmSubject = (user: TUser) => {
		const name = format.name(user.fullName)

		return { title: name, initials: getInitials(name), tone: user.tone }
	}

	const onToggleActive = (user: TUser) => {
		const subject = {
			...toConfirmSubject(user),
			subtitle: `${labels.type(user.type)} · ${labels.branch(user.branch)}`,
		}

		if (!user.active) {
			confirm({
				tone: 'success',
				title: t('restoreAccessQuestion'),
				description: t('restoreAccessDescription'),
				subject,
				confirmText: t('activate'),
				pendingText: t('enabling'),
				successText: t('accessRestored'),
				onConfirm: () =>
					mockRequest().then(() => updateUser(user.id, { active: true })),
			})
			return
		}

		confirm({
			tone: 'warning',
			title: t('deactivateQuestion'),
			description: t('deactivateDescription'),
			subject,
			options: [
				{
					id: 'logout',
					label: t('endSessions'),
					hint: t('endSessionsHint'),
					checked: true,
				},
				{
					id: 'move',
					label: t('moveAppointments'),
					hint: t('moveAppointmentsHint'),
				},
				{ id: 'notify', label: t('notifyBySms') },
			],
			confirmText: t('deactivate'),
			pendingText: t('disabling'),
			successText: t('userDeactivated'),
			onConfirm: () =>
				mockRequest().then(() => updateUser(user.id, { active: false })),
		})
	}

	const onDelete = (user: TUser) =>
		confirm({
			tone: 'danger',
			title: t('deleteUserQuestion'),
			description: t('deleteUserDescription'),
			subject: { ...toConfirmSubject(user), subtitle: user.email },
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
