'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import {
	countGranted,
	PERMISSIONS_TOTAL,
	ROLES,
	type TRole,
	useRoleLabels,
} from '@/entities/role'

import { mockRequest } from '@/shared/api'
import { useConfirm } from '@/shared/ui/confirm-dialog'

export function useRoleCards() {
	const t = useTranslations('Roles')

	const labels = useRoleLabels()

	const confirm = useConfirm()

	const [roles, setRoles] = useState<TRole[]>(ROLES)

	const deleteRole = (role: TRole, name: string) => {
		if (role.system) return

		confirm({
			tone: 'danger',
			title: t('deleteRoleQuestion', { name }),
			description: role.users
				? t('deleteRoleUsersDescription', { n: role.users })
				: t('deleteRoleEmptyDescription'),
			confirmText: t('deleteRole'),
			pendingText: t('deleting'),
			successText: t('roleDeletedNamed', { name }),
			onConfirm: () =>
				mockRequest().then(() =>
					setRoles(list => list.filter(item => item.id !== role.id)),
				),
		})
	}

	const cards = roles.map(role => {
		const name = labels.text(role.name)

		return {
			id: role.id,
			name,
			description: labels.text(role.description),
			color: role.color,
			system: role.system,
			usersText: role.users
				? t('usersCount', { n: role.users })
				: t('notAssigned'),
			permissionsText: t('permissionsOf', {
				n: countGranted(role.permissions),
				total: PERMISSIONS_TOTAL,
			}),
			onDelete: () => deleteRole(role, name),
		}
	})

	return { cards }
}

export type TRoleCardView = ReturnType<typeof useRoleCards>['cards'][number]
